// create chakra-ui toast context

// import toast from chakra-ui

import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useCallback } from "react";

interface props {
    children: ReactNode;
}

export interface ToastContextInterface {
    successToast: (title: string, message: string) => void;
    errorToast: (title: string, message: string) => void;

}

export const ToastContext = createContext<ToastContextInterface | null>(null);

export const ToastProvider: React.FC<props> = ({ children }) => {
    const Toast: any = useToast();

    const successToast = useCallback((title: string, message: string) => {
        Toast({
            title: title || "Success",
            description: message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: 'top-right'
        });
    }, [Toast])

    const errorToast = useCallback((title: string, message: string) => {
        Toast({
            title: title || "Error",
            description: message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: 'top-right'
        });
    }, [Toast])

    return (
        <ToastContext.Provider value={{ successToast, errorToast }}>
            {children}
        </ToastContext.Provider>
    );
};