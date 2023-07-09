import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ToastContext, ToastContextInterface } from "./toast";


interface AuthenticationSuccess {
    refresh: string,
    access: string
}

interface AuthenticationFailure {
    detail: string
}

interface RefreshTokenSuccess {
    access: string
}

interface RefreshTokenFailure {
    detail: string,
    code: string
}




type AuthenticationResponse = AuthenticationSuccess | AuthenticationFailure
type AuthSuccess<T, K> = K extends keyof T ? T[K] : never
type RefreshTokenResponse = RefreshTokenSuccess | RefreshTokenFailure

export interface UserAuthContextInterface {
    isAuthenticated: boolean;
    // setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    authenticate: (email: string, password: string) => Promise<boolean>;
    isAuthenticating: boolean;
    logout: () => void;
    authData: AuthenticationResponse | null;


}

const backendUrl = import.meta.env.VITE_APP_DJANGO_API_URL


export const UserAuthContext = createContext<UserAuthContextInterface | null>(null);


export const useUserAuthContext = () => {
    return useContext(UserAuthContext) as UserAuthContextInterface
}

export const UserAuthContextProvider = ({ children }: any) => {

    // toast context

    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [refresh, setRefresh] = useState("")
    const [access, setAccess] = useState("")
    const [authData, setAuthData] = useState<AuthenticationResponse | null>(null)


    const authenticate = async (email: string, password: string): Promise<boolean> => {
        setIsAuthenticating(true)
        try {
            const response = await fetch(backendUrl + "/admin-api/auth/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            })

            if (response.status === 200) {
                successToast("", "Authentication succesful")
                const data: AuthenticationResponse = await response.json()
                setIsAuthenticated(true)
                setAuthData(data)
                console.log(data)
                saveAuthDataToLocalStorage(data)
            } else if (response.status == 401) {
                let failureMessage = await response.json();
                errorToast("", failureMessage.detail);
            } else {
                errorToast("", "Something went wrong, please try again later.");
            }
        } catch (error) {
            console.log(error)
            errorToast("", "Something went wrong, please try again later.");
        }

        setIsAuthenticating(false)
        return isAuthenticated

    }

    const logout = () => {
        setIsAuthenticated(false)
        setAuthData(null)
        clearAuthDataFromLocalStorage()
    }


    const refreshUserToken = useCallback(async (refreshToken: string) => {
        try {
            if (authData && "refresh" in authData) {
                const access = await getNewAccessToken(authData.refresh);
                setAuthData({
                    access,
                    refresh: authData.refresh
                })
            }
        } catch (error) {
            console.log("Error", error)
            setIsAuthenticated(false)
            setAuthData(null)
            clearAuthDataFromLocalStorage()
        }
    }, [authData])


    const getNewAccessToken = async (refreshToken: string) => {
        const response = await fetch(backendUrl + "/admin-api/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: refreshToken
            })
        })

        if (response.status === 200) {
            const accessToken = await response.json()
            console.log("New Access token", accessToken.access)
            return accessToken.access
        } else {
            throw response
        }
    }

    // local storage manipulation

    const saveAuthDataToLocalStorage = (data: AuthenticationResponse) => {
        localStorage.setItem("open-pharma-auth-data", JSON.stringify(data))
    }

    const loadAuthDataFromLocalStorage = useCallback(() => {
        const data = localStorage.getItem("open-pharma-auth-data")
        if (data) {
            const authData = JSON.parse(data) as AuthenticationSuccess
            getNewAccessToken(authData.refresh).then((access) => {
                setAuthData({
                    access: access,
                    refresh: authData.refresh
                })
                setIsAuthenticated(true)
            }).catch(() => {
                console.log("Error getting new access token")
                setIsAuthenticated(false)
            })
        }
    }, [])

    const clearAuthDataFromLocalStorage = () => {
        localStorage.removeItem("open-pharma-auth-data")
    }

    useEffect(() => {
        loadAuthDataFromLocalStorage()
        console.log("Setting things up")
    }, [])

    useEffect(() => {
        let timeoutId: any
        if (isAuthenticated && authData && "refresh" in authData) {
            console.log("refreshing token in 1 minutes");
            timeoutId = setTimeout(() => {

                refreshUserToken(authData.refresh)
            }, 240000)
        }

        return () => {
            console.log("Clear timeout")
            clearTimeout(timeoutId)
        }
    }, [authData, refreshUserToken])

    return (
        <UserAuthContext.Provider value={{
            isAuthenticated,
            // setIsAuthenticated,
            authenticate,
            isAuthenticating,
            logout,
            authData
        }}
        >
            {children}
        </UserAuthContext.Provider>
    )
}



