


import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Pharmacy } from '../../types';
import { asyncFetchDataFromBackend } from '../../utils/dry';


import styles from "./../../styles/table.module.css";
import useReviewActions from './useReviewActions';

// import search icon

const PendingReviews = () => {


    const [pharmaciesPendingReviewStatic, setPharmaciesPendingReviewStatic] = useState<Pharmacy[] | []>([]);
    const [pharmaciesPendingReview, setPharmaciesPendingReview] = useState<Pharmacy[] | []>([]);
    const [search, setSearch] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


    // Hooks
    const { activatePharmacy, deactivatePharmacy } = useReviewActions();


    useEffect(() => {
        asyncFetchDataFromBackend('http://localhost:8000/admin-api/pharmacies/?pending_review=true')
            .then((data) => {
                setPharmaciesPendingReview(data);
                setPharmaciesPendingReviewStatic(data);
                console.log(data)
            }).catch((error) => {
                setError(error);
            }
            )
    }, [])

    useEffect(() => {
        const results = pharmaciesPendingReviewStatic.filter(pharmacy => pharmacy.name.toLowerCase().includes(search.toLowerCase()));
        setPharmaciesPendingReview(results);
    }, [search])


    return (
        <>

            <VStack gap={2} paddingTop={"15px"} height={"100%"} width={"95%"}>
                <Input placeholder='Search by name' display={"block"} width={"300px"} alignSelf={"flex-start"} marginLeft={"10px"}
                    value={search} onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer style={{ height: "100%", width: "100%" }} overflowY={"scroll"} overflowX={"scroll"} marginTop={"30px"}>
                    <Table variant='simple' >

                        <Thead>
                            <Tr >

                                <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white" }}>Name</Th>
                                <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white", zIndex: 100 }}></Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {pharmaciesPendingReview?.map((pharmacy, idx) => {
                                console.log("pharmacy: ", pharmacy)
                                return (
                                    <Tr key={pharmacy.id} className={styles.tableRow}>
                                        <Td width={"75%"}>{pharmacy.name}</Td>
                                        <Td className={styles.tableDataHidden}>

                                            <HStack gap={2} >
                                                <IconButton aria-label='Search database' icon={<CheckIcon />} onClick={() => activatePharmacy(pharmacy)} />
                                                <IconButton aria-label='Search database' icon={<CloseIcon />} />
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
