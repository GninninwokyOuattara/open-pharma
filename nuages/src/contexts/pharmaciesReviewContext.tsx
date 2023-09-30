import { createContext, useMemo } from "react";
import { useQuery } from "react-query";
import usePharmaciesPendingReviewQueries from "../hooks/usePharmaciesPendingReviewQueries";
import { PharmacyBaseInfo } from "../types";

const backendUrl = import.meta.env.VITE_APP_DJANGO_API_URL;



export interface PharmaciesReviewContextInterface {


}


interface QueryData {
    data: {
        count: number,
        previous: null | string,
        next: null | string
        results: PharmacyBaseInfo[]
    }
}


export const PharmaciesReviewContext = createContext<PharmaciesReviewContextInterface | null>(null);


export const PharmaciesReviewContextProvider = ({ children }: any) => {


    const { getPharmaciesPendingReview } = usePharmaciesPendingReviewQueries();

    const { isLoading, data } = useQuery<QueryData, any>("pharmaciesPendingReview", getPharmaciesPendingReview);


    const contextValue = useMemo(() => ({
        pharmaciesPendingReview: data?.data.results
    }), [data]);



    return (
        <PharmaciesReviewContext.Provider
            value={contextValue}>
            {children}
        </PharmaciesReviewContext.Provider>
    )


}
