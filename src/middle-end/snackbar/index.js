module.exports = () => {

    return {
        open: () => null,
        close: () => null,
        install({ openSnackbar, closeSnackbar }) {

            this.open = openSnackbar;
            this.close = closeSnackbar;
        }
    };
};

