import { CheckIcon, CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, CheckboxGroup, Flex, HStack, Icon, IconButton, Input, Menu, MenuButton, MenuList, Skeleton, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useCheckboxGroup, VStack } from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { MdOutlineHouseSiding } from "react-icons/md";
import { RiEyeOffLine } from "react-icons/ri";
import { PharmaciesDataSummary, Pharmacy, PharmacyFullState } from "../types";
import { getTags } from "../utils/dry";

import animationStyles from "../styles/animation.module.css";

import { useCallback, useContext, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext";



const backendUrl = process.env.REACT_APP_DJANGO_API_URL



const PharmaciesPage = () => {

    // const { refreshDatas, isLoading, summary, pharmacies, error, applyFilters, filteredPharmacies, setSearch, setActiveTags } = usePharmacies()
    // console.log(pharmacies)

    const {
        refreshDatas,
        isLoading,
        summary,

    } = useContext(PharmaciesContext) as PharmaciesContextInterface





    return (
        <>
            <VStack height={"full"} width={"full"} >

                <RecapContainer summary={summary} isLoading={isLoading} />
                <Box height={10}></Box>
                <PharmaciesTableContainer />

            </VStack>

        </>
    );
};

export default PharmaciesPage;




const PharmacyActionContainer = ({ pharmacy }: { pharmacy: PharmacyFullState }) => {
    return <HStack height={5} visibility={"hidden"} display={"inline-block"} alignSelf={"center"} justifySelf={"center"} _groupHover={{ visibility: "visible" }}>
        <IconButton
            // display={"block"}
            height={"100%"}
            // width={"100%"}
            colorScheme='blue'
            aria-label='Search database'
            icon={<MdOutlineEdit />}
        />
        {/* <IconButton
            colorScheme='orange'
            height={"100%"}
            // width={"100%"}
            aria-label='Search database'
            icon={<SearchIcon />}
        /> */}
        <PharmacyActivityToggleButton pharmacy={pharmacy} />
    </HStack>
}


const PharmaciesTableContainer = () => {



    // get the necessary context values
    const { refreshDatas, isLoading, summary, setSearch, setActiveTags } = useContext(PharmaciesContext) as PharmaciesContextInterface


    return (
        <TableContainer shadow={"md"} borderRadius={"md"} width="full" height="full" backgroundColor={"white"}>
            <VStack width={"full"} maxW={"full"} height="full">

                <Box width={"full"} padding={1} height={"50px"} zIndex={10} >
                    <HStack w={"full"} h={"full"}>
                        <Input placeholder='Search by name'
                            width={300}
                            alignSelf={"flex-start"}
                            shadow={"md"}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />

                        <TagsSettingMenu setActiveTags={setActiveTags} />

                        <Box>

                            <Button boxShadow={"md"} disabled={isLoading} onClick={() => refreshDatas()}>
                                <Icon className={isLoading ? animationStyles.rotate : ""} as={FiRefreshCcw} display={"block"} marginRight={2} />Refresh</Button>
                        </Box>



                        <DatasRecapLightContainer summary={summary} isLoading={isLoading} />

                    </HStack>

                </Box>
                <Box overflowY={"scroll"} height={"100%"} width="full">

                    <Table variant='simple'>

                        <Thead position={"sticky"} top={0} backgroundColor={"white"} zIndex={1}>
                            <Tr>
                                <Th>Name</Th>
                                <Th>State</Th>
                                <Th>Opening</Th>
                            </Tr>
                        </Thead>

                        <TableContent />
                    </Table>
                </Box>
            </VStack>

        </TableContainer>
    )
}




const PharmacyActivityToggleButton = ({ pharmacy }: { pharmacy: Pharmacy }) => {

    const [isLoading, setIsLoading] = useState(false)

    const { toggleActivity } = useContext(PharmaciesContext) as PharmaciesContextInterface

    const icon = pharmacy.active ? <CloseIcon /> : <CheckIcon />

    // const toggleActivity = useCallback(async () => {
    //     console.log("Toggle activity to", !pharmacy.active)
    //     setIsLoading(true)

    //     try {
    //         const response = await fetch(`${backendUrl}/admin-api/pharmacies/${pharmacy.id}/${pharmacy.active ? "deactivate" : "activate"}/`, {
    //             method: "POST"
    //         })

    //         const res = await response.json()
    //         console.log(res)


    //     } catch (error) {
    //         console.log(error)
    //     }

    //     setIsLoading(false)

    // }, [pharmacy])

    const handleToggleActivity = useCallback(async () => {
        setIsLoading(true)

        pharmacy = await toggleActivity(pharmacy)

        setIsLoading(false)
    }, [pharmacy])

    if (isLoading) {
        return (
            <IconButton
                disabled={true}
                colorScheme='gray'
                height={"100%"}
                // width={"100%"}
                aria-label="Loading"
                icon={<Spinner />}
                visibility={"visible"}
                backgroundColor={"white"}
            />
        )
    }

    return <IconButton
        colorScheme='orange'
        height={"100%"}
        // width={"100%"}
        aria-label={pharmacy.active ? "Deactivate pharmacy" : "Activate pharmacy"}
        icon={icon}
        onClick={handleToggleActivity}
    />



}




const TagsSettingMenu = ({ setActiveTags, ...otherProps }: { setActiveTags: React.Dispatch<React.SetStateAction<string[]>> }) => {

    const { value, getCheckboxProps } = useCheckboxGroup({
        defaultValue: ['Inactive Pharmacies', 'Active Pharmacies', 'Open Pharmacies'],
    })


    return (
        <Menu>
            <Box>
                <MenuButton as={Button} rightIcon={<SettingsIcon />} shadow={"md"} >
                    Filter
                </MenuButton>

            </Box>
            <MenuList >

                <Flex direction={"column"} width={"full"} gap={2} paddingX={5}>
                    <CheckboxGroup defaultValue={["Inactive", "Active", "Open"]}
                        onChange={(activeTags: string[]) => setActiveTags(activeTags)}>

                        <Checkbox value={"Inactive"} alignSelf={"flex-start"} colorScheme='green' >
                            Inactive Pharmacies
                        </Checkbox>
                        <Checkbox value={"Active"} alignSelf={"flex-start"} colorScheme='green' >
                            Active Pharmacies
                        </Checkbox>
                        <Checkbox value={"Open"} alignSelf={"flex-start"} colorScheme='green' >
                            Open Pharmacies
                        </Checkbox>
                    </CheckboxGroup>

                </Flex>
            </MenuList>
        </Menu>
    )
}



const TableContent = () => {

    // get isLoading and filteredPharmacies from context


    const { isLoading, filteredPharmacies } = useContext(PharmaciesContext) as PharmaciesContextInterface




    if (isLoading) {
        return <Text>Loading</Text>
    }

    if (!filteredPharmacies.length) {
        return <Text>No pharmacies found</Text>
    }



    return (
        <Tbody >

            {filteredPharmacies.map((pharmacy, idx) => {

                const tags = getTags(pharmacy)

                return (<Tr key={idx} _hover={{ "backgroundColor": "gray.100" }} role="group" >
                    <Td width={"100%"}>
                        <HStack
                            justifyContent={"space-between"}>

                            <Box display={"inline-block"}>
                                {pharmacy.name}

                            </Box>


                            <PharmacyActionContainer pharmacy={pharmacy} />
                        </HStack>

                    </Td>
                    <Td>

                        <Tags tags={tags} />

                    </Td>
                    <Td >{pharmacy.open_date_range?.date_range_string || "-"}</Td>
                </Tr>)
            })
            }


        </Tbody>
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


    return <Box display={"inline-block"} padding={2} borderRadius={"lg"} backgroundColor={backgroundColor} color={color}>{state}</Box>

}



const RecapContainer = ({ summary, isLoading }: { summary?: PharmaciesDataSummary, isLoading: boolean }) => {

    return <Flex direction={"row"} gap={2} marginTop={5}>
        <DataRecapCard data={summary?.inactive_Pharmacies_count || 0} icon={<RiEyeOffLine size={"40px"} color={"#ACBCD3"} />} iconBg={"#F2FBFF"} header={"Inactive Pharmacies"} isLoading={isLoading} />
        <DataRecapCard data={summary?.active_pharmacies_count || 0} icon={<AiOutlineEye size={"40px"} color={"#2B7DBF"} />} iconBg={"#E8F3FF"} header={"Active Pharmacies"} isLoading={isLoading} />
        <DataRecapCard data={summary?.open_pharmacies_count || 0} icon={<MdOutlineHouseSiding size={"40px"} color={"#18978C"} />} iconBg={"#E7FCFE"} header={"Open Pharmacies"} isLoading={isLoading} />


    </Flex>

}


const DatasRecapLightContainer = ({ summary, isLoading }: { summary?: PharmaciesDataSummary, isLoading: boolean }) => {




    return (
        <Box h={"full"} w={"full"} display={"flex"} alignItems={"center"} justifyContent={"flex-end"} gap={2} paddingRight={5}>
            <DataRecapCardLight data={summary?.inactive_Pharmacies_count || 0} isLoading={isLoading} icon={<RiEyeOffLine size={"35px"} color={"#ACBCD3"} />} iconBg={"#F2FBFF"} header={"Inactives"} />
            <DataRecapCardLight data={summary?.active_pharmacies_count || 0} isLoading={isLoading} icon={<AiOutlineEye size={"35px"} color={"#2B7DBF"} />} iconBg={"#E8F3FF"} header={"Actives"} />
            <DataRecapCardLight data={summary?.open_pharmacies_count || 0} isLoading={isLoading} icon={<MdOutlineHouseSiding size={"35px"} color={"#18978C"} />} iconBg={"#E7FCFE"} header={"Opens"} />

        </Box>
    )
}


const DataRecapCardLight = ({ data, icon, iconBg, isLoading, header }: dataRecapCardProps) => {


    if (isLoading) {
        return <Skeleton height="full" width={28} borderRadius="md" />
    }


    iconBg = iconBg || "#E8F3FF"

    return (
        <Box height="full" boxShadow='xs' borderRadius={"md"}
            css={{
                boxShadow: 'md',
                transition: 'all 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                }
            }}
        >
            <HStack padding={1} alignItems={"center"}>
                <Box backgroundColor={iconBg} borderRadius={"md"}>

                    {icon}
                </Box>
                <Box fontWeight={"bold"}>
                    {`${data || 0} ${header}`}
                </Box>
            </HStack>
        </Box>
    )
}




interface dataRecapCardProps {
    data: Number | string,
    header?: string,
    icon: JSX.Element,
    iconBg?: string,
    width?: string
    height?: string,
    isLoading: boolean
}


const DataRecapCard = ({ data, icon, iconBg, header, width, height, isLoading }: dataRecapCardProps) => {

    width = width || "300px"
    height = height || "100px"
    iconBg = iconBg || "#E8F3FF"


    if (isLoading) {
        return <Skeleton width={width} height={height} borderRadius={"md"}>

        </Skeleton>
    }

    return (
        <Box width={width || "300px"} height={height || "100px"} bg={"white"} shadow={"md"} borderRadius={"md"} padding={5} css={{
            boxShadow: 'md',
            transition: 'all 0.2s',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
            }
        }}>
            <Flex direction={"row"} gap={2} height="full" width="full">
                <Box backgroundColor={iconBg} height={"100%"} width={"30%"} borderRadius={"md"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    {icon}
                </Box>
                <Box width="100%" height={"100%"}>
                    <VStack height={"100%"} overflow={"hidden"}>
                        <Text color={"gray.600"} alignSelf={"flex-start"} margin={0}>{header || "???"}</Text>
                        <Text fontSize={"3xl"} fontWeight={"bold"} alignSelf={"flex-start"} style={{ marginTop: 0 }}>{`${data || 0}`}</Text>
                    </VStack>
                </Box>
            </Flex>

        </Box>
    )
}