const T = require('prop-types');
const { default: Button } = require('@mui/material/Button');
const { default: Typography } = require('@mui/material/Typography');
const { default: Box } = require('@mui/material/Box');

const internals = {};

module.exports = ({ counter, increment, double }) => {

    return (
        <div>
            <Typography variant='h6'>
                <Box fontWeight='fontWeightBold'>
                    Counter: <Box component='span' color='primary.light'>{counter}</Box>
                </Box>
            </Typography>
            <Button onClick={increment}>
                Increment
            </Button>
            <Button onClick={double}>
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
