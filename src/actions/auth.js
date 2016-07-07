const StrangeAuth = require('strange-auth');

const mockServerData = {
    jwt: 'eyJhbGciOiJub25.lIiwidHlwIjoiS...',
    userInfo: {
        name: 'Bruce',
        otherName: 'Batman',
        accountStatus: 'Active'
    }
}

module.exports = StrangeAuth.makeActions({
    // Implement login
    login: (username, password, cb) => {

        // A real login (using npm axios library) might start with:
        // axios.post('/login', { username: username, password: password })
        Promise.resolve()
        .then(res => {
            if( username === 'user' && password === 'password' ) {
                
                res = mockServerData;
                cb(null, {
                    credentials: res.jwt,
                    artifacts: res.userInfo
                });
            } else {
                
                res = new Error('Ya blew it!');
                cb(res);
            }
        })
    },
    
    logout: (cb) => {

        // ex:
        // axios.get('/logout')
        Promise.resolve(mockServerData)
        .then(res => {
            cb(null, true);
        })
    }
});
