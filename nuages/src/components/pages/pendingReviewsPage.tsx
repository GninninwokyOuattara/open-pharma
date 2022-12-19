


import { CheckIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, Icon, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { Pharmacy } from '../../types';
import { getTimeElapsed } from '../../utils/dry';


import animationStyles from "../../styles/animation.module.css";
import styles from "./../../styles/table.module.css";
import useReviewActions from './useReviewActions';

// import FiRefreshCcw from react-icons
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsSortAlphaDown } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";

const PendingReviews = () => {

    // Hooks
    const { activatePharmacy, deactivatePharmacy, pharmaciesPendingReview, pharmaciesPendingReviewStatic, fetchPharmaciesPendingReview, setPharmaciesPendingReview, search, setSearch, orderBy, setOrderBy, changeOrderByTo, isLoading } = useReviewActions();


    useEffect(() => {
        fetchPharmaciesPendingReview()

    }, [])

    const renderer = useCallback(() => {



        if (!pharmaciesPendingReview) {
            return <Text fontSize={"5xl"} color={"gray.700"}>Nothing to review yet.</Text>
        }

        if (pharmaciesPendingReview) {

            const pharmacies = pharmaciesPendingReview.filter((pharmacy) => pharmacy.name.toLowerCase().includes(search.toLowerCase()))


            if (pharmacies.length) {

                return (

                    <TableContainer style={{ height: "100%", width: "100%" }} overflowY={"scroll"} overflowX={"scroll"} marginTop={"30px"}>
                        <Table variant='simple' >

                            <Thead >
                                <Tr >

                                    <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white" }}>Name</Th>
                                    <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white" }}>Date added</Th>
                                    <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white", zIndex: 100 }}></Th>

                                </Tr>
                            </Thead>
                            <Tbody>


                                {pharmacies.map((pharmacy, idx) => {
                                    return PendingRow({ pharmacy, activatePharmacy, deactivatePharmacy })
                                })}

                            </Tbody>
                        </Table>
                    </TableContainer>

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

            <VStack gap={2} paddingTop={"15px"} height={"100%"} width={"95%"}>

                <Text alignSelf={"center"} fontSize='6xl'>{`${pharmaciesPendingReview.length} pending reviews`}</Text>
                <Flex direction={"row"} w="full" gap={3}>


                    <Input placeholder='Search by name' display={"block"} width={"300px"} alignSelf={"flex-start"} marginLeft={"10px"}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Menu>
                        <MenuButton as={Button} leftIcon={<Icon as={orderBy == "Name" ? BsSortAlphaDown : AiOutlineFieldTime} display={"block"} />} rightIcon={<ChevronDownIcon />}>

                            {orderBy}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => changeOrderByTo("Name")} >
                                <Icon as={BsSortAlphaDown} display={"block"} marginRight={2} />
                                Name</MenuItem>
                            <MenuItem onClick={() => changeOrderByTo("Date")}>
                                <Icon as={AiOutlineFieldTime} display={"block"} marginRight={2} />
                                Date</MenuItem>

                        </MenuList>
                    </Menu>
                    <Button colorScheme="orange" onClick={() => fetchPharmaciesPendingReview()}>
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





interface PendingRowProps {
    pharmacy: Pharmacy,
    activatePharmacy: (pharmacy: Pharmacy) => void,
    deactivatePharmacy: (pharmacy: Pharmacy) => void
}

export const PendingRow = ({ pharmacy, activatePharmacy, deactivatePharmacy }: PendingRowProps) => {

    const timeElapsedFromCreationCreation = getTimeElapsed(pharmacy.date_created)

    return (




        <Tr key={pharmacy.id} className={styles.tableRow}>
            <Td width={"100%"}>{pharmacy.name}</Td>

            <Td>{timeElapsedFromCreationCreation}</Td>

            <Td className={styles.tableDataHidden}>

                <HStack gap={2} alignSelf={"flex-end"}>
                    <IconButton aria-label='Activate pharmacy' icon={<CheckIcon />} onClick={() => activatePharmacy(pharmacy)} />
                    <IconButton aria-label='Deactivate pharmacy' icon={<CloseIcon />} onClick={() => deactivatePharmacy(pharmacy)} />
                </HStack>
            </Td>

        </Tr>

    )

}






