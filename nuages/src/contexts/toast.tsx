// create chakra-ui toast context

// import toast from chakra-ui

import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode } from "react";

interface props {
    children: ReactNode;
}

export const ToastContext = createContext(null);

export const ToastProvider: React.FC<props> = ({ children }) => {
    const Toast: any = useToast();

    return (
        <ToastContext.Provider value={Toast}>
            {children}
        </ToastContext.Provider>
    );
};