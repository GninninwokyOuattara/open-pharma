





// import FiRefreshCcw from react-icons

import { Box, HStack, IconButton, Skeleton, Table, TableCellProps, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { palette } from "../colorPalette";
import RefreshButton from "../components/refreshButton";
import SearchBar from "../components/searchBar";
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext";
import { PendingReviewPharmacy } from "../types";


import { TbPlugConnected } from "react-icons/tb";




const PendingReviewsPage = () => {

    // Hooks

    return (
        <VStack
            height={"full"}
            width={"full"}
        >

            <PendingReviewPageHeader />
            <PendingReviewPageTable />

        </VStack>
    )
}




const PendingReviewPageHeader = () => {

    const { refreshDatas } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    return (
        <Box
            height={"100px"}
            width={"100%"}
            borderTop={"1px solid"}
            borderBottom={"1px solid "}
            borderColor={palette.colorHuntTheme.lightGreen}
            display={"flex"}
            alignItems={"center"}
            paddingX={2}
            zIndex={10}
            justifyContent={"space-between"}
        >
            <HStack >

                <RefreshButton isLoading={false} onClick={() => refreshDatas()} />
            </HStack>
            <SearchBar onChange={(setSearch) => console.log("seach")} />

        </Box>
    )

}


const PendingReviewPageTable = () => {

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


const PendingReviewPageTableHeaders = () => {
    return (
        <Thead
            backgroundColor={palette.colorHuntTheme.lightOrange}
            fontWeight={"bold"}
            position={"sticky"} top={0} zIndex={1}

        >
            <Tr>
                <Th>Name</Th>
                {/* <Th>Date Added</Th> */}
                <Th>Time Elapsed</Th>
                <Th padding={0} w={0} ></Th> {/* Validate */}
                <Th padding={1} w={0}></Th> {/* Invalidate */}
                <Th padding={1} w={0}></Th> {/* Link to another */}
            </Tr>
        </Thead>
    )
}

const PendingReviewPageTableBody = () => {

    const { pendingReviewPharmacies, isLoading } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface


    if (isLoading) {
        const firstTenPharmacies = pendingReviewPharmacies.slice(0, 10)

        return <SkeletonLoader firstTenPharmacies={firstTenPharmacies} />
    }

    if (pendingReviewPharmacies.length && !isLoading) {

        return (
            <Tbody>
                {pendingReviewPharmacies.map((pharmacyPendingReview: PendingReviewPharmacy) => {
                    return (
                        <PendingPharmaciesTableRow pharmacyPendingReview={pharmacyPendingReview} />
                    )
                })}

            </Tbody>
        )
    }

    return (
        null
    )
}






const PendingPharmaciesTableRow: React.FC<{ pharmacyPendingReview: PendingReviewPharmacy }> = ({ pharmacyPendingReview }) => {

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

const LoadingRowData: React.FC<TableCellProps> = (props) => {

    return (
        <Td
            {...props}
            borderColor={palette.colorHuntTheme.lightOrange}
        >

            <Skeleton>
                {props.children}
            </Skeleton>

        </Td>
    )
}

interface ReviewButtonProps {
    onClick: () => void
    for: "validate" | "invalidate" | "link"
    // rowIsLoading: boolean
}

const ReviewButton: React.FC<ReviewButtonProps> = (props) => {
    const icon = props.for === "validate" ? <FiCheck /> : props.for === "invalidate" ? <FiX /> : <TbPlugConnected />
    return (
        <IconButton
            aria-label={props.for}
            icon={icon}
            onClick={props.onClick}
            size={"sm"}
            variant={"ghost"}

        />
    )
}


const SkeletonLoader: React.FC<{ firstTenPharmacies: PendingReviewPharmacy[] }> = ({ firstTenPharmacies }) => {

    return (
        <Tbody>
            {firstTenPharmacies.map((p: PendingReviewPharmacy) => {
                return (
                    <Tr>
                        <LoadingRowData >{p.name}</LoadingRowData>
                        <LoadingRowData>{p.time_elapsed}</LoadingRowData>
                        <LoadingRowData padding={0} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData>
                        <LoadingRowData paddingX={1} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData>
                        <LoadingRowData padding={0} paddingRight={2} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData>
                    </Tr>
                )
            })}
        </Tbody>
    )
}

export default PendingReviewsPage;

















