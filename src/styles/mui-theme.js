const { createMuiTheme: CreateMuiTheme } = require('@material-ui/core/styles');

const theme = CreateMuiTheme({
    palette: {
        primary: {
            main: '#ff9711'
        },
        secondary: {
            main: '#e6158d'
        }
    }
});

module.exports = theme;
