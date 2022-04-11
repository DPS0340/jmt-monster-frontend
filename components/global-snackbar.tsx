import { SyntheticEvent } from 'react';
import { Alert, Snackbar } from '@mui/material';
import useSnackbarHandler from '../store/snackbar';

const GlobalSnackbar = () => {
    const { message, setMessage, flush } = useSnackbarHandler();

    const handleSnackbarClose = (
        event?: SyntheticEvent | Event,
        reason?: string
    ) => {
        flush();
    };

    return (
        <Snackbar
            open={!!message}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
        >
            <Alert severity="info">{message}</Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;
