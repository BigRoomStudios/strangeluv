const createMuiTheme = require('material-ui/styles').createMuiTheme;

const purple = require('material-ui/colors/purple').default;
const green = require('material-ui/colors/green').default;
const Colors = require('./colors');

const theme = createMuiTheme({
    palette: {
        primary: { light: purple[300], main: purple[500], dark: Colors.yellow },
        secondary: green
    }
});

module.exports = theme;
