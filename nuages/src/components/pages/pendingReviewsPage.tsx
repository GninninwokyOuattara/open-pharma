


import { CheckIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { getTimeElapsed } from '../../utils/dry';


import styles from "./../../styles/table.module.css";
import useReviewActions from './useReviewActions';

// import search icon

const PendingReviews = () => {

    // Hooks
    const { activatePharmacy, deactivatePharmacy, pharmaciesPendingReview, pharmaciesPendingReviewStatic, fetchPharmaciesPendingReview, setPharmaciesPendingReview, search, setSearch, ordering, setOrdering, handleSearch } = useReviewActions();


    useEffect(() => {
        fetchPharmaciesPendingReview()

    }, [])

    // useEffect(() => {
    //     const results = pharmaciesPendingReviewStatic.filter(pharmacy => pharmacy.name.toLowerCase().includes(search.toLowerCase()));
    //     setPharmaciesPendingReview(results);
    // }, [search])


    return (
        <>

            <VStack gap={2} paddingTop={"15px"} height={"100%"} width={"95%"}>

                <Text alignSelf={"flex-start"} fontSize='6xl'>{`${pharmaciesPendingReviewStatic.length} pending reviews`}</Text>
                <HStack w="full">


                    <Input placeholder='Search by name' display={"block"} width={"300px"} alignSelf={"flex-start"} marginLeft={"10px"}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {ordering}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => setOrdering("Name")}>Name</MenuItem>
                            <MenuItem onClick={() => setOrdering("Date")}>Date</MenuItem>

                        </MenuList>
                    </Menu>
                </HStack>
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
                            {pharmaciesPendingReview && pharmaciesPendingReview.filter((pharmacy) => pharmacy.name.toLowerCase().includes(search.toLowerCase())).map((pharmacy, idx) => {
                                console.log("pharmacy: ", pharmacy)
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
                            })
                            }

                        </Tbody>
                    </Table>
                </TableContainer>

            </VStack>

        </>
    );
}


export default PendingReviews;
