const { useContext } = require('react');
const { SnackbarContext } = require('../components/Snackbar');

exports.useSnackbar = function useSnackbar() {

    const { openSnackbar } = useContext(SnackbarContext);

    return [openSnackbar];
};

