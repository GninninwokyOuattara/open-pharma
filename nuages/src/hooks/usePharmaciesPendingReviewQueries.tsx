import axios from "axios"
import { useUserAuthContext } from "../contexts/userAuthContext"


const usePharmaciesPendingReviewQueries = () => {

    const { authData } = useUserAuthContext()
    const accessToken = (authData != null && "access" in authData) ? authData.access : ""

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL

    const getPharmaciesPendingReview = () => {
        return axios.get(`${backendUrl}/admin-api/pharmacies-pending-review`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`

                }
            }
        )
    }


    return {
        getPharmaciesPendingReview
    }
}

export default usePharmaciesPendingReviewQueries