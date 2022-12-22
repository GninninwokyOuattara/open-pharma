import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Td, Tr } from "@chakra-ui/react";
import { Pharmacy } from "../types";
import { getTimeElapsed } from "../utils/dry";

import styles from "../styles/table.module.css";



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