import { Checkbox, HStack, TableCellProps, Td, Text, Tr } from "@chakra-ui/react"
import React, { useCallback } from "react"
import { PendingReviewPharmacy } from "../types"
import { SingleRowSkeletonLoader } from "./rowsLoader"


interface PendingPharmaciesTableDataProps {

    pharmacyPendingReview: PendingReviewPharmacy,
    acceptPharmacy?: (pharmacy: PendingReviewPharmacy) => void,
    rejectPharmacy?: (pharmacy: PendingReviewPharmacy) => void,
    checkOnePharmacy?: (pharmacy: PendingReviewPharmacy) => void,
    uncheckOnePharmacy?: (pharmacy: PendingReviewPharmacy) => void,
    toggleCheckPendingReviewPharmacy?: (pharmacy: PendingReviewPharmacy) => void
    isChecked?: boolean,
    setPharmaciesPendingReview: React.Dispatch<React.SetStateAction<PendingReviewPharmacy[] | []>>
}

export const PendingPharmaciesTableRow: React.FC<PendingPharmaciesTableDataProps> = ({ pharmacyPendingReview, acceptPharmacy, rejectPharmacy, toggleCheckPendingReviewPharmacy, isChecked, setPharmaciesPendingReview }) => {

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



    console.log(pharmacyPendingReview.name, "has been rendered")
    // const [isLoading, setIsLoading] = useState(false)


    // const { acceptPharmacy, rejectPharmacy, checkOnePharmacy, uncheckOnePharmacy } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface



    const handleCheck = () => {
        // if (pharmacyPendingReview.is_checked) {
        //     uncheckOnePharmacy(pharmacyPendingReview)
        // } else {
        //     checkOnePharmacy(pharmacyPendingReview)
        // }
    }


    if (pharmacyPendingReview.is_loading) {
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
            {/* <PendingPharmaciesTableData padding={0}>
                <ReviewButton onClick={() => acceptPharmacy(pharmacyPendingReview)} for={"validate"} />
            </PendingPharmaciesTableData>
            <PendingPharmaciesTableData paddingX={1}>
                <ReviewButton onClick={() => rejectPharmacy(pharmacyPendingReview)} for={"invalidate"} />
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