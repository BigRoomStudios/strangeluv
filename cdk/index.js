'use strict';

const CDK = require('@aws-cdk/core');
const { StaticSite } = require('./static-site');

/**
 * This stack relies on getting the domain name from CDK context.
 * Use 'cdk synth -c domain=mystaticsite.com -c subdomain=www'
 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "subdomain": "www"
 *   }
 * }
**/
class MyStaticSiteStack extends CDK.Stack {
    constructor(parent, name, props) {

        super(parent, name, props);

        new StaticSite(this, 'StaticSite', {
            domainName: this.node.tryGetContext('domain'),
            siteSubDomain: this.node.tryGetContext('subdomain')
        });
    }
}

const app = new CDK.App();

new MyStaticSiteStack(app, 'StrangeluvStaticSite', {
    env: {
        // Stack must be in us-east-1, because the ACM certificate for a
        // global CloudFront distribution must be requested in us-east-1.
        region: 'us-east-1',
        account: app.node.tryGetContext('account')
    }
});

app.synth();
