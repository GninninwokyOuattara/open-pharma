import { createContext, useState } from "react";

export interface UserAuthContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;

}


export const UserAuthContext = createContext<UserAuthContextInterface | null>(null);

export const UserAuthContextProvider = ({ children }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <UserAuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}
        >
            {children}
        </UserAuthContext.Provider>
    )
}