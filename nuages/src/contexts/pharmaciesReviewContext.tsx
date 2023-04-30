import { useToast } from "@chakra-ui/react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { PendingReviewPharmacy, Pharmacy } from "../types";
import { getTimeElapsed } from "../utils/dry";
import { ToastContext, ToastContextInterface } from "./toast";

const backendUrl = process.env.REACT_APP_DJANGO_API_URL;



export interface PharmaciesReviewContextInterface {
    isLoading: boolean;
    refreshDatas: () => void;
    pendingReviewPharmacies: PendingReviewPharmacy[];
    setPharmaciesPendingReview: React.Dispatch<React.SetStateAction<PendingReviewPharmacy[] | []>>;
    filteredPendingReviewPharmacies: PendingReviewPharmacy[];
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    acceptPharmacy: (pharmacy: PendingReviewPharmacy) => Promise<void>;
    rejectPharmacy: (pharmacy: PendingReviewPharmacy) => Promise<void>;
    handleSearch: (search: string) => void;
    checkOnePharmacy: (checkedPharmacy: PendingReviewPharmacy) => void;
    uncheckOnePharmacy: (checkedPharmacy: PendingReviewPharmacy) => void;
    checkAllPharmacies: () => void;
    uncheckAllPharmacies: () => void;
    numberOfCheckedPharmacies: number;
    acceptSelectedPharmacies: () => Promise<void>;
    rejectSelectedPharmacies: () => Promise<void>;
    toggleCheckPendingReviewPharmacy: (pharmacy: PendingReviewPharmacy) => void;

}


export const PharmaciesReviewContext = createContext<PharmaciesReviewContextInterface | null>(null);


