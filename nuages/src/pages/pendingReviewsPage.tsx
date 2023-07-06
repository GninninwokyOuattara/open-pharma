





// import FiRefreshCcw from react-icons

import { Box, HStack, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { palette } from "../colorPalette";
import RefreshButton from "../components/refreshButton";
import SearchBar from "../components/searchBar";
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext";


import EditPendingPharmacyModal from "../components/editPendingPharmacyModal";
import Layout from "../components/layout";
import { PendingReviewPageTable } from "../components/pendingReviewTable";
import EditPendingModalContext, { EditPendingModalContextInterface } from "../contexts/EditPendingModalContext";




const PendingReviewsPage = () => {

    // Hooks
    const { refreshDatas } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    useEffect(() => {
        console.log("fired for pending review page")
        refreshDatas()
    }, [])



    return (
        <Layout>

            <VStack
                height={"full"}
                width={"full"}
            >

                <PendingReviewPageHeader />
                <PendingReviewPageTable />

            </VStack>
        </Layout>
    )
}




const PendingReviewPageHeader = () => {

    const { refreshDatas, setSearch, handleSearch } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    const { isOpen, onOpen, onClose } = useContext(EditPendingModalContext) as EditPendingModalContextInterface

    return (
        <Box
            height={"100px"}
            width={"100%"}
            // borderTop={"1px solid"}
            borderBottom={"1px solid "}
            borderColor={palette.custom.niceOrange}
            display={"flex"}
            alignItems={"center"}
            paddingX={2}
            zIndex={10}
            justifyContent={"space-between"}
        >
            <HStack >

                <RefreshButton isLoading={false} onClick={() => refreshDatas()} />
            </HStack>
            <SearchBar onChange={handleSearch} />
            <EditPendingPharmacyModal isOpen={false} onClose={function (): void {
                throw new Error("Function not implemented.");
            }} />

        </Box>
    )

}



















export default PendingReviewsPage;

















