import { createContext, useEffect, useState } from "react";
import { Pharmacy } from "../types";

const backendUrl = process.env.REACT_APP_DJANGO_API_URL;



export interface PharmaciesReviewContextInterface {
    isLoading: boolean;
    refreshDatas: () => void;


}


export const PharmaciesReviewContext = createContext<PharmaciesReviewContextInterface | null>(null);


export const PharmaciesReviewContextProvider = ({ children }: any) => {

    // STATES

    const [pharmaciesPendingReviewStatic, setPharmaciesPendingReviewStatic] = useState<Pharmacy[] | []>([]);
    const [pharmaciesPendingReview, setPharmaciesPendingReview] = useState<Pharmacy[] | []>([]);
    const [orderBy, setOrderBy] = useState<"Name" | "Date">("Name");
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    // METHODS

    const fetchPharmaciesPendingReview = async () => {

        // This whole stuff need some serious rewrite
        setIsLoading(true)
        try {
            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/`);
            const data = await response.json();
            // pre ordering

            if (orderBy === "Name") {
                data.sort((a: Pharmacy, b: Pharmacy) => a.name.localeCompare(b.name))
            } else {
                data.sort((a: Pharmacy, b: Pharmacy) => {
                    const dateA = new Date(a.date_created);
                    const dateB = new Date(b.date_updated);
                    return dateB.getTime() - dateA.getTime()
                })
            }



            // setPharmaciesPendingReviewStatic(data);
            setPharmaciesPendingReview(data);
        } catch (error) {
            setError("An error occured while fetching pharmacies pending review")
            toast({
                title: 'Error.',
                description: `An error occured while fetching pharmacies pending review!`,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        }


        setIsLoading(false)
    }

    const activatePharmacy = (pharmacy: Pharmacy) => {
        fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/activate/`, {
            method: "POST",
        }).then((response) => {
            console.log(response)

        }).catch((error) => {
            console.log(error)
        })
    }

    const deactivatePharmacy = (pharmacy: Pharmacy) => {
        fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/deactivate/`, {
            method: "POST",
        }).then((response) => {
            console.log(response)

        }).catch((error) => {
            console.log(error)
        })

    }

    const changeOrderByTo = (newOrderBy: "Name" | "Date") => {

        if (newOrderBy === orderBy) {
            return
        }

        setOrderBy(newOrderBy)

        if (newOrderBy === "Name") {
            setPharmaciesPendingReview([...pharmaciesPendingReview].sort((a, b) => a.name.localeCompare(b.name)))
        } else {
            setPharmaciesPendingReview([...pharmaciesPendingReview].sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()))
        }
    }

    // New METHODS

    const getPendingReviewPharmacies = async () => {

        try {

            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/`);
            const data = await response.json();
            return data;
        } catch (error: any) {
            setPharmaciesPendingReview([]);
            setError(error)
            throw error
        }

    }

    const refreshDatas = async () => {
        setIsLoading(true)
        try {
            setPharmaciesPendingReview(await getPendingReviewPharmacies())
        } catch (error: any) {
            setError(error)
        };
        setIsLoading(false)
    }

    const cleanDatas = () => {
        setPharmaciesPendingReview([])
        setError(null)
    }

    // USE EFFECTS

    useEffect(() => {
        (async () => {
            await refreshDatas()
        })()

    }, [])


    return (
        <PharmaciesReviewContext.Provider
            value={{
                isLoading,
                refreshDatas


            }}>
            {children}
        </PharmaciesReviewContext.Provider>
    )


}
