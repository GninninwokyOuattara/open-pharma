





// import FiRefreshCcw from react-icons

import { Box, HStack, VStack } from "@chakra-ui/react";
import { palette } from "../colorPalette";
import RefreshButton from "../components/refreshButton";
import SearchBar from "../components/searchBar";




const PendingReviewsPage = () => {

    // Hooks

    return (
        <VStack>

            <PendingReviewPageHeader />

        </VStack>
    )
}




const PendingReviewPageHeader = () => {

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

                <RefreshButton isLoading={false} onClick={() => console.log("refresh")} />
            </HStack>
            <SearchBar onChange={(setSearch) => console.log("seach")} />

        </Box>
    )

}




export default PendingReviewsPage;

















