import create from 'zustand';
import { AlertColor } from '@mui/material';

export interface SnackbarStatus {
    message: string;
    severity: AlertColor;
    setMessage: (severity: AlertColor, message: string) => void;
    flush: () => void;
}

const useSnackbarHandler = create<SnackbarStatus>((set) => ({
    message: '',
    severity: 'info',
    setMessage: (severity: AlertColor, message: string) =>
        set({ severity, message }),
    flush: () => set({ severity: 'info', message: '' })
}));

export default useSnackbarHandler;
