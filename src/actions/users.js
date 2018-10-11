const WebClient = require('../utils/web-client');

exports.getUsers = () => {

    return (dispatch, getState) => {

        return WebClient.get('/users', { headers:
            { authorization: `Bearer ${getState().auth.credentials.token}` }
        })

        .then(({ data, status }) => {

            dispatch({
                type: 'GET_USERS_SUCCESS',
                payload: data
            });

        })
        .catch((err) => {

            console.error(err);
        });
    };
};
