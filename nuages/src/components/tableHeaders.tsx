import { Spinner, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useContext } from "react"
import { palette } from "../colorPalette"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"


export const PendingReviewPageTableHeaders = () => {

    const { filteredPendingReviewPharmacies, isLoading } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    if (isLoading) {
        return <LoadingHeader />
    }

    return (
        <Thead
            backgroundColor={palette.colorHuntTheme.lightOrange}
            fontWeight={"bold"}
            position={"sticky"} top={0} zIndex={1}
            height={"70px"}

        >
            <Tr>
                <Th colSpan={7}>
                    <Text
                        fontSize={"xl"}
                        color={"gray.600"}
                    >
                        {filteredPendingReviewPharmacies.length} pharmacies pending review

                    </Text>

                </Th>
            </Tr>
        </Thead>
    )
}


// Component for when header is loading

const LoadingHeader = () => {

    return (
        <Thead
            backgroundColor={palette.colorHuntTheme.lightOrange}
            fontWeight={"bold"}
            position={"sticky"} top={0} zIndex={1}
            height={"70px"}

        >
            <Tr>
                <Th colSpan={7}>
                    <Spinner />

                </Th>
            </Tr>
        </Thead>
    )
}
