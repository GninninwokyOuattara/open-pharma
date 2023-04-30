import { Box, Table, TableContainer, Tbody } from "@chakra-ui/react"
import { useContext } from "react"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"
import { PendingReviewPharmacy } from "../types"
import { PendingPharmaciesTableRowMemo } from "./pendingPharmaciesTableRow"
import { PendingReviewSkeletonLoader } from "./rowsLoader"
import { PendingReviewPageTableHeaders } from "./tableHeaders"

export const PendingReviewPageTable = () => {

    return <Box
        // borderRadius={"md"}
        overflowY={"hidden"}
        height={"full"}
        width={"full"}
    // shadow={"lg"}
    >
        <TableContainer
            shadow={"outline"}
            // borderRadius={"md"} 
            width="full"
            height="full"
        // backgroundColor={"white"}
        >
            <Box height={"full"} width={"full"} overflow={"scroll"} >

                <Table
                    variant='simple'

                >

                    <PendingReviewPageTableHeaders />
                    <PendingReviewPageTableBody />



                </Table>
            </Box>

        </TableContainer>

    </Box>

}



const PendingReviewPageTableBody = () => {

    const { pendingReviewPharmacies, isLoading, acceptPharmacy, rejectPharmacy, checkOnePharmacy, uncheckOnePharmacy, toggleCheckPendingReviewPharmacy, setPharmaciesPendingReview } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface



    if (isLoading) {
        const firstTenPharmacies = pendingReviewPharmacies.slice(0, 10)

        return <PendingReviewSkeletonLoader firstTenPharmacies={firstTenPharmacies} />
    }

    if (pendingReviewPharmacies.length && !isLoading) {

        console.log("Rendering rows")

        return (
            <Tbody>
                {pendingReviewPharmacies.map((pharmacyPendingReview: PendingReviewPharmacy) => {
                    return (
                        <PendingPharmaciesTableRowMemo
                            key={pharmacyPendingReview.id}
                            pharmacyPendingReview={pharmacyPendingReview}
                            isChecked={pharmacyPendingReview.is_checked}
                            setPharmaciesPendingReview={setPharmaciesPendingReview}
                        // acceptPharmacy={acceptPharmacy}
                        // rejectPharmacy={rejectPharmacy}
                        // checkOnePharmacy={checkOnePharmacy}
                        // uncheckOnePharmacy={uncheckOnePharmacy}
                        // toggleCheckPendingReviewPharmacy={toggleCheckPendingReviewPharmacy}
                        />
                    )
                })}

            </Tbody>
        )
    }

    return (
        null
    )
}



