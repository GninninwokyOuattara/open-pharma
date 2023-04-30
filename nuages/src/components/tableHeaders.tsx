import { Box, Button, Checkbox, HStack, Spinner, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useCallback, useContext, useState } from "react"
import { palette } from "../colorPalette"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"



export const PendingReviewPageTableHeaders = () => {

    const { filteredPendingReviewPharmacies, isLoading, checkAllPharmacies, uncheckAllPharmacies, numberOfCheckedPharmacies, setPharmaciesPendingReview } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    const [isChecked, setIsChecked] = useState(false)

    const toggleAllBoxes = useCallback(() => {
        setIsChecked(currentState => !currentState)
        setPharmaciesPendingReview(currentState => currentState.map(pharmacy => {
            const updatedPhmarcy = { ...pharmacy, is_checked: !isChecked }
            return updatedPhmarcy
        }));
    }, [isChecked, setPharmaciesPendingReview])

    if (isLoading) {
        return <LoadingHeader />
    }

    return (
        <Thead
            backgroundColor={palette.custom.veryLightOrange}
            fontWeight={"bold"}
            position={"sticky"} top={0} zIndex={1}
            // height={"80px"}
            borderBottom={`1.5px solid ${palette.custom.niceOrange}`}

        >

            <Tr>
                {/* <Th colSpan={1}>
                    <Checkbox />
                </Th> */}
                <Th
                    height={"80px"}
                    colSpan={6}>
                    <HStack gap={3}>
                        <Checkbox
                            isChecked={isChecked}
                            colorScheme={"orange"}
                            borderColor={"gray.600"}
                            size={"lg"}
                            onChange={() => {
                                toggleAllBoxes()
                            }}
                        />
                        {
                            numberOfCheckedPharmacies > 0
                                ? <CheckModeHeader numberOfCheckedPharmacies={numberOfCheckedPharmacies} />
                                : <Text
                                    fontSize={"xl"}
                                    color={"gray.600"}
                                >
                                    {filteredPendingReviewPharmacies.length} pharmacies pending review

                                </Text>
                        }


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
            // backgroundColor={palette.colorHuntTheme.lightOrange}
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


const CheckModeHeader: React.FC<{ numberOfCheckedPharmacies: number }> = ({ numberOfCheckedPharmacies }) => {

    const { acceptSelectedPharmacies, rejectSelectedPharmacies } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface



    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            height={"100%"}
            width={"100%"}
            alignItems={"center"}
        >

            <Text
                fontSize={"xl"}
                color={"gray.600"}
            >
                {numberOfCheckedPharmacies} pharmacies selected

            </Text>

            <HStack gap={2}>
                <ReviewSelectedButton title="Accept" onClick={acceptSelectedPharmacies} />
                <ReviewSelectedButton title="Reject" onClick={rejectSelectedPharmacies} />


            </HStack>
        </Box>
    )

}


interface ReviewSelectedButtonProps {
    title: string
    onClick?: () => void
}

const ReviewSelectedButton: React.FC<ReviewSelectedButtonProps> = ({ title, onClick }) => {

    return (
        <Button
            title={title}

            boxShadow={"xs"}
            backgroundColor={"whiteAlpha.100"}
            border={"1px solid"}
            // borderColor={palette.orange.havePersonality}
            _hover={{
                border: "1px solid",
                borderColor: palette.orange.havePersonality,
                color: palette.orange.havePersonality
            }}

            onClick={onClick}
        >
            {title}
        </Button>
    )
}