const React = require('react');
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
        <button className="btn btn-default" onClick={props.increment}>
            Increment
        </button>
        {' '}
        <button className="btn btn-default" onClick={props.doubleAsync}>
            Double (Async)
        </button>
    </div>

);

Counter.propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
};

module.exports = Counter;
