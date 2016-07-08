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
    
    login: (loginCreds, cb) => {
        
        // Simulate some latency here
        setTimeout(() => {
            // A real login (using npm axios library) might start with:
            // axios.post('/login', { username: username, password: password })
            Promise.resolve({})
            .then(res => {
                
                if( loginCreds.username !== 'user' || loginCreds.password !== 'password' ) {
                    res.error = new Error('Ya blew it!');
                }
                
                if(res.error) {
                    return cb(res.error);
                }
                
                res = mockServerData;
                
                cb(null, {
                    credentials: {
                        jwt: res.jwt,
                        user: res.userInfo
                    },
                    artifacts: {}
                });
            })
        
        }, 1000);
    },
    
    logout: (cb) => {
        console.log("HELLO!!")
        // axios.get('/logout')
        Promise.resolve({})
        .then(res => {
            cb(null, true);
        })
    }
});
