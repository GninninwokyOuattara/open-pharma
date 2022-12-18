import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Pharmacy } from "../../types";


const backendUrl = process.env.REACT_APP_DJANGO_API_URL

const useReviewActions = () => {

    const [pharmaciesPendingReviewStatic, setPharmaciesPendingReviewStatic] = useState<Pharmacy[] | []>([]);
    const [pharmaciesPendingReview, setPharmaciesPendingReview] = useState<Pharmacy[] | []>([]);
    const [ordering, setOrdering] = useState<"Name" | "Date">("Name");
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const toast = useToast();

    const fetchPharmaciesPendingReview = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/`);
            const data = await response.json();
            setPharmaciesPendingReviewStatic(data);
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


    const toastIt = (type: "activation" | "deactivation", pharmacy: Pharmacy) => {

        const review = type === "activation" ? "activated" : "deactivated"

        toast({
            title: 'Review Validated !',
            description: `${pharmacy.name} is now ${review}!`,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: 'top-right'
        })
    }


    const activatePharmacy = (pharmacy: Pharmacy) => {
        fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/activate/`, {
            method: "POST",
        }).then((response) => {
            if (response.status === 200) {
                toastIt("activation", pharmacy)
                fetchPharmaciesPendingReview()
            } else {
                throw Error
            }
        }).catch((error) => {
            toast({
                title: 'Error.',
                description: `An error occured while activating ${pharmacy.name}!`,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    const deactivatePharmacy = (pharmacy: Pharmacy) => {
        fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacy.id}/deactivate/`, {
            method: "POST",
        }).then((response) => {
            if (response.status === 200) {
                toastIt("deactivation", pharmacy)
                fetchPharmaciesPendingReview()

            } else {
                throw new Error("Something went wrong")
            }
        }).catch((error) => {
            toast({
                title: 'Error.',
                description: `An error occured while deactivating ${pharmacy.name}!`,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        })

    }

    const handleOrderingChange = (ordering: "Name" | "Date") => {
        setOrdering(ordering)
        if (ordering === "Name") {
            setPharmaciesPendingReview([...pharmaciesPendingReview].sort((a, b) => a.name.localeCompare(b.name)))
        } else {
            setPharmaciesPendingReview([...pharmaciesPendingReview].sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime()))
        }
    }

    const handleSearch = (search: string) => {
        // setSearch(search)
        if (search === "") {
            setPharmaciesPendingReview(pharmaciesPendingReviewStatic)
        } else {
            setPharmaciesPendingReview(pharmaciesPendingReviewStatic.filter((pharmacy: Pharmacy) => pharmacy.name.toLowerCase().includes(search.toLowerCase())))
        }
    }


    return { activatePharmacy, deactivatePharmacy, fetchPharmaciesPendingReview, pharmaciesPendingReview, setPharmaciesPendingReview, pharmaciesPendingReviewStatic, search, setSearch, error, setError, ordering, setOrdering, handleSearch }



}



export default useReviewActions