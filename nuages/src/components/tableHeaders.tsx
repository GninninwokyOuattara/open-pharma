import { Box, Button, Checkbox, HStack, Spinner, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useCallback, useContext, useMemo, useState } from "react"
import { palette } from "../colorPalette"
import { PharmaciesReviewContext, PharmaciesReviewContextInterface } from "../contexts/pharmaciesReviewContext"
import { ToastContext, ToastContextInterface } from "../contexts/toast"



export const PendingReviewPageTableHeaders = () => {

    const { filteredPendingReviewPharmacies, isLoading, checkAllPharmacies, uncheckAllPharmacies, numberOfCheckedPharmacies, setPharmaciesPendingReview } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    const [isChecked, setIsChecked] = useState(false)
    const numberOfPharmaciesSelected = useMemo(() => {
        let numberPharmaciesChecked = filteredPendingReviewPharmacies.reduce((acc, pharmacy) => {
            if (pharmacy.is_checked) {
                return acc + 1
            }
            return acc
        }, 0)

        return numberPharmaciesChecked
    }, [filteredPendingReviewPharmacies])

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
                            numberOfPharmaciesSelected
                                ? <CheckModeHeader numberOfPharmaciesSelected={numberOfPharmaciesSelected} />
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


const CheckModeHeader: React.FC<{ numberOfPharmaciesSelected: number }> = ({ numberOfPharmaciesSelected }) => {

    const { acceptSelectedPharmacies, rejectSelectedPharmacies, pendingReviewPharmacies, setPharmaciesPendingReview } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface
    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface


    const batchReview = useCallback(async (review: string) => {
        const selectedPharmacies = pendingReviewPharmacies.filter(pharmacy => pharmacy.is_checked)
        const selectedPharmaciesIds = selectedPharmacies.map(pharmacy => pharmacy.id)

        const obj = {
            review,
            pharmacies: selectedPharmacies
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_DJANGO_API_URL}/admin-api/pharmacies-pending-review/batch-review/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            if (response.status !== 200) {
                throw data
            }

            setPharmaciesPendingReview(currentState => currentState.filter(pharmacy => !selectedPharmaciesIds.includes(pharmacy.id)))
            successToast("", `${data.message}`)

        } catch (error: any) {
            console.log(error)
            errorToast("", `${error.message}`)

        }
    }, [setPharmaciesPendingReview, pendingReviewPharmacies, successToast, errorToast])


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
                {numberOfPharmaciesSelected} pharmacies selected

            </Text>

            <HStack gap={2}>
                <ReviewSelectedButton title="Accept" onClick={() => batchReview("activate")} />
                <ReviewSelectedButton title="Reject" onClick={() => batchReview("deactivate")} />


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