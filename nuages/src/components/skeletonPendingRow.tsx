import styles from "../styles/table.module.css";


import { HStack, Skeleton, Td, Tr } from "@chakra-ui/react";

export const SkeletonPendingRow = () => {

    return (
        <Tr className={styles.tableRow} w={"full"}>

            <Td w={"full"}>
                <Skeleton height={"20px"} w={"full"}>

                    Hello Goat

                </Skeleton>
            </Td>
            <Td>
                <Skeleton height={"20px"} w={"full"} />
            </Td>

            <Td>
                <HStack>

                    <Skeleton height={"20px"} w={"10"} />
                    <Skeleton height={"20px"} w={"10"} />
                </HStack>
            </Td>


        </Tr>

    )
}