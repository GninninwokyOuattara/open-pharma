

import {
    Table, TableContainer, Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

// import Pagination from chakra ui

// import pagination module css





interface Pharmacy {
    id: number;
    name: string;
    active: boolean;
    pending_review: boolean;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

const PharmaciesPage = () => {

    // get the environment variable REACT_APP_DJANGO_API_URL
    const REACT_APP_DJANGO_API_URL = process.env.REACT_APP_DJANGO_API_URL;
    console.log("REACT_APP_DJANGO_API_URL: ", REACT_APP_DJANGO_API_URL);

    const [pharmacies, setPharmacies] = useState<Pharmacy[] | null>(null);

    // useref for pagination
    const pageNumberRef = useRef(1);


    // get pharmacies data from api
    const getPharmacies = async () => {
        const response = await fetch(`http://localhost:8000/admin-api/pharmacies/`);
        const data = await response.json();
        console.log("data: ", data);
        return data
    }



    useEffect(() => {
        getPharmacies().then((data) => {
            setPharmacies(data);
        })
    }, [])




    return (
        <>
            <TableContainer style={{ height: "100%" }} overflowY={"scroll"} overflowX={"scroll"}>
                <Table variant='simple' >

                    <Thead>
                        <Tr>
                            <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white" }}>#</Th>
                            <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white" }}>Name</Th>
                            <Th style={{ position: "sticky", top: 0, backgroundColor: "white" }}>Active</Th>
                            <Th style={{ position: "sticky", top: 0, backgroundColor: "white" }}>Pending review</Th>

                            <Th style={{ position: "sticky", top: 0, backgroundColor: "white" }}>Coordinates</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {pharmacies?.map((pharmacy, idx) => {
                            console.log("pharmacy: ", pharmacy)
                            return (
                                <Tr key={pharmacy.id}>
                                    <Td>{idx + 1}</Td>
                                    <Td>{pharmacy.name}</Td>
                                    <Td>{pharmacy.active ? "Yes" : "No"}</Td>
                                    <Td>{pharmacy.pending_review ? "Yes" : "No"}</Td>

                                    <Td>{`${pharmacy.coordinates.latitude},${pharmacy.coordinates.longitude}`}</Td>
                                </Tr>
                            )
                        })
                        }

                    </Tbody>
                </Table>
            </TableContainer>




        </>
    );
};

export default PharmaciesPage;