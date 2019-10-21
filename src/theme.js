const { default: CreateMuiTheme } = require('@material-ui/core/styles/createMuiTheme');
const { default: amber } = require('@material-ui/core/colors/amber');

module.exports = CreateMuiTheme({
    palette: {
        secondary: {
            main: amber[500]
        }
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
});
