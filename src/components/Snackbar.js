const { createContext, useState, useEffect, useCallback } = require('react');
const T = require('prop-types');
const { default: Snackbar } = require('@mui/material/Snackbar');
const { default: Alert } = require('@mui/material/Alert');

const SnackbarContext = createContext(null);

exports.SnackbarContext = SnackbarContext;

exports.SnackbarProvider = function SnackbarProvider({ children }) {

    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(null);
    const [snackPack, setSnackPack] = useState([]);

    useEffect(() => {

        if (snackPack.length && !messageInfo) {
            setMessageInfo(snackPack[0]);
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        }
        else if (snackPack.length && messageInfo && open) {
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const openSnackbar = useCallback((message, { severity = 'success', duration = 5000 } = {}) => {

        setSnackPack((prev) => {

            return [
                ...prev,
                {
                    message,
                    severity,
                    duration,
                    key: new Date().getTime()
                }
            ];
        });
    }, []);

    const closeSnackbar = useCallback((event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }, []);

    const handleExited = () => {

        setMessageInfo(null);
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
            {children}

            <Snackbar
                open={open}
                autoHideDuration={messageInfo?.duration}
                onClose={closeSnackbar}
                onExited={handleExited}
            >
                <Alert onClose={closeSnackbar} severity={messageInfo?.severity}>
                    {messageInfo?.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

exports.SnackbarProvider.propTypes = {
    children: T.any
};
