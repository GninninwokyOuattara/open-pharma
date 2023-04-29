import { Box, Table, TableContainer, Th, Thead, Tr } from "@chakra-ui/react"
import { palette } from "../colorPalette"
import PharmaciesTableBody from "./pharmaciesTableBody"


const PharmaciesTableRenderer = () => {

    return (


        <TableContainer width="full" height="full" >
            <Box height={"full"} width={"full"} overflow={"scroll"} >

                <Table
                    variant='simple'

                >

                    <PharmaciesTableHeaders />
                    <PharmaciesTableBody />



                </Table>
            </Box>

        </TableContainer>

    )
}

export default PharmaciesTableRenderer



const PharmaciesTableHeaders = () => {

    return (
        <Thead
            backgroundColor={palette.custom.veryLightOrange}
            fontWeight={"bold"}
            position={"sticky"} top={0} zIndex={1}
            borderBottom={`1.5px solid ${palette.custom.niceOrange}`}

        >
            <Tr>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Open from</Th>
                <Th>Open until</Th>
                <Th padding={0} ></Th> {/* Activate/Deactivate */}
                <Th padding={1}></Th> {/* Edit */}
                <Th padding={1}></Th> {/* Point on map */}
            </Tr>
        </Thead>
    )
}

