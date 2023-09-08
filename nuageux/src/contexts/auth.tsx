import { authenticate, refreshAccessToken } from "@/api/authApis";
import { toast } from "@/components/ui/use-toast";
import LoadingState from "@/pages/loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, createContext, useContext, useRef, useState } from "react";


interface ICredentials {
    login: string,
    password: string
}
interface AuthenticationData {
    access: string,
    isAuthenticated: boolean,

}

interface AuthenticationContextProps extends AuthenticationData {
    submitAuthForm: (credentials: ICredentials) => void,
    logout: () => void,
    isLoginLoading: boolean
}

export const AuthContext = createContext<AuthenticationContextProps>({
    access: "",
    isAuthenticated: false,
    submitAuthForm: () => { },
    logout: () => { },
    isLoginLoading: false
})

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authenticationData, setAuthenticationData] = useState<AuthenticationData>({
        access: "",
        isAuthenticated: false,
    })
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [enabledRefreshToken, setEnabledRefreshToken] = useState<boolean>(false)
    const [initialAccessToken, setInitialAccessToken] = useState("")
    const interceptorId = useRef<number | null>(null)




    const authenticationMutation = useMutation({
        mutationFn: (credentials: ICredentials) => authenticate(credentials.login, credentials.password),
        onSuccess: (data) => {
            localStorage.setItem("oph-access-token", data.data.access)
            localStorage.setItem("oph-refresh-token", data.data.refresh)
            setAuthenticationData({
                access: data.data.access,
                isAuthenticated: true
            })
            setIsProcessing(false)
            setEnabledRefreshToken(true)
        },

        onError: (error) => {
            if (error.response.status === 401) {
                toast({
                    title: "Invalid credentials",
                })
            }
        }
    })




    const submitAuthForm = (credentials: ICredentials) => {
        authenticationMutation.mutate(credentials)
    }


    const logout = () => {
        console.log("Logging out")
        localStorage.removeItem("oph-access-token")
        localStorage.removeItem("oph-refresh-token")
        setAuthenticationData({
            access: "",
            isAuthenticated: false,
        })
    }

    const { isLoading, isFetching } = useQuery({
        queryKey: ["initial-refresh-token"],
        queryFn: () => {

            return refreshAccessToken()
        },
        enabled: !!localStorage.getItem("oph-refresh-token"),
        retry: false,
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
                isAuthenticated: true,

            })
            setEnabledRefreshToken(true)

        },
        onError: (error) => {
            if (error.response.status === 401) {
                toast({
                    title: "Your session has expired",
                })
                logout()
            }
        }

    })




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
                isAuthenticated: true,

            })

        }

    })




    // const authenticationRoutine = useCallback(async () => {
    //     try {
    //         const { data } = await axios.post<ResponseRefreshTokenDataSuccess>("http://192.168.1.6:8080/admin-api/refresh/", {
    //             refresh: localStorage.getItem("oph-refresh-token")
    //         })
    //         localStorage.setItem("oph-access-token", data.access)
    //         setAuthenticationData({
    //             access: data.access,
    //             isAuthenticated: true
    //         })
    //         setIsProcessing(false)
    //         setEnabledRefreshToken(true)
    //         setInitialAccessToken(data.access)




    //     } catch (error) {

    //         try {
    //             console.log("Refresh failed hence we try to login")
    //             const loginResponse = await axios.post<ResponseLoginDataSuccess>("http://192.168.1.6:8080/admin-api/auth/", {
    //                 username: "gninninwoky",
    //                 password: "gninninwoky"
    //             })
    //             console.log(loginResponse)

    //             localStorage.setItem("oph-refresh-token", loginResponse.data.refresh)
    //             setAuthenticationData({
    //                 access: loginResponse.data.access,
    //                 isAuthenticated: true
    //             })

    //             setInitialAccessToken(loginResponse.data.access)
    //             setEnabledRefreshToken(true)

    //         } catch (error) {
    //             console.log("Login failed")
    //         }

    //     } finally {
    //         setIsProcessing(false)
    //     }
    // }, [setAuthenticationData])




    // useEffect(() => {
    //     console.log("Ran effect");

    //     (async () => {
    //         await authenticationRoutine()

    //     })()


    // }, [])


    // if (error) {
    //     return <div>{error.message}</div>
    // }



    if (isLoading && isFetching) {
        return <LoadingState />
    }

    return (
        <AuthContext.Provider value={{
            ...authenticationData,
            submitAuthForm,
            logout,
            isLoginLoading: authenticationMutation.isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}