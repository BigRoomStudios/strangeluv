const T = require('prop-types');
const { default: Button } = require('@material-ui/core/Button');
const { default: Typography } = require('@material-ui/core/Typography');
const { default: Box } = require('@material-ui/core/Box');

const internals = {};

module.exports = ({ counter, increment, double }) => {

    return (
        <div>
            <Typography variant='h6'>
                <Box fontWeight='fontWeightBold'>
                    Counter: <Box component='span' color='primary.light'>{counter}</Box>
                </Box>
            </Typography>
            <Button color='primary' onClick={increment}>
                Increment
            </Button>
            <Button color='primary' onClick={double}>
                Double (Async)
            </Button>
        </div>
    );
};

module.exports.propTypes = {
    counter: T.number.isRequired,
    double: T.func.isRequired,
    increment: T.func.isRequired
};
