import { createContext, useEffect, useState } from "react";
import { Pharmacy } from "../types";

const backendUrl = process.env.REACT_APP_DJANGO_API_URL;



export interface PharmaciesReviewContextInterface {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    pharmaciesPendingReviewStatic: Pharmacy[] | [];
    setPharmaciesPendingReviewStatic: React.Dispatch<React.SetStateAction<Pharmacy[] | []>>;
    pharmaciesPendingReview: Pharmacy[] | [];
    setPharmaciesPendingReview: React.Dispatch<React.SetStateAction<Pharmacy[] | []>>;
    orderBy: "Name" | "Date";
    setOrderBy: React.Dispatch<React.SetStateAction<"Name" | "Date">>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    fetchPharmaciesPendingReview: () => void;
    activatePharmacy: (pharmacy: Pharmacy) => void;
    deactivatePharmacy: (pharmacy: Pharmacy) => void;
    changeOrderByTo: (orderBy: "Name" | "Date") => void;


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


    // USE EFFECTS

    useEffect(() => {
        setIsLoading(true)
        fetchPharmaciesPendingReview().then(() => {
            setIsLoading(false)

        }).catch((error) => {
            setIsLoading(false)
            setError("An error occured while fetching pharmacies pending review")
            console.log("Error")
        })

    }, [])


    return (
        <PharmaciesReviewContext.Provider
            value={{
                isLoading,
                setIsLoading,
                error,
                setError,
                pharmaciesPendingReviewStatic,
                setPharmaciesPendingReviewStatic,
                pharmaciesPendingReview,
                setPharmaciesPendingReview,
                orderBy,
                setOrderBy,
                search,
                setSearch,
                fetchPharmaciesPendingReview,
                activatePharmacy,
                deactivatePharmacy,
                changeOrderByTo

            }}>
            {children}
        </PharmaciesReviewContext.Provider>
    )


}

function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; position: string; }) {
    throw new Error("Function not implemented.");
}
