import { TableCellProps, Td, Tr } from "@chakra-ui/react"
import { palette } from "../colorPalette"
import { PendingReviewPharmacy } from "../types"
import { ReviewButton } from "./actionButtons"

export const PendingPharmaciesTableRow: React.FC<{ pharmacyPendingReview: PendingReviewPharmacy }> = ({ pharmacyPendingReview }) => {

    return (
        <Tr
            _hover={{
                backgroundColor: "orange.50",
                transform: "scale(1.01)",
                transition: "all 0.2s ease-in-out"
            }}>
            <PendingPharmaciesTableData>
                {pharmacyPendingReview.name}
            </PendingPharmaciesTableData>
            {/* <PendingPharmaciesTableData>{pharmacyPendingReview.date_created}</PendingPharmaciesTableData> */}
            <PendingPharmaciesTableData>
                {pharmacyPendingReview.time_elapsed}
            </PendingPharmaciesTableData>

            {/* Button section */}
            <PendingPharmaciesTableData padding={0}>
                <ReviewButton onClick={() => console.log("validate")} for={"validate"} />
            </PendingPharmaciesTableData>
            <PendingPharmaciesTableData paddingX={1}>
                <ReviewButton onClick={() => console.log("invalidate")} for={"invalidate"} />
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