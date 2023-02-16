import { Box, Flex, IconButton, Skeleton, Spinner, TableCellProps, Tbody, Td, Tr } from "@chakra-ui/react"
import { useCallback, useContext, useState } from "react"
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext"
import { PharmacyFullState } from "../types"
import { getTags } from "../utils/dry"

// import GrEdit

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { BsFillPinMapFill } from "react-icons/bs"
import { GrEdit } from "react-icons/gr"
import { palette } from "../colorPalette"
import { ToastContext, ToastContextInterface } from "../contexts/toast"


const PharmaciesTableBody = () => {

    const { filteredPharmacies } = useContext(PharmaciesContext) as PharmaciesContextInterface



    return (

        <Tbody
        >

            {
                filteredPharmacies.map((pharmacy) => {
                    return <PharmaciesTableRow pharmacy={pharmacy} />
                })
            }

        </Tbody>

    )
}

export default PharmaciesTableBody


const PharmaciesTableRow: React.FC<{ pharmacy: PharmacyFullState }> = (
    { pharmacy }
) => {

    const pharmacyDateRange = pharmacy.open_date_range
    const tags = getTags(pharmacy)

    return (
        <Tr
            _hover={{
                backgroundColor: "orange.50",
                transform: "scale(1.01)",
                transition: "all 0.2s ease-in-out"
            }}
        >
            <TableData
            >

                {pharmacy.name}

            </TableData>
            <TableData >
                <Tags tags={tags} />
            </TableData>
            <TableData textAlign={"center"}>{pharmacyDateRange ? pharmacyDateRange.open_from : "-"}</TableData>
            <TableData textAlign={"center"}>{pharmacyDateRange ? pharmacyDateRange.open_until : "-"}</TableData>
            <TableData padding={0} >

                <ToggleActibityButton pharmacy={pharmacy} />
            </TableData>
            <TableData paddingX={1} >


                <EditButton pharmacy={pharmacy} />

            </TableData>
            <TableData padding={0} paddingRight={2}>

                <PointPharmacyOnMapButton pharmacy={pharmacy} />
            </TableData>

        </Tr>
    )

}


const TableData: React.FC<TableCellProps> = (props) => {

    const { isLoading } = useContext(PharmaciesContext) as PharmaciesContextInterface

    return (
        <Td
            {...props}
            borderColor={palette.colorHuntTheme.lightOrange}
        >
            <Skeleton isLoaded={!isLoading}>

                {props.children}
            </Skeleton>
        </Td>
    )
}

const Tags = ({ tags }: { tags: string[] }) => {

    return <Flex direction={"row"} gap={2}>
        {tags.map((tag, idx) => {
            return <StateTag key={idx} state={tag} />
        })}
    </Flex>
}

const StateTag = ({ state, }: { state?: string }) => {
    state = state || "Unknown"
    let backgroundColor = null
    let color = null

    switch (state) {
        case "Active":
            backgroundColor = "#E8F3FF"
            color = "#2B7DBF"
            break;
        case "Inactive":
            backgroundColor = "#F2FBFF"
            color = "#ACBCD3"
            break;
        case "Open":
            backgroundColor = "#E7FCFE"
            color = "#18978C"
            break;
        default:
            backgroundColor = "#F2FBFF"
            color = "#ACBCD3"
            break;
    }


    return <Box display={"inline-block"} paddingX={3} borderRadius={"lg"} backgroundColor={backgroundColor} color={color}>{state}</Box>

}


const EditButton: React.FC<{ pharmacy: PharmacyFullState }> = ({ pharmacy }) => {
    // An icon button with the edit icon

    // from pharmacyContext import openEditingPharmacyModal

    const { openEditingPharmacyModal } = useContext(PharmaciesContext) as PharmaciesContextInterface


    return <IconButton

        aria-label="Edit"
        icon={<GrEdit />}
        size="sm"
        variant="ghost"

        onClick={() => openEditingPharmacyModal(pharmacy)}
    />

}


const PointPharmacyOnMapButton: React.FC<{ pharmacy: PharmacyFullState }> = ({ pharmacy }) => {

    const { setPharmacyFocusedOnMap }
        = useContext(PharmaciesContext) as PharmaciesContextInterface


    return (




        <IconButton

            aria-label="Edit"
            icon={<BsFillPinMapFill />}
            size="sm"
            variant="ghost"

            onClick={() => setPharmacyFocusedOnMap(pharmacy)}
        />
    )

}

const ToggleActibityButton: React.FC<{ pharmacy: PharmacyFullState }> = ({ pharmacy }) => {


    const [isLoading, setIsLoading] = useState(false)

    const { toggleActivity } = useContext(PharmaciesContext) as PharmaciesContextInterface
    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface

    const icon = pharmacy.active ? <AiFillEye /> : <AiFillEyeInvisible />
    const color = pharmacy.active ? "green.300" : "red.400"


    const handleToggleActivity = useCallback(async () => {
        setIsLoading(true)

        try {

            pharmacy = await toggleActivity(pharmacy)
            successToast(
                "Success",
                `Pharmacy ${pharmacy.name} is now ${pharmacy.active ? "active" : "inactive"}`
            )
        } catch (error) {
            errorToast(
                "Error",
                `An error occured while trying to ${pharmacy.active ? "deactivate" : "activate"} pharmacy ${pharmacy.name}`
            )

        }

        setIsLoading(false)
    }, [pharmacy])



    if (isLoading) {
        return (
            <IconButton
                disabled={true}
                aria-label="Toggle Activity"
                size="sm"
                variant="ghost"
                icon={<Spinner />}

            />


        )
    }



    return <IconButton

        aria-label="Toggle Activity"
        icon={icon}
        size="sm"
        variant="ghost"
        color={color}

        onClick={() => handleToggleActivity()}
    />
}