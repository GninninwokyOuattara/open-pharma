import { Checkbox, HStack, TableCellProps, Td, Text, Tr } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { palette } from "../colorPalette"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"
import { PendingReviewPharmacy } from "../types"
import { ReviewButton } from "./actionButtons"
import { SingleRowSkeletonLoader } from "./rowsLoader"

export const PendingPharmaciesTableRow: React.FC<{ pharmacyPendingReview: PendingReviewPharmacy }> = ({ pharmacyPendingReview }) => {

    const [isLoading, setIsLoading] = useState(false)


    const { acceptPharmacy, rejectPharmacy, checkOnePharmacy, uncheckOnePharmacy } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface



    const handleCheck = () => {
        if (pharmacyPendingReview.is_checked) {
            uncheckOnePharmacy(pharmacyPendingReview)
        } else {
            checkOnePharmacy(pharmacyPendingReview)
        }
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
                    <Checkbox
                        colorScheme={"orange"}
                        isChecked={pharmacyPendingReview.is_checked || false}
                        onChange={handleCheck}
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
                <ReviewButton onClick={() => acceptPharmacy(pharmacyPendingReview)} for={"validate"} />
            </PendingPharmaciesTableData>
            <PendingPharmaciesTableData paddingX={1}>
                <ReviewButton onClick={() => rejectPharmacy(pharmacyPendingReview)} for={"invalidate"} />
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