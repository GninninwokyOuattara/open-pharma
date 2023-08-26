import { ResponseLoginDataSuccess, ResponseRefreshTokenDataSuccess } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

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
    const [hasInitialRefreshTokenFailed, setHasInitialRefreshTokenFailed] = useState<boolean>(false)
    const [enabledRefreshToken, setEnabledRefreshToken] = useState<boolean>(false)


    const refreshAccessToken = () => {
        console.log("refresh holla")
        const refreshToken = localStorage.getItem("oph-refresh-token")
        console.log("refresh Token", refreshToken)
        return axios.post<ResponseRefreshTokenDataSuccess>("http://localhost:8080/admin-api/refresh/", {
            refresh: refreshToken
        })
    }

    useQuery({
        queryKey: ["refresh-token"],
        queryFn: refreshAccessToken,
        refetchInterval: 1000 * 60 * 2,
        enabled: enabledRefreshToken,
        onSuccess: (data) => {
            console.log(data)
            setAuthenticationData({
                access: data.data.access,
                isAuthenticated: true
            })

        }

    })


    const authenticationRoutine = useCallback(async () => {
        try {
            const { data } = await axios.post<ResponseRefreshTokenDataSuccess>("http://localhost:8080/admin-api/refresh/", {
                refresh: localStorage.getItem("oph-refresh-token")
            })
            localStorage.setItem("oph-access-token", data.access)
            setAuthenticationData({
                access: data.access,
                isAuthenticated: true
            })
            setIsProcessing(false)
            setEnabledRefreshToken(true)



        } catch (error) {

            try {
                console.log("Refresh failed hence we try to login")
                const loginResponse = await axios.post<ResponseLoginDataSuccess>("http://localhost:8080/admin-api/auth/", {
                    username: "gninninwoky",
                    password: "gninninwoky"
                })
                console.log(loginResponse)

                localStorage.setItem("oph-refresh-token", loginResponse.data.refresh)
                setAuthenticationData({
                    access: loginResponse.data.access,
                    isAuthenticated: true
                })

                setEnabledRefreshToken(true)

            } catch (error) {
                console.log("Login failed")
            }

        } finally {
            setIsProcessing(false)
        }
    }, [setAuthenticationData])




    useEffect(() => {
        console.log("Ran effect");

        (async () => {
            await authenticationRoutine()

        })()


    }, [authenticationRoutine])


    // if (error) {
    //     return <div>{error.message}</div>
    // }



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