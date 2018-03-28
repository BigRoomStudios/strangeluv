const React = require('react');
//const T = require('prop-types');

module.exports = class Signup extends React.Component {

    render() {

        return (

            <div>
                <h2>Sign Up</h2>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Confirm Password</label>
                    <input
                        className='form-control'
                    />
                </div>
                <div className='checkbox'>
                    <label>
                        <input
                            type='checkbox'
                        />
                        Remember Me
                    </label>
                </div>

            </div>
        );
    }
};
