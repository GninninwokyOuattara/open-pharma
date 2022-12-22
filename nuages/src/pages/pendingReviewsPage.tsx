


import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';


import useReviewActions from '../hooks/useReviewActions';
import animationStyles from "../styles/animation.module.css";

// import FiRefreshCcw from react-icons
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsSortAlphaDown } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";


import { PendingRow } from '../components/pendingRow';
import { PendingTableContainer } from "../components/pendingTableContainer";
import { SkeletonPendingRow } from "../components/skeletonPendingRow";


const PendingReviews = () => {

    // Hooks
    const { activatePharmacy, deactivatePharmacy, pharmaciesPendingReview, pharmaciesPendingReviewStatic, fetchPharmaciesPendingReview, setPharmaciesPendingReview, search, setSearch, orderBy, setOrderBy, changeOrderByTo, isLoading } = useReviewActions();


    useEffect(() => {
        fetchPharmaciesPendingReview()

    }, [])

    const renderer = useCallback(() => {

        if (isLoading) {

            return (
                <PendingTableContainer>

                    <SkeletonPendingRow />
                    <SkeletonPendingRow />
                    <SkeletonPendingRow />
                    <SkeletonPendingRow />
                    <SkeletonPendingRow />
                    <SkeletonPendingRow />
                    <SkeletonPendingRow />
                    <SkeletonPendingRow />
                    <SkeletonPendingRow />
                    <SkeletonPendingRow />

                </PendingTableContainer>

            )
        }

        if (!pharmaciesPendingReview) {
            return <Text fontSize={"5xl"} color={"gray.700"}>Nothing to review yet.</Text>
        }

        if (pharmaciesPendingReview) {

            const pharmacies = pharmaciesPendingReview.filter((pharmacy) => pharmacy.name.toLowerCase().includes(search.toLowerCase()))


            if (pharmacies.length) {

                return (

                    <PendingTableContainer>






                        {pharmacies.map((pharmacy, idx) => {
                            return PendingRow({ pharmacy, activatePharmacy, deactivatePharmacy })
                        })}

                    </PendingTableContainer>


                )

            } else {
                return (


                    <>
                        <Text fontSize='5xl' color={"gray.500"}>No matching pharmacies found.</Text>
                        <Text fontSize={"4xl"} color={"orange.400"}>Try adjusting your filter.</Text>
                    </>
                )


            }
        }
    }, [search, isLoading, pharmaciesPendingReview])



    return (
        <>

            <VStack gap={2} paddingTop={"15px"} height={"100%"} width={"100%"} className={animationStyles.fadeInFromRight}>

                {/* <Text alignSelf={"center"} fontSize='6xl'>{`${pharmaciesPendingReview.length} pending reviews`}</Text> */}
                <Flex direction={"row"} w="full" gap={3} marginY={7}>


                    <Input disabled={isLoading} placeholder='Search by name' display={"block"} width={"300px"} alignSelf={"flex-start"} marginLeft={"10px"} boxShadow={"2xl"}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Menu >
                        <MenuButton boxShadow={"2xl"} disabled={isLoading} as={Button} leftIcon={<Icon as={orderBy == "Name" ? BsSortAlphaDown : AiOutlineFieldTime} display={"block"} />} rightIcon={<ChevronDownIcon />}>

                            {orderBy}
                        </MenuButton>
                        <MenuList >
                            <MenuItem onClick={() => changeOrderByTo("Name")} >
                                <Icon as={BsSortAlphaDown} display={"block"} marginRight={2} />
                                Name</MenuItem>
                            <MenuItem onClick={() => changeOrderByTo("Date")}>
                                <Icon as={AiOutlineFieldTime} display={"block"} marginRight={2} />
                                Date</MenuItem>

                        </MenuList>
                    </Menu>
                    <Button boxShadow={"2xl"} disabled={isLoading} colorScheme="orange" onClick={() => fetchPharmaciesPendingReview()}>
                        <Icon className={isLoading ? animationStyles.rotate : ""} as={FiRefreshCcw} display={"block"} marginRight={2} />Refresh</Button>
                </Flex>


                {
                    renderer()
                }



            </VStack>

        </>
    );
}


export default PendingReviews;















