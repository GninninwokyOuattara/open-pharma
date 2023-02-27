import { useToast } from "@chakra-ui/react";
import { createContext, useMemo, useRef, useState } from "react";
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
    handleSearch: (search: string) => void;
    checkOnePharmacy: (checkedPharmacy: PendingReviewPharmacy) => void;
    uncheckOnePharmacy: (checkedPharmacy: PendingReviewPharmacy) => void;
    checkAllPharmacies: () => void;
    uncheckAllPharmacies: () => void;

}


export const PharmaciesReviewContext = createContext<PharmaciesReviewContextInterface | null>(null);


export const PharmaciesReviewContextProvider = ({ children }: any) => {

    // STATES

    const [pharmaciesPendingReviewStatic, setPharmaciesPendingReviewStatic] = useState<Pharmacy[] | []>([]);
    const [pharmaciesPendingReview, setPharmaciesPendingReview] = useState<PendingReviewPharmacy[] | []>([]);
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const toast = useToast();

    const filteredPendingReviewPharmacies = useMemo(() => {
        if (!pharmaciesPendingReview) return []
        return pharmaciesPendingReview.filter((pharmacy: PendingReviewPharmacy) => {
            return pharmacy.name.toLowerCase().includes(search.toLowerCase())
        })
    }, [pharmaciesPendingReview, search])

    const cachedPharmacies = useRef<PendingReviewPharmacy[]>([])


    // METHODS
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

            datas.map((pharmacy: PendingReviewPharmacy) => {
                pharmacy["time_elapsed"] = getTimeElapsed(pharmacy.date_created)
            })
            setPharmaciesPendingReview(datas)
            cachedPharmacies.current = datas // cache datas

        } catch (error: any) {
            handleError(error)
        }

    }

    const handleError = (error: any) => {
        if (error.message === "Failed to fetch") {
            toast({
                title: "Connection error, please check your internet connection",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            })

        } else {
            toast({
                title: "An error occured, please try again later",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            })

        }
    }

    const handleSearch = (search: string) => {
        if (search) {
            setPharmaciesPendingReview(cachedPharmacies.current.filter((pharmacy: PendingReviewPharmacy) => {
                return pharmacy.name.toLowerCase().includes(search.toLowerCase())
            }
            ))
        } else {
            setPharmaciesPendingReview(cachedPharmacies.current)
        }
    }

    const refreshDatas = async () => {
        setIsLoading(true)
        await getPendingReviewPharmacies()
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


    // Checkboxes actions

    const checkOnePharmacy = (checkedPharmacy: PendingReviewPharmacy) => {
        setPharmaciesPendingReview((prev) => {
            return prev.map((pharmacy: PendingReviewPharmacy) => {
                if (checkedPharmacy.id === pharmacy.id) {
                    pharmacy.is_checked = true
                }
                return pharmacy
            })
        })
    }

    const uncheckOnePharmacy = (uncheckedPharmacy: PendingReviewPharmacy) => {
        setPharmaciesPendingReview((prev) => {
            return prev.map((pharmacy: PendingReviewPharmacy) => {
                if (uncheckedPharmacy.id === pharmacy.id) {
                    pharmacy.is_checked = false
                }
                return pharmacy
            })
        })
    }

    const checkAllPharmacies = () => {
        setPharmaciesPendingReview((prev) => {
            return prev.map((pharmacy: PendingReviewPharmacy) => {
                pharmacy.is_checked = true
                return pharmacy
            })
        })

    }

    const uncheckAllPharmacies = () => {
        setPharmaciesPendingReview((prev) => {
            return prev.map((pharmacy: PendingReviewPharmacy) => {
                pharmacy.is_checked = false
                return pharmacy
            })
        })
    }





    // USE EFFECTS

    // useEffect(() => {
    //     (async () => {
    //         await refreshDatas()
    //     })()

    // }, [])

    // useEffect(() => {
    //     if (error) {
    //         toast({
    //             title: error,
    //             status: "error",
    //             duration: 3000,
    //             isClosable: true,
    //             position: "top"
    //         })

    //         setError("")
    //     }
    // }, [error])




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
                handleSearch,
                checkOnePharmacy,
                uncheckOnePharmacy,
                checkAllPharmacies,
                uncheckAllPharmacies,


            }}>
            {children}
        </PharmaciesReviewContext.Provider>
    )


}
