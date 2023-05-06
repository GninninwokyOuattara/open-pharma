import { Box, Flex, Icon, IconButton, Skeleton, Spinner, TableCellProps, Tbody, Td, Text, Tr } from "@chakra-ui/react"
import { useCallback, useContext, useState } from "react"
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext"
import { PharmacyFullState } from "../types"
import { getTags } from "../utils/dry"

// import GrEdit

import React from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { BsFillPinMapFill } from "react-icons/bs"
import { GrEdit } from "react-icons/gr"
import { TbMoodEmpty } from "react-icons/tb"
import { LeafletMapContext, LeafletMapContextInterface } from "../contexts/leafletContext"
import { ToastContext, ToastContextInterface } from "../contexts/toast"


const PharmaciesTableBody = () => {

    const { filteredPharmacies, isLoading } = useContext(PharmaciesContext) as PharmaciesContextInterface

    // if there is no pharmacies and loading is false, return a message that spans all columns saying "No pharmacies found"

    if (isLoading) {

        return <SkeletonLoader />
    }


    if (filteredPharmacies.length === 0 && !isLoading) {
        return <Tbody>
            <Tr>
                <Td colSpan={7} rowSpan={5} textAlign={"center"} height={"400px"} border={"none"}>
                    <Text color={"gray.400"} fontSize={"3xl"}>Such Emptyness</Text>
                    <Box height={"10px"} />
                    <Icon as={TbMoodEmpty} boxSize={32} color={"gray.400"} />
                </Td>
            </Tr>
        </Tbody>
    }



    return (

        <Tbody
        >

            {/* {
                filteredPharmacies.map((pharmacy, idx) => {
                    return <PharmaciesTableRowMemoized
                        key={pharmacy.id}
                        pharmacy={pharmacy}
                    />
                })
            } */}
            <PharmaciesTableRowsContainer pharmacies={filteredPharmacies} />

        </Tbody>

    )
}

export default PharmaciesTableBody


const PharmaciesTableRowsContainer: React.FC<{ pharmacies: PharmacyFullState[] }> = React.memo(({ pharmacies }) => {
    console.log("Rerendered container")
    return (
        <>
            {
                pharmacies.map((pharmacy, idx) => {
                    return <PharmaciesTableRowMemoized
                        key={pharmacy.id}
                        pharmacy={pharmacy}
                    />
                })
            }

        </>
    )
})


const PharmaciesTableRow: React.FC<{ pharmacy: PharmacyFullState }> = (
    { pharmacy }
) => {

    // console.log("Rerendered row for ", pharmacy.name)

    const pharmacyDateRange = pharmacy.open_date_range
    const tags = getTags(pharmacy)

    return (
        <Tr
            _hover={{
                backgroundColor: "white",
                // transform: "scale(1.01)",
                // transition: "all 0.2s ease-in-out"
            }}
        >
            <TableData
                // borderRadius={"lg"}
                borderLeftRadius={"lg"}


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
            <TableData
                padding={0} paddingRight={2}
                borderRightRadius={"lg"}
            >

                <PointPharmacyOnMapButton pharmacy={pharmacy} />
            </TableData>

        </Tr>
    )

}


const PharmaciesTableRowMemoized = React.memo(PharmaciesTableRow)

const TableData: React.FC<TableCellProps> = (props) => {

    const { isLoading } = useContext(PharmaciesContext) as PharmaciesContextInterface

    return (
        <Td
            {...props}
            borderColor={"gray.300"}
        // borderRadius={"lg"}
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

    const { setFocus }
        = useContext(LeafletMapContext) as LeafletMapContextInterface

    return (




        <IconButton

            aria-label="Edit"
            icon={<BsFillPinMapFill />}
            size="sm"
            variant="ghost"

            onClick={() => setFocus(pharmacy)}
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


const SkeletonLoader = () => {


    const nLoadingSkeleton = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <>
            {
                nLoadingSkeleton.map((arr) => <Tr
                    _hover={{
                        backgroundColor: "white",

                    }}

                >
                    <Td
                        borderLeftRadius={"lg"}
                        borderColor={"gray.300"}
                        borderBottomWidth={1}
                    >
                        <Skeleton height={"20px"} w={"full"} />
                    </Td>
                    <Td borderColor={"gray.300"}
                        borderBottomWidth={1}>
                        <Skeleton height={"20px"} w={"full"} />
                    </Td>

                    <Td borderColor={"gray.300"}
                        borderBottomWidth={1}> <Skeleton height={"20px"} w={"full"} /> </Td>

                    <Td borderColor={"gray.300"}
                        borderBottomWidth={1}>
                        <Skeleton height={"20px"} w={"full"} />

                    </Td>
                    <Td padding={0} borderColor={"gray.300"}
                        borderBottomWidth={1}>

                        <Skeleton height={"20px"} w={"25px"} />
                    </Td>
                    <Td paddingX={1}
                        borderColor={"gray.300"}
                        borderBottomWidth={1}>


                        <Skeleton height={"20px"} w={"25px"} />
                    </Td>
                    <Td
                        padding={0} paddingRight={2}
                        borderRightRadius={"lg"}
                        borderColor={"gray.300"}
                        borderBottomWidth={1}
                    >

                        <Skeleton height={"20px"} w={"25px"} />
                    </Td>

                </Tr>)
            }

        </>
    )


}