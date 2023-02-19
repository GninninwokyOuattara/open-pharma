
import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { PharmaciesDataSummary, PharmaciesStateAndSummary, PharmacyFullState } from '../types';
import { getTags } from '../utils/dry';


const backendUrl = process.env.REACT_APP_DJANGO_API_URL


export interface PharmaciesContextInterface {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    summary: PharmaciesDataSummary | undefined;
    setSummary: React.Dispatch<React.SetStateAction<PharmaciesDataSummary | undefined>>;
    pharmacies: PharmacyFullState[];
    setPharmacies: React.Dispatch<React.SetStateAction<PharmacyFullState[]>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    activeTags: string[];
    setActiveTags: React.Dispatch<React.SetStateAction<string[]>>;
    applyFilters: () => PharmacyFullState[]
    filterByTags: (pharmacies: PharmacyFullState[]) => PharmacyFullState[]
    filterBySearch: (pharmacies: PharmacyFullState[]) => PharmacyFullState[];
    filteredPharmacies: PharmacyFullState[];
    getDatas: () => Promise<PharmaciesStateAndSummary>;
    cleanDatas: () => void;
    refreshDatas: () => void;
    toggleActivity: (pharmacy: PharmacyFullState) => Promise<PharmacyFullState>;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    pharmacyInEditMode: PharmacyFullState | null;
    setPharmacyInEditMode: React.Dispatch<React.SetStateAction<PharmacyFullState | null>>;
    openEditingPharmacyModal: (pharmacy: PharmacyFullState) => void;
    closeEditingPharmacyModal: () => void;
    updatePharmacyInPharmacies: (pharmacy: PharmacyFullState) => void;
    pharmacyFocusedOnMap: PharmacyFullState | null;
    setPharmacyFocusedOnMap: React.Dispatch<React.SetStateAction<PharmacyFullState | null>>;


}

export const PharmaciesContext = createContext<PharmaciesContextInterface | null>(null);


export const PharmaciesContextProvider = ({ children }: any) => {

    // STATES

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [summary, setSummary] = useState<PharmaciesDataSummary>()
    const [pharmacies, setPharmacies] = useState<PharmacyFullState[]>([])
    const [pharmacyInEditMode, setPharmacyInEditMode] = useState<PharmacyFullState | null>(null)
    const [pharmacyFocusedOnMap, setPharmacyFocusedOnMap] = useState<PharmacyFullState | null>(null)

    const [error, setError] = useState("")
    const [search, setSearch] = useState<string>("")
    const [activeTags, setActiveTags] = useState<string[]>(["Inactive", "Active", "Open"])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()


    // METHODS 

    const applyFilters = () => {
        const firstFilter = filterByTags(pharmacies)
        const secondFilter = filterBySearch(firstFilter)
        return secondFilter
    }


    const filterByTags = useCallback((pharmacies: PharmacyFullState[]) => {
        if (activeTags.length === 3) {
            return pharmacies
        }

        const filteredPharmacies = pharmacies.filter((pharmacy) => {
            const pharmacyTags = getTags(pharmacy)
            const intersection = pharmacyTags.filter((tag) => activeTags.includes(tag))
            return intersection.length > 0
        })

        return filteredPharmacies
    }, [activeTags])


    const filterBySearch = useCallback((pharmacies: PharmacyFullState[]) => {
        if (search === "") {
            return pharmacies
        }

        const filteredPharmacies = pharmacies.filter((pharmacy) => {
            return pharmacy.name.toLowerCase().includes(search.toLowerCase())
        })

        return filteredPharmacies
    }, [search])


    const getDatas = async () => {
        try {
            const response = await fetch("http://localhost:8000//admin-api/get-pharmacies-state-and-count/")
            const data: PharmaciesStateAndSummary = await response.json()
            return data
        } catch (error: any) {
            cleanDatas()
            // setError(error.message)
            throw error
        }
    }


    const cleanDatas = () => {
        setSummary(undefined)
        setPharmacies([])

    }


    const refreshDatas = () => {
        setIsLoading(true)
        getDatas().then((data) => {
            const summary = data.summary
            const pharmacies = data.pharmacies

            setSummary(summary)
            setPharmacies(pharmacies)
            setIsLoading(false)
        }).catch((error) => {
            setError(error.message)
            setIsLoading(false)
        })
    }

    const toggleActivity = async (pharmacy: PharmacyFullState) => {
        try {

            const response = await fetch(`${backendUrl}/admin-api/pharmacies/${pharmacy.id}/${pharmacy.active ? "deactivate" : "activate"}/`, {
                method: "POST"
            })

            const res = await response.json()

            setPharmacies((prev) => {
                const newPharmacies: PharmacyFullState[] = prev.map((pharmacy) => {
                    if (pharmacy.id === res.id) {
                        return res
                    }
                    return pharmacy
                })
                return newPharmacies
            })

            return res as PharmacyFullState
        } catch (error: any) {
            throw error
        }



    }

    const updatePharmacyInPharmacies = (update: PharmacyFullState) => {
        setPharmacies((prev) => {
            const newPharmacies = prev.map((pharmacy) => {
                if (pharmacy.id === update.id) {
                    return update
                }
                return pharmacy
            })
            return newPharmacies
        })
    }

    // MODAL STUFF

    const openEditingPharmacyModal = (pharmacy: PharmacyFullState) => {
        setPharmacyInEditMode(pharmacy)
        onOpen()
    }

    const closeEditingPharmacyModal = () => {
        setPharmacyInEditMode(null)
        onClose()
    }

    // MEMO

    const filteredPharmacies = useMemo(() => {
        if (!pharmacies) return []
        const filtered = applyFilters()
        return filtered
    }, [pharmacies, search, activeTags])

    // USE EFFECTS

    useEffect(() => {

        refreshDatas()
    }, [])

    useEffect(() => {
        if (error) {
            toast({
                title: error,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            })

            setError("")
        }
    }, [error])


    return (
        <PharmaciesContext.Provider value={{
            isLoading,
            setIsLoading,
            error,
            setError,
            summary,
            setSummary,
            pharmacies,
            setPharmacies,
            search,
            setSearch,
            activeTags,
            setActiveTags,
            applyFilters,
            filterByTags,
            filterBySearch,
            filteredPharmacies,
            getDatas,
            cleanDatas,
            refreshDatas,
            toggleActivity,
            isOpen,
            onOpen,
            onClose,
            pharmacyInEditMode,
            setPharmacyInEditMode,
            openEditingPharmacyModal,
            closeEditingPharmacyModal,
            updatePharmacyInPharmacies,
            pharmacyFocusedOnMap,
            setPharmacyFocusedOnMap

        }}>
            {children}
        </PharmaciesContext.Provider>


    )
}



