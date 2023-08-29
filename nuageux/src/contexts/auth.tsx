import { refreshAccessToken } from "@/api/authApis";
import { ResponseLoginDataSuccess, ResponseRefreshTokenDataSuccess } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

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
    const [enabledRefreshToken, setEnabledRefreshToken] = useState<boolean>(false)
    const [initialAccessToken, setInitialAccessToken] = useState("")
    const interceptorId = useRef<number | null>(null)




    useQuery({
        queryKey: ["refresh-token"],
        queryFn: refreshAccessToken,
        refetchInterval: 1000 * 60 * 2,
        enabled: enabledRefreshToken,
        onSuccess: (data) => {
            localStorage.setItem("oph-access-token", data.data.access)

            interceptorId.current = axios.interceptors.request.use((config) => {
                config.headers["Authorization"] = `Bearer ${localStorage.getItem("oph-access-token")}`
                return config
            }, error => {
                return Promise.reject(error)
            }
            )




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
            setInitialAccessToken(data.access)




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

                setInitialAccessToken(loginResponse.data.access)
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


    }, [])


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