





// import FiRefreshCcw from react-icons

import { Box, HStack, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { palette } from "../colorPalette";
import RefreshButton from "../components/refreshButton";
import SearchBar from "../components/searchBar";
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext";


import { PendingReviewPageTable } from "../components/pendingReviewTable";




const PendingReviewsPage = () => {

    // Hooks
    const { refreshDatas } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    useEffect(() => {
        refreshDatas()
    }, [])



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

    const { refreshDatas, setSearch, handleSearch } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

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
            <SearchBar onChange={handleSearch} />

        </Box>
    )

}



















export default PendingReviewsPage;

















