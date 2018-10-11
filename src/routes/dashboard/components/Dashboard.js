const React = require('react');
const T = require('prop-types');
const { PageWrapper, UserListItem } = require('styles/global-components.js');
const { Typography, List, ListItemText } = require('@material-ui/core');

module.exports = class Dashboard extends React.Component {

    static propTypes = {
        firstName: T.string.isRequired,
        getUsers: T.func.isRequired,
        users: T.array.isRequired
    };

    componentDidMount() {

        this.props.getUsers();
    }

    render() {

        const { firstName, users } = this.props;

        return (

            <PageWrapper>
                <Typography variant='display2' gutterBottom>Dashboard</Typography>
                <Typography gutterBottom>Welcome to your dashboard, {firstName}!</Typography>
                <Typography variant='display1'>User List</Typography>
                <List>
                    {
                        users.map( (user) => (

                            <UserListItem
                                key={user.id}
                                dense
                                button
                            >
                                <ListItemText
                                    primary={user.fullName}
                                    secondary={user.email}
                                />
                            </UserListItem>
                        ))
                    }
                </List>
            </PageWrapper>

        );
    }
};
