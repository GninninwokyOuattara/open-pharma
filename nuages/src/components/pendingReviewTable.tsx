import { Box, Table, TableContainer, Tbody } from "@chakra-ui/react"
import { useContext } from "react"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"
import { PendingReviewPharmacy } from "../types"
import { PendingPharmaciesTableRow } from "./pendingPharmaciesTableRow"
import { PendingReviewSkeletonLoader } from "./rowsLoader"
import { PendingReviewPageTableHeaders } from "./tableHeaders"

export const PendingReviewPageTable = () => {

    return <Box borderRadius={"md"} overflowY={"hidden"} height={"full"} width={"full"} shadow={"lg"} >
        <TableContainer shadow={"outline"} borderRadius={"md"} width="full" height="full" backgroundColor={"white"}>
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

    const { filteredPendingReviewPharmacies, isLoading } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface


    if (isLoading) {
        const firstTenPharmacies = filteredPendingReviewPharmacies.slice(0, 10)

        return <PendingReviewSkeletonLoader firstTenPharmacies={firstTenPharmacies} />
    }

    if (filteredPendingReviewPharmacies.length && !isLoading) {

        return (
            <Tbody>
                {filteredPendingReviewPharmacies.map((pharmacyPendingReview: PendingReviewPharmacy, idx) => {
                    return (
                        <PendingPharmaciesTableRow
                            key={pharmacyPendingReview.id}
                            pharmacyPendingReview={pharmacyPendingReview} />
                    )
                })}

            </Tbody>
        )
    }

    return (
        null
    )
}



