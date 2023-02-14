const { useEffect } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSnackbar } = require('../../hooks/use-snackbar');

module.exports = function MiddleEndSnackbar() {

    const m = useMiddleEnd();
    const [openSnackbar, closeSnackbar] = useSnackbar();

    useEffect(() => {

        m.mods.snackbar.install({
            openSnackbar,
            closeSnackbar
        });
    });

    return null;
};

