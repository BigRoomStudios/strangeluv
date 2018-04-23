const React = require('react');
const T = require('prop-types');

const Classes = require('./styles.scss');

const Counter = (props) => (

    <div>
        <h2 className={Classes.counterContainer}>
            Counter:
            {' '}
            <span className={Classes['counter--green']}>
                {props.counter}
            </span>
        </h2>
        <button className='btn btn-default' onClick={props.increment}>
            Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={props.doubleAsync}>
            Double (Async)
        </button>
    </div>

);

Counter.propTypes = {
    counter: T.number.isRequired,
    doubleAsync: T.func.isRequired,
    increment: T.func.isRequired
};

module.exports = Counter;
