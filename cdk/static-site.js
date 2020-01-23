'use strict';

const Cloudfront = require('@aws-cdk/aws-cloudfront');
const Route53 = require('@aws-cdk/aws-route53');
const S3 = require('@aws-cdk/aws-s3');
const S3deploy = require('@aws-cdk/aws-s3-deployment');
const ACM = require('@aws-cdk/aws-certificatemanager');
const CDK = require('@aws-cdk/core');
const Targets = require('@aws-cdk/aws-route53-targets/lib');
const Core = require('@aws-cdk/core');

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
class StaticSite extends Core.Construct {
    constructor(parent, name, props) {

        super(parent, name);
        const zone = Route53.HostedZone.fromLookup(this, 'Zone', { domainName: props.domainName });
        const siteDomain = props.siteSubDomain + '.' + props.domainName;
        new CDK.CfnOutput(this, 'Site', { value: 'https://' + siteDomain });
        // Content bucket
        const siteBucket = new S3.Bucket(this, 'SiteBucket', {
            bucketName: siteDomain,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'index.html',
            publicReadAccess: true,
            // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
            // the new bucket, and it will remain in your account until manually deleted. By setting the policy to
            // DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
            removalPolicy: CDK.RemovalPolicy.DESTROY
        });
        new CDK.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });
        // TLS certificate
        const certificateArn = new ACM.DnsValidatedCertificate(this, 'SiteCertificate', {
            domainName: siteDomain,
            hostedZone: zone
        }).certificateArn;
        new CDK.CfnOutput(this, 'Certificate', { value: certificateArn });
        // CloudFront distribution that provides HTTPS
        const distribution = new Cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
            aliasConfiguration: {
                acmCertRef: certificateArn,
                names: [siteDomain],
                sslMethod: Cloudfront.SSLMethod.SNI,
                securityPolicy: Cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016
            },
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: siteBucket
                    },
                    behaviors: [{ isDefaultBehavior: true }]
                }
            ]
        });
        new CDK.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });
        // Route53 alias record for the CloudFront distribution
        new Route53.ARecord(this, 'SiteAliasRecord', {
            recordName: siteDomain,
            target: Route53.AddressRecordTarget.fromAlias(new Targets.CloudFrontTarget(distribution)),
            zone
        });
        // Deploy site contents to S3 bucket
        new S3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
            sources: [S3deploy.Source.asset('./build')],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ['/*']
        });
    }
}

exports.StaticSite = StaticSite;
