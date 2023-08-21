import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface AuthenticationData {
    access: string,
    isAuthenticated: boolean,
}

export const AuthContext = createContext<AuthenticationData>({
    access: "",
    isAuthenticated: false,
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authenticationData, setAuthenticationData] = useState<AuthenticationData>({
        access: "",
        isAuthenticated: false,
    })
    const [isProcessing, setIsProcessing] = useState<boolean>(true)

    const refreshAccessToken = () => {
        const refreshToken = localStorage.getItem("oph-refresh-token")
        return axios.post("http://localhost:8080/admin-api/refresh/", {
            refresh: refreshToken
        })
    }

    const { data, error, isSuccess } = useQuery<any, any>(
        {
            queryKey: ["refesh-access-toeken"],
            queryFn: refreshAccessToken,
            staleTime: 1000 * 60,
            refetchInterval: 1000 * 60

        })


    useEffect(() => {
        if (isSuccess) {
            setAuthenticationData({
                access: data.access,
                isAuthenticated: true,
            })
            setIsProcessing(false)
        }
    }, [isSuccess])







    if (isProcessing) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={authenticationData}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}