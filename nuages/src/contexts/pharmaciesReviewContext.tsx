import { createContext, useEffect, useMemo, useState } from "react";
import { PendingReviewPharmacy, Pharmacy } from "../types";
import { getTimeElapsed } from "../utils/dry";

const backendUrl = process.env.REACT_APP_DJANGO_API_URL;



export interface PharmaciesReviewContextInterface {
    isLoading: boolean;
    refreshDatas: () => void;
    pendingReviewPharmacies: PendingReviewPharmacy[];
    filteredPendingReviewPharmacies: PendingReviewPharmacy[];
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    acceptPharmacy: (pharmacy: PendingReviewPharmacy) => Promise<boolean>
    rejectPharmacy: (pharmacy: PendingReviewPharmacy) => Promise<boolean>;

}


export const PharmaciesReviewContext = createContext<PharmaciesReviewContextInterface | null>(null);


export const PharmaciesReviewContextProvider = ({ children }: any) => {

    // STATES

    const [pharmaciesPendingReviewStatic, setPharmaciesPendingReviewStatic] = useState<Pharmacy[] | []>([]);
    const [pharmaciesPendingReview, setPharmaciesPendingReview] = useState<PendingReviewPharmacy[] | []>([]);
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const filteredPendingReviewPharmacies = useMemo(() => {
        if (!pharmaciesPendingReview) return []
        return pharmaciesPendingReview.filter((pharmacy: PendingReviewPharmacy) => {
            return pharmacy.name.toLowerCase().includes(search.toLowerCase())
        })
    }, [pharmaciesPendingReview, search])


    // METHODS

    // const fetchPharmaciesPendingReview = async () => {

    //     // This whole stuff need some serious rewrite
    //     setIsLoading(true)
    //     try {
    //         const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/`);
    //         const data = await response.json();
    //         // pre ordering

    //         if (orderBy === "Name") {
    //             data.sort((a: Pharmacy, b: Pharmacy) => a.name.localeCompare(b.name))
    //         } else {
    //             data.sort((a: Pharmacy, b: Pharmacy) => {
    //                 const dateA = new Date(a.date_created);
    //                 const dateB = new Date(b.date_updated);
    //                 return dateB.getTime() - dateA.getTime()
    //             })
    //         }



    //         // setPharmaciesPendingReviewStatic(data);
    //         setPharmaciesPendingReview(data);
    //     } catch (error) {
    //         setError("An error occured while fetching pharmacies pending review")
    //         toast({
    //             title: 'Error.',
    //             description: `An error occured while fetching pharmacies pending review!`,
    //             status: "error",
    //             duration: 2000,
    //             isClosable: true,
    //             position: 'top-right'
    //         })
    //     }


    //     setIsLoading(false)
    // }

    // const activatePharmacy = (pharmacy: Pharmacy) => {
    //     fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/activate/`, {
    //         method: "POST",
    //     }).then((response) => {
    //         console.log(response)

    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    // const deactivatePharmacy = (pharmacy: Pharmacy) => {
    //     fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/deactivate/`, {
    //         method: "POST",
    //     }).then((response) => {
    //         console.log(response)

    //     }).catch((error) => {
    //         console.log(error)
    //     })

    // }

    // const changeOrderByTo = (newOrderBy: "Name" | "Date") => {

    //     if (newOrderBy === orderBy) {
    //         return
    //     }

    //     setOrderBy(newOrderBy)

    //     if (newOrderBy === "Name") {
    //         setPharmaciesPendingReview([...pharmaciesPendingReview].sort((a, b) => a.name.localeCompare(b.name)))
    //     } else {
    //         setPharmaciesPendingReview([...pharmaciesPendingReview].sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()))
    //     }
    // }

    // New METHODS

    const getPendingReviewPharmacies = async () => {

        try {

            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/`);
            const datas = await response.json();
            // sort datas by date
            datas.sort((a: PendingReviewPharmacy, b: PendingReviewPharmacy) => {
                const dateA = new Date(a.date_created);
                const dateB = new Date(b.date_updated);
                return dateB.getTime() - dateA.getTime()
            })

            return datas;
        } catch (error: any) {
            setPharmaciesPendingReview([]);
            setError(error)
            throw error
        }

    }

    const refreshDatas = async () => {
        setIsLoading(true)
        try {
            const pharmacies = await getPendingReviewPharmacies()
            console.log(pharmacies.splice(0, 3))
            pharmacies.map((pharmacy: PendingReviewPharmacy) => {
                pharmacy["time_elapsed"] = getTimeElapsed(pharmacy.date_created)
            })
            setPharmaciesPendingReview(pharmacies)
        } catch (error: any) {
            setError(error)
        };
        setIsLoading(false)
    }

    const cleanDatas = () => {
        setPharmaciesPendingReview([])
        setError(null)
    }


    // Reviews action

    const acceptPharmacy = async (pharmacy: PendingReviewPharmacy) => {
        try {
            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/activate/`, {
                method: "POST",
            });
            const data = await response.json();
            await removePharmacyInPharmacies(data)
            return true
            // refreshDatas()
        } catch (error: any) {
            setError(error)
            throw error
        }
    }

    const rejectPharmacy = async (pharmacy: PendingReviewPharmacy) => {
        try {
            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/deactivate/`, {
                method: "POST",
            });
            const data = await response.json();
            removePharmacyInPharmacies(data)
            return true
            // refreshDatas()
        } catch (error: any) {
            setError(error)
            throw error
        }
    }

    const linkPharmacy = async () => {
        // SOON
        console.log("TO BE DONE")
    }


    const removePharmacyInPharmacies = (update: PendingReviewPharmacy) => {

        setPharmaciesPendingReview((prev) => {
            return prev.filter((pharmacy: PendingReviewPharmacy) => pharmacy.id !== update.id)
        })

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
                refreshDatas,
                pendingReviewPharmacies: pharmaciesPendingReview,
                filteredPendingReviewPharmacies,
                setSearch,
                acceptPharmacy,
                rejectPharmacy,


            }}>
            {children}
        </PharmaciesReviewContext.Provider>
    )


}
