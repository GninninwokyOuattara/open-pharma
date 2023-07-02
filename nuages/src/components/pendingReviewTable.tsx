import { Box, Table, TableContainer, Tbody } from "@chakra-ui/react"
import { memo, useContext } from "react"
import EditPendingModalContext, { EditPendingModalContextInterface } from "../contexts/EditPendingModalContext"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"
import { PendingReviewPharmacy } from "../types"
import { PendingPharmaciesTableRowMemo } from "./pendingPharmaciesTableRow"
import { PendingReviewSkeletonLoader } from "./rowsLoader"
import { PendingReviewPageTableHeaders } from "./tableHeaders"

export const PendingReviewPageTable = () => {

    const { pendingReviewPharmacies, isLoading, setPharmaciesPendingReview } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface


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
                    <PendingReviewPageTableBody
                        pendingReviewPharmacies={pendingReviewPharmacies}
                        isLoading={isLoading}
                        setPharmaciesPendingReview={setPharmaciesPendingReview}
                    />



                </Table>
            </Box>

        </TableContainer>

    </Box>

}



interface PendingReviewPageTableBodyProps {
    pendingReviewPharmacies: PendingReviewPharmacy[]
    isLoading: boolean,
    setPharmaciesPendingReview: React.Dispatch<React.SetStateAction<PendingReviewPharmacy[] | []>>
}

const PendingReviewPageTableBody: React.FC<PendingReviewPageTableBodyProps> = memo(({ pendingReviewPharmacies, isLoading, setPharmaciesPendingReview }) => {

    // const { pendingReviewPharmacies, isLoading, acceptPharmacy, rejectPharmacy, checkOnePharmacy, uncheckOnePharmacy, toggleCheckPendingReviewPharmacy, setPharmaciesPendingReview } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    const { openPendingEditPharmacyModal } = useContext(EditPendingModalContext) as EditPendingModalContextInterface



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
                            isLoadingFromBatch={pharmacyPendingReview.is_loading}
                            setPharmaciesPendingReview={setPharmaciesPendingReview}
                            openPendingEditPharmacyModal={openPendingEditPharmacyModal}
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
})



