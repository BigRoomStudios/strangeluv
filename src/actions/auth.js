
const Push = require('react-router-redux').push;
const StrangeAuth = require('strange-auth');


const internals = {};


//////////////////////////////////////////
///////// Represents Server Side /////////
//////////////////////////////////////////
// Thrown together random string generator
internals.genRandString = () => {

    const genSection = () => {

        return new Array(10).join().replace(/(.|$)/g, () => {

            return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? 'toString' : 'toUpperCase']();
        });
    };
    return genSection() + '.' + genSection() + '.' + genSection() + '.';
};

// Create some mock server data that changes it's jwt every time a user logs in
internals.genMockServerData = () => {

    return {
        jwt: internals.genRandString(),
        userInfo: {
            name: 'Bruce',
            otherName: 'Batman',
            accountStatus: 'Active'
        }
    };
};
//////////////////////////////////////////


exports.login = (loginCreds) => {

    return (dispatch) => {

        dispatch(internals.strangeActions.login(loginCreds)).then((res) => {

            // You'll probably want to change the page after login
            // dispatch(Push('/dashboard'));
        })
        .catch((err) => {

            console.log(err);
        });
    };
};

exports.logout = () => {

    return (dispatch) => {

        dispatch(internals.strangeActions.logout()).then((res) => {

            // You'll probably want to change the page after logout
            // dispatch(Push('/'));
        })
        .catch((err) => {

            console.log(err);
        });
    };
};


internals.strangeActions = StrangeAuth.makeActions({

    login: (loginCreds) => {

        // A real login (using npm axios library) might start with:
        // axios.post('/login', { username: username, password: password })

        const serverResponse  = {};

        if (loginCreds.username !== 'user' || loginCreds.password !== 'password') {
            serverResponse.error = new Error('Incorrect username or password');
            return Promise.reject(serverResponse);
        }
        serverResponse.loginResult = internals.genMockServerData();


        return Promise.resolve(serverResponse)
        .then((res) => {

            return {
                credentials: {
                    jwt: res.loginResult.jwt,
                    user: res.loginResult.userInfo
                },
                artifacts: {}
            };
        });
    },

    logout: () => {

        // A real logout (using npm axios library) might start with:
        // axios.get('/logout')
        return Promise.resolve({ success: true });
    }
});

