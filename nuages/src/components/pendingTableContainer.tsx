import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"


export const PendingTableContainer = ({ children }: { children: React.ReactNode }) => {


    return (
        <TableContainer >
            <Table variant='simple'>

                <Thead >
                    <Tr >

                        <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white" }}>Name</Th>
                        <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white" }}>Date added</Th>
                        <Th style={{ position: "sticky", top: 0, overflow: "hidden", backgroundColor: "white", zIndex: 100 }}></Th>

                    </Tr>
                </Thead>
                <Tbody>


                    {children}

                </Tbody>
            </Table>
        </TableContainer>

    )

}