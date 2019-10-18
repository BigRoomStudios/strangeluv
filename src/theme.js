const { default: CreateMuiTheme } = require('@material-ui/core/styles/createMuiTheme');

module.exports = CreateMuiTheme({
    palette: {
        duckYellow: {
            main: '#EED663'
        }
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
});