export const PharmaciesReviewContextProvider = ({ children }: any) => {

    // Context 

    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface


    // STATES

    const [pharmaciesPendingReviewStatic, setPharmaciesPendingReviewStatic] = useState<Pharmacy[] | []>([]);
    const [pharmaciesPendingReview, setPharmaciesPendingReview] = useState<PendingReviewPharmacy[] | []>([]);
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [rowsChecked, setRowsChecked] = useState<string[]>([]);
    let checkedPharmaciesList: PendingReviewPharmacy[] = []

    const toast = useToast();

    let filteredPendingReviewPharmacies = useMemo(() => {
        if (!pharmaciesPendingReview) return []
        return pharmaciesPendingReview.filter((pharmacy: PendingReviewPharmacy) => {
            return pharmacy.name.toLowerCase().includes(search.toLowerCase())
        })
    }, [pharmaciesPendingReview, search])

    const cachedPharmacies = useRef<PendingReviewPharmacy[]>([])

    const [numberOfCheckedPharmacies, setNumberOfCheckedPharmacies] = useState<number>(0);


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
        cleanDatas()
        await getPendingReviewPharmacies()
        setIsLoading(false)
    }

    const cleanDatas = () => {
        setPharmaciesPendingReview([])
        setError(null)
        setNumberOfCheckedPharmacies(0)
        setSearch("")

    }




    // Reviews action

    const acceptPharmacy = useCallback(async (pharmacy: PendingReviewPharmacy) => {
        try {
            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/activate/`, {
                method: "POST",
            });
            const data = await response.json();
            // await removePharmacyInPharmacies(data)
            successToast("", `${pharmacy.name} is now active`)

            // return true
            // refreshDatas()
        } catch (error: any) {
            // setError(error)
            // throw error
            errorToast("", `An error occurred while validating ${pharmacy.name}`)

        }
    }, [])



    const rejectPharmacy = async (pharmacy: PendingReviewPharmacy) => {
        try {
            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/deactivate/`, {
                method: "POST",
            });
            const data = await response.json();
            successToast("", `${pharmacy.name} is now inactive`)

            // removePharmacyInPharmacies(data)
            // return true
            // refreshDatas()
        } catch (error: any) {
            // setError(error)
            // throw error
            errorToast("", `An error occurred while validating ${pharmacy.name}`)
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

    const toggleCheckPendingReviewPharmacy = useCallback((pharmacy: PendingReviewPharmacy) => {
        const pharmacies = pharmaciesPendingReview.map((pharmacyPendingReview: PendingReviewPharmacy) => {
            if (pharmacyPendingReview.id === pharmacy.id) {
                pharmacyPendingReview.is_checked == true ? pharmacyPendingReview.is_checked = false : pharmacyPendingReview.is_checked = true
                return pharmacyPendingReview
            } else {
                return pharmacyPendingReview
            }

        })

        setPharmaciesPendingReview(pharmacies)
    }, [pharmaciesPendingReview])

    const checkOnePharmacy = (checkedPharmacy: PendingReviewPharmacy) => {
        setPharmaciesPendingReview((prev) => {
            return prev.map((pharmacy: PendingReviewPharmacy) => {
                if (checkedPharmacy.id === pharmacy.id) {
                    pharmacy.is_checked = true
                }
                return pharmacy
            })
        })

        setNumberOfCheckedPharmacies((prev) => prev + 1)
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

        setNumberOfCheckedPharmacies((prev) => prev - 1)
    }

    const checkAllPharmacies = () => {
        setPharmaciesPendingReview((prev) => {
            return prev.map((pharmacy: PendingReviewPharmacy) => {
                pharmacy.is_checked = true
                return pharmacy
            })
        })

        setNumberOfCheckedPharmacies((prev) => pharmaciesPendingReview.length)

    }

    const uncheckAllPharmacies = () => {
        setPharmaciesPendingReview((prev) => {
            return prev.map((pharmacy: PendingReviewPharmacy) => {
                pharmacy.is_checked = false
                return pharmacy
            })
        })

        setNumberOfCheckedPharmacies(0)
    }

    const acceptSelectedPharmacies = async () => {

        const selectedPharmacies = pharmaciesPendingReview.filter((pharmacy: PendingReviewPharmacy) => pharmacy.is_checked)
        const promises = selectedPharmacies.map((pharmacy: PendingReviewPharmacy) => acceptPharmacy(pharmacy))
        await Promise.all(promises)
        // uncheckAllPharmacies()
        refreshDatas()
    }


    const rejectSelectedPharmacies = async () => {

        const selectedPharmacies = pharmaciesPendingReview.filter((pharmacy: PendingReviewPharmacy) => pharmacy.is_checked)
        const promises = selectedPharmacies.map((pharmacy: PendingReviewPharmacy) => rejectPharmacy(pharmacy))
        await Promise.all(promises)
        // uncheckAllPharmacies()
        refreshDatas()

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


    // useEffect(() => {
    //     let id = setInterval(() => {
    //         console.log("Start Interval", pharmaciesPendingReview.length)
    //         if (pharmaciesPendingReview.length > 0) {
    //             const newPharmacies = pharmaciesPendingReview.map((pharmacy: PendingReviewPharmacy, idx) => {
    //                 if (idx == 0) {
    //                     pharmacy.is_checked = !pharmacy.is_checked
    //                     console.log(pharmacy.name, pharmacy.is_checked)

    //                     return pharmacy
    //                 }
    //                 return pharmacy
    //             })

    //             console.log(newPharmacies !== pharmaciesPendingReview);
    //             setPharmaciesPendingReview(newPharmacies)
    //         }
    //     }, 3000)

    //     return () => {
    //         if (id) {
    //             clearInterval(id)
    //         }
    //     }
    // }, [pharmaciesPendingReview])



    const contextValue = useMemo(() => ({
        isLoading,
        refreshDatas,
        pendingReviewPharmacies: pharmaciesPendingReview,
        setPharmaciesPendingReview,
        filteredPendingReviewPharmacies,
        setSearch,
        acceptPharmacy,
        rejectPharmacy,
        handleSearch,
        checkOnePharmacy,
        uncheckOnePharmacy,
        checkAllPharmacies,
        uncheckAllPharmacies,
        numberOfCheckedPharmacies,
        acceptSelectedPharmacies,
        rejectSelectedPharmacies,
        toggleCheckPendingReviewPharmacy
    }), [
        isLoading,
        refreshDatas,
        pharmaciesPendingReview,
        filteredPendingReviewPharmacies,
        setSearch,
        acceptPharmacy,
        rejectPharmacy,
        handleSearch,
        checkOnePharmacy,
        uncheckOnePharmacy,
        checkAllPharmacies,
        uncheckAllPharmacies,
        numberOfCheckedPharmacies,
        acceptSelectedPharmacies,
        rejectSelectedPharmacies,
        toggleCheckPendingReviewPharmacy

    ]);



    return (
        <PharmaciesReviewContext.Provider
            value={contextValue}>
            {children}
        </PharmaciesReviewContext.Provider>
    )


}
