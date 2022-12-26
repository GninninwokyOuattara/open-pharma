import { useCallback, useEffect, useMemo, useState } from "react"
import { PharmaciesDataSummary, PharmaciesStateAndSummary, PharmacyFullState } from "../types"
import { getTags } from "../utils/dry"


const usePharmacies = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [summary, setSummary] = useState<PharmaciesDataSummary>()
    const [pharmacies, setPharmacies] = useState<PharmacyFullState[]>([])
    // const [filteredPharmacies, setFilteredPharmacies] = useState<PharmacyFullState[]>([])

    const [error, setError] = useState(null)
    const [search, setSearch] = useState<string>("")
    const [activeTags, setActiveTags] = useState<string[]>(["Inactive", "Active", "Open"])

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

    const filteredPharmacies = useMemo(() => {
        if (!pharmacies) return []
        const filtered = applyFilters()
        return filtered
    }, [pharmacies, search, activeTags])

    const getDatas = async () => {
        try {
            const response = await fetch("http://localhost:8000//admin-api/get-pharmacies-state-and-count/")
            const data: PharmaciesStateAndSummary = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {

        setIsLoading(true)
        getDatas().then((data) => {
            const summary = data.summary
            const pharmacies = data.pharmacies

            setSummary(summary)
            setPharmacies(pharmacies)
        }).catch((error) => {
            console.log(error)
        })


        setIsLoading(false)
    }, [])








    return { isLoading, summary, pharmacies, error, applyFilters, filteredPharmacies, setSearch, setActiveTags }

}


export default usePharmacies