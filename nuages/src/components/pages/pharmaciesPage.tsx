

import {
    Table, TableCaption,
    TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';



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

    // get pharmacies data from api
    const getPharmacies = async () => {
        const response = await fetch(`http://localhost:8000/admin-api/pharmacies/`);
        const data = await response.json();
        console.log("data: ", data);
        return data
    }

    useEffect(() => {
        // getPharmacies();
        (async () => {
            const data = await getPharmacies();
            setPharmacies(data);
        }
        )();
    }, [])




    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Active</Th>
                        <Th>Pending review</Th>

                        <Th>Coordinates</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {pharmacies?.map((pharmacy) => {
                        console.log("pharmacy: ", pharmacy)
                        return (
                            <Tr key={pharmacy.id}>
                                <Td>{pharmacy.name}</Td>
                                <Td>{pharmacy.active ? "Yes" : "No"}</Td>
                                <Td>{pharmacy.pending_review ? "Yes" : "No"}</Td>

                                <Td>{`${pharmacy.coordinates.latitude},${pharmacy.coordinates.longitude}`}</Td>
                            </Tr>
                        )
                    })
                    }

                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    );
};

export default PharmaciesPage;