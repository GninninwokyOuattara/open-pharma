// create chakra-ui toast context

// import toast from chakra-ui

import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import { ReactNode, createContext, useCallback } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

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
            // title: title || "Success",
            description: message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: 'top',
            render: () => (
                <Box borderRadius={"md"} color='white' p={3} bg={"white"}>
                    <HStack gap={2}>

                        <CheckCircleIcon color={"green.700"} boxSize={"6"} />
                        <Text fontWeight={"bold"} color={"black"}>

                            {message}
                        </Text>
                    </HStack>
                </Box>
            ),

        });
    }, [Toast])

    const errorToast = useCallback((title: string, message: string) => {
        Toast({
            // title: title || "Error",
            description: message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: 'top',
            render: () => (
                <Box borderRadius={"md"} color='black' p={3} bg={"white"}>
                    <HStack gap={2}>

                        <Icon as={AiFillCloseCircle} color={"red.700"} boxSize={"6"} />
                        <Text fontWeight={"bold"}>
                            {message}
                        </Text>
                    </HStack>
                </Box>
            ),
        });
    }, [Toast])

    return (
        <ToastContext.Provider value={{ successToast, errorToast }}>
            {children}
        </ToastContext.Provider>
    );
};