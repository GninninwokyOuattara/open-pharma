import { createContext, useMemo } from "react";

const backendUrl = import.meta.env.VITE_APP_DJANGO_API_URL;



export interface PharmaciesReviewContextInterface {


}


export const PharmaciesReviewContext = createContext<PharmaciesReviewContextInterface | null>(null);


export const PharmaciesReviewContextProvider = ({ children }: any) => {


    const contextValue = useMemo(() => ({

    }), [


    ]);



    return (
        <PharmaciesReviewContext.Provider
            value={contextValue}>
            {children}
        </PharmaciesReviewContext.Provider>
    )


}
