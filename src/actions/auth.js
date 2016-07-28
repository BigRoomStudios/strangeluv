
const StrangeAuth = require('strange-auth');

// Thrown together random string generator
const genRandString = () => {

    const genSection = () => {

        return new Array(10).join().replace(/(.|$)/g, () => {

            return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? 'toString' : 'toUpperCase']();
        });
    };
    return genSection() + '.' + genSection() + '.' + genSection() + '.';
};

// Create some mockServerData that changes it's jwt every time a user logs in
const mockServerData = () => {

    return {
        jwt: genRandString(),
        userInfo: {
            name: 'Bruce',
            otherName: 'Batman',
            accountStatus: 'Active'
        }
    };
};

module.exports = exports = StrangeAuth.makeActions({

    login: (loginCreds, cb) => {

        // Simulate some latency here
        setTimeout(() => {
            // A real login (using npm axios library) might start with:
            // axios.post('/login', { username: username, password: password })
            Promise.resolve({})
            .then((res) => {

                //////////
                // This block represents a server login check
                if (loginCreds.username !== 'user' || loginCreds.password !== 'password') {
                    res.error = new Error('Ya blew it!');
                }
                res.loginResult = mockServerData();
                //////////


                if (res.error) {
                    return cb(res.error);
                }

                cb(null, {
                    credentials: {
                        jwt: res.loginResult.jwt,
                        user: res.loginResult.userInfo
                    },
                    artifacts: {}
                });
            });
        }, 1000);
    },

    logout: (cb) => {

        // Simulate some latency here
        setTimeout(() => {

            // axios.get('/logout')
            Promise.resolve({ success: true })
            .then((res) => {

                if (res.success === true) {
                    cb(null);
                }
                else {
                    cb(new Error('Logout failed'));
                }
            });
        }, 1000);
    }
});
