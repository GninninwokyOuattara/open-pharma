import { Checkbox, HStack, TableCellProps, Td, Text, Tr } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { palette } from "../colorPalette"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"
import { ToastContext, ToastContextInterface } from "../contexts/toast"
import { PendingReviewPharmacy } from "../types"
import { ReviewButton } from "./actionButtons"
import { SingleRowSkeletonLoader } from "./rowsLoader"

export const PendingPharmaciesTableRow: React.FC<{ pharmacyPendingReview: PendingReviewPharmacy }> = ({ pharmacyPendingReview }) => {

    const [isLoading, setIsLoading] = useState(false)
    // const [isChecked, setIsChecked] = useState(false)

    const { acceptPharmacy, rejectPharmacy } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    // import toast from context 
    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface

    const { addPharmacyRowToCheckedList, removePharmacyRowFromCheckedList } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    const handleCheckboxChange = () => {
        console.log('handleCheckboxChange', pharmacyPendingReview)
        if (!pharmacyPendingReview.is_checked) {
            pharmacyPendingReview.is_checked = true

        } else {
            pharmacyPendingReview.is_checked = false

        }

    }

    const accept = async (pharmacy: PendingReviewPharmacy) => {
        setIsLoading(true)
        try {
            await acceptPharmacy(pharmacyPendingReview)
            successToast("", `${pharmacyPendingReview.name} is now active`)
        } catch (error) {
            errorToast("Review Failed", "An error occurred while validating the pharmacy")
        }
        setIsLoading(false)
    }

    const reject = async (pharmacy: PendingReviewPharmacy) => {
        setIsLoading(true)
        try {
            await rejectPharmacy(pharmacyPendingReview)
            successToast("", `${pharmacyPendingReview.name} is has been rejected. It will appear as inactive.`)
        } catch (error) {
            errorToast("Review Failed", "An error occurred while rejecting the pharmacy")
        }
        setIsLoading(false)
    }


    if (pharmacyPendingReview.is_loading) {
        return <SingleRowSkeletonLoader pharmacy={pharmacyPendingReview} />
    }



    return (
        <Tr
            backgroundColor={pharmacyPendingReview.is_checked ? "orange.50" : "white"}
            _hover={{
                backgroundColor: "orange.50",
                transform: "scale(1.01)",
                transition: "all 0.2s ease-in-out"
            }}>
            <PendingPharmaciesTableData>
                <HStack gap={2} >
                    <Checkbox colorScheme={"orange"}
                        onChange={() => handleCheckboxChange()}
                        isChecked={pharmacyPendingReview.is_checked} />
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
                <ReviewButton onClick={() => accept(pharmacyPendingReview)} for={"validate"} />
            </PendingPharmaciesTableData>
            <PendingPharmaciesTableData paddingX={1}>
                <ReviewButton onClick={() => reject(pharmacyPendingReview)} for={"invalidate"} />
            </PendingPharmaciesTableData>
            <PendingPharmaciesTableData padding={0} paddingRight={2}>
                <ReviewButton onClick={() => console.log("link")} for={"link"} />
            </PendingPharmaciesTableData>

        </Tr>
    )

}


const PendingPharmaciesTableData: React.FC<TableCellProps> = (props) => {



    return (
        <Td
            {...props}
            borderColor={palette.colorHuntTheme.lightOrange}
        >


            {props.children}

        </Td>
    )
}