import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Pharmacy } from "../../types";


const backendUrl = process.env.REACT_APP_DJANGO_API_URL

const useReviewActions = () => {

    const [pharmaciesPendingReviewStatic, setPharmaciesPendingReviewStatic] = useState<Pharmacy[] | []>([]);
    const [pharmaciesPendingReview, setPharmaciesPendingReview] = useState<Pharmacy[] | []>([]);
    const [orderBy, setOrderBy] = useState<"Name" | "Date">("Name");
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const toast = useToast();

    const fetchPharmaciesPendingReview = async () => {
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



    return { activatePharmacy, deactivatePharmacy, fetchPharmaciesPendingReview, pharmaciesPendingReview, setPharmaciesPendingReview, pharmaciesPendingReviewStatic, search, setSearch, error, setError, orderBy, setOrderBy, changeOrderByTo, isLoading }



}



export default useReviewActions