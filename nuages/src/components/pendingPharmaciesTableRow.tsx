import { Checkbox, HStack, TableCellProps, Td, Text, Tr } from "@chakra-ui/react"
import React, { useCallback, useContext, useState } from "react"
import { ToastContext, ToastContextInterface } from "../contexts/toast"
import { PendingReviewPharmacy } from "../types"
import { ReviewButton } from "./actionButtons"
import { SingleRowSkeletonLoader } from "./rowsLoader"


const backendUrl = process.env.REACT_APP_DJANGO_API_URL

interface PendingPharmaciesTableDataProps {

    pharmacyPendingReview: PendingReviewPharmacy,
    isChecked?: boolean,
    isLoadingFromBatch?: boolean,
    setPharmaciesPendingReview: React.Dispatch<React.SetStateAction<PendingReviewPharmacy[] | []>>,
    openPendingEditPharmacyModal: (pharmacy: PendingReviewPharmacy) => void
}

export const PendingPharmaciesTableRow: React.FC<PendingPharmaciesTableDataProps> = ({ pharmacyPendingReview, isChecked, isLoadingFromBatch, setPharmaciesPendingReview, openPendingEditPharmacyModal }) => {

    const [isLoading, setIsLoading] = useState(false)

    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface


    const toggleCheckbox = useCallback(() => {
        console.log('toggling for ', pharmacyPendingReview.name, pharmacyPendingReview.is_checked)
        setPharmaciesPendingReview(currentState => currentState.map(pharmacy => {
            if (pharmacy.id === pharmacyPendingReview.id) {
                const updatedPhmarcy = { ...pharmacyPendingReview, is_checked: !!!pharmacyPendingReview.is_checked }
                console.log('updated pharmacy', updatedPhmarcy)
                return updatedPhmarcy
            } return pharmacy
        }));
    }, [pharmacyPendingReview, setPharmaciesPendingReview])


    const reviewPharmacy = useCallback(async (action: "activate" | "deactivate") => {
        setIsLoading(true)
        try {
            const response = await fetch(`${backendUrl}/admin-api/pharmacies-pending-review/${pharmacyPendingReview.id}/${action}/`, {
                method: "POST",
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw data
            }
            setPharmaciesPendingReview(currentState => currentState.filter(pharmacy => pharmacy.id !== pharmacyPendingReview.id))
            successToast("", `${data.message}`)
        } catch (error: any) {
            errorToast("", `${error.message}`)

        }
        setIsLoading(false)

    }, [pharmacyPendingReview, setPharmaciesPendingReview])



    if (isLoading || isLoadingFromBatch) {
        return <SingleRowSkeletonLoader pharmacy={pharmacyPendingReview} />
    }



    return (
        <Tr
            backgroundColor={pharmacyPendingReview.is_checked ? "orange.50" : ""}
            _hover={{
                backgroundColor: "white",
                // transform: "scale(1.01)",
                // transition: "all 0.2s ease-in-out"
            }}>
            <PendingPharmaciesTableData
                borderLeftRadius={"lg"}
            >
                <HStack gap={2} >
                    <Checkbox
                        colorScheme={"orange"}
                        isChecked={isChecked}
                        onChange={() => toggleCheckbox()}
                    />
                    <Text>

                        {pharmacyPendingReview.name}
                    </Text>

                </HStack>
            </PendingPharmaciesTableData>
            {/* <PendingPharmaciesTableData>{pharmacyPendingReview.date_created}</PendingPharmaciesTableData> */}
            <PendingPharmaciesTableData>
                {pharmacyPendingReview.time_elapsed}
            </PendingPharmaciesTableData>

            {/* Button section */}
            <PendingPharmaciesTableData padding={0}>
                <ReviewButton onClick={() => reviewPharmacy("activate")} for={"validate"} />
                <ReviewButton onClick={() => reviewPharmacy('deactivate')} for={"invalidate"} />
                <ReviewButton onClick={() => openPendingEditPharmacyModal(pharmacyPendingReview)} for={"review"} />
                <ReviewButton onClick={() => console.log("link")} for={"link"} />
            </PendingPharmaciesTableData>
            {/* <PendingPharmaciesTableData paddingX={1}>
                <ReviewButton onClick={() => reviewPharmacy('deactivate')} for={"invalidate"} />
            </PendingPharmaciesTableData>
            <PendingPharmaciesTableData
                borderRightRadius={"lg"}
                padding={0} paddingRight={2}>
                <ReviewButton onClick={() => console.log("link")} for={"link"} />
            </PendingPharmaciesTableData> */}

        </Tr>
    )

}

export const PendingPharmaciesTableRowMemo = React.memo(PendingPharmaciesTableRow)


const PendingPharmaciesTableData: React.FC<TableCellProps> = (props) => {



    return (
        <Td
            {...props}
            borderColor={"gray.300"}
        >


            {props.children}

        </Td>
    )
}