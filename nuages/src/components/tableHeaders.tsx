import { Checkbox, HStack, Spinner, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { palette } from "../colorPalette"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"



export const PendingReviewPageTableHeaders = () => {

    const { filteredPendingReviewPharmacies, isLoading, checkAllPharmacies, uncheckAllPharmacies } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    const [isChecked, setIsChecked] = useState(false)

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
                {/* <Th colSpan={1}>
                    <Checkbox />
                </Th> */}
                <Th colSpan={6}>
                    <HStack gap={3}>
                        <Checkbox
                            isChecked={isChecked}
                            colorScheme={"orange"}
                            borderColor={"gray.600"}
                            size={"lg"}
                            onChange={() => {
                                if (isChecked) {
                                    uncheckAllPharmacies()
                                    setIsChecked(false)
                                } else {
                                    checkAllPharmacies()
                                    setIsChecked(true)
                                }
                            }}
                        />

                        <Text
                            fontSize={"xl"}
                            color={"gray.600"}
                        >
                            {filteredPendingReviewPharmacies.length} pharmacies pending review

                        </Text>
                    </HStack>

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
