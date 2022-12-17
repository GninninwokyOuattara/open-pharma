import { useToast } from "@chakra-ui/react";
import { Pharmacy } from "../../types";


const backendUrl = process.env.REACT_APP_DJANGO_API_URL

const useReviewActions = () => {

    const toast = useToast();

    const toastIt = (status: "success" | "error", pharmacy: Pharmacy) => {

        const review = status === "success" ? "activated" : "deactivated"

        toast({
            title: 'Review.',
            description: `${pharmacy.name} is now ${review}!`,
            status: status,
            duration: 2000,
            isClosable: true,
            position: 'top-right'
        })
    }


    const activatePharmacy = (pharmacy: Pharmacy) => {

        try {
            fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/activate/`, {
                method: "POST",
            }).then((response) => {
                if (response.status === 200) {
                    toastIt("success", pharmacy)
                } else {
                    throw new Error("Something went wrong")
                }
            })
        } catch (error) {
            toast({
                title: 'Error.',
                description: `An error occured while activating ${pharmacy.name}!`,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        }

        return true
    }

    const deactivatePharmacy = (pharmacy: Pharmacy) => {

        try {
            fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/deactivate/`, {
                method: "POST",
            }).then((response) => {
                if (response.status === 200) {
                    toastIt("success", pharmacy)
                } else {
                    throw new Error("Something went wrong")
                }
            })
        } catch (error) {
            toast({
                title: 'Error.',
                description: `An error occured while deactivating ${pharmacy.name}!`,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        }

        return false
    }


    return { activatePharmacy, deactivatePharmacy }


}

export default useReviewActions