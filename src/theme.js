const { default: CreateMuiTheme } = require('@mui/material/styles/createTheme');
const { amber } = require('@mui/material/colors');

// The object below overrides specific values and/or extends the default material-ui theme, which can currently be found here:
// https://material-ui.com/customization/default-theme/#default-theme
// Any of the values in that default theme may be used throughout this project, even if they aren't explicitly defined here
// (e.g., `theme.shape.borderRadius` will return 4, even though `shape` isn't currently defined in this file)

module.exports = CreateMuiTheme({
    palette: {
        secondary: amber
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
});
