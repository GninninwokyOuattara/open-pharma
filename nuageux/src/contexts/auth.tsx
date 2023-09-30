import { authenticate, refreshAccessToken } from "@/api/authApis";
import { toast } from "@/components/ui/use-toast";
import LoadingState from "@/pages/loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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
    const [enabledRefreshToken, setEnabledRefreshToken] = useState<boolean>(false)
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
            setEnabledRefreshToken(true)
        },

        onError: (error: AxiosError) => {
            if (error.response) {

                if (error.response.status === 401) {
                    toast({
                        title: "Invalid credentials",
                    })
                }

                else {
                    toast({
                        title: "An unexpected error occured. Please try again later.",
                    })
                }

            } else if (error.code === "ERR_NETWORK") {
                toast({
                    title: "A network error occured. Please try again later.",
                })
            }


        }
    })




    const submitAuthForm = (credentials: ICredentials) => {
        authenticationMutation.mutate(credentials)
    }


    const logout = () => {
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
        onError: (error: AxiosError) => {
            if (error.response) {
                if (error.response.status === 401) {
                    toast({
                        title: "Your session has expired",
                    })
                    logout()
                }
            } else {

                toast({
                    title: "An unexpected error occured, please try again later.",
                })
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