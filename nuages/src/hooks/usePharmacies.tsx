import { useEffect, useState } from "react"
import { PharmaciesDataSummary, PharmaciesStateAndSummary, PharmacyFullState } from "../types"


const usePharmacies = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [summary, setSummary] = useState<PharmaciesDataSummary>()
    const [pharmacies, setPharmacies] = useState<PharmacyFullState[]>([])
    const [error, setError] = useState(null)

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


    return { isLoading, summary, pharmacies, error }

}


export default usePharmacies