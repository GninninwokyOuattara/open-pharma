import { CheckIcon, CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, CheckboxGroup, Flex, HStack, Icon, IconButton, Input, Menu, MenuButton, MenuList, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useCheckboxGroup, VStack } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineLoading } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { MdOutlineHouseSiding } from "react-icons/md";
import { RiEyeOffLine } from "react-icons/ri";
import usePharmacies from "../hooks/usePharmacies";
import { PharmaciesDataSummary, Pharmacy, PharmacyFullState } from "../types";
import { getTags } from "../utils/dry";

import animationStyles from "../styles/animation.module.css";

import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";






const PharmaciesPage = () => {

    const { refreshDatas, isLoading, summary, pharmacies, error, applyFilters, filteredPharmacies, setSearch, setActiveTags } = usePharmacies()
    console.log(pharmacies)





    return (
        <>
            <VStack height={"100%"} width={"100%"} >

                <RecapContainer summary={summary} isLoading={isLoading} />
                <Box height={10}></Box>
                <PharmaciesTableContainer refreshDatas={refreshDatas} filteredPharmacies={filteredPharmacies} isLoading={isLoading} setSearch={setSearch} setActiveTags={setActiveTags} />

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


const PharmaciesTableContainer = ({ refreshDatas, filteredPharmacies, isLoading, setSearch, setActiveTags }: { refreshDatas: () => void, filteredPharmacies: PharmacyFullState[], isLoading: boolean, setSearch: React.Dispatch<React.SetStateAction<string>>, setActiveTags: React.Dispatch<React.SetStateAction<string[]>> }) => {


    return (
        <TableContainer shadow={"md"} borderRadius={"md"} width="full" height="full" backgroundColor={"white"}>
            <VStack width={"full"} height="full">

                <Box width={"full"} padding={1} top={0} position={"sticky"} height={"50px"} zIndex={100}>
                    <HStack>
                        <Input placeholder='Search by name'
                            width={200}
                            alignSelf={"flex-start"}
                            shadow={"md"}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />

                        <TagsSettingMenu setActiveTags={setActiveTags} />

                        <Button boxShadow={"md"} disabled={isLoading} onClick={() => refreshDatas()}>
                            <Icon className={isLoading ? animationStyles.rotate : ""} as={FiRefreshCcw} display={"block"} marginRight={2} />Refresh</Button>


                    </HStack>

                </Box>
                <Box overflowY={"scroll"} height={"100%"} width="full">

                    <Table variant='simple'>

                        <Thead position={"sticky"} top={0} backgroundColor={"#F8FBFC"} zIndex={1}>
                            <Tr>
                                <Th>Name </Th>
                                <Th>State</Th>
                                <Th>Opening</Th>
                            </Tr>
                        </Thead>

                        <TableContent isLoading={isLoading} filteredPharmacies={filteredPharmacies} />
                    </Table>
                </Box>
            </VStack>

        </TableContainer>
    )
}



const PharmacyActivityToggleButton = ({ pharmacy }: { pharmacy: Pharmacy }) => {

    const [isLoading, setIsLoading] = useState(false)
    const icon = pharmacy.active ? <CloseIcon /> : <CheckIcon />

    const toogleActivity = () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 5000);
    }

    // pharmacy.active ?

    //     <IconButton
    //         colorScheme='gray'
    //         height={"100%"}
    //         aria-label='Deactivate pharmacy'
    //         icon={<CloseIcon />}
    //     />

    //     :

    //     <IconButton
    //         colorScheme='orange'
    //         height={"100%"}
    //         // width={"100%"}
    //         aria-label='Activate pharmacy'
    //         icon={<CheckIcon />}
    //     />

    if (isLoading) {
        return (
            <IconButton
                colorScheme='gray'
                height={"100%"}
                // width={"100%"}
                aria-label="Loading"
                icon={<AiOutlineLoading />}
            />
        )
    }

    return <IconButton
        colorScheme='orange'
        height={"100%"}
        // width={"100%"}
        aria-label={pharmacy.active ? "Deactivate pharmacy" : "Activate pharmacy"}
        icon={icon}
    />



}




const TagsSettingMenu = ({ setActiveTags, ...otherProps }: { setActiveTags: React.Dispatch<React.SetStateAction<string[]>> }) => {

    const { value, getCheckboxProps } = useCheckboxGroup({
        defaultValue: ['Inactive Pharmacies', 'Active Pharmacies', 'Open Pharmacies'],
    })


    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<SettingsIcon />} shadow={"md"}>
                State
            </MenuButton>
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



const TableContent = ({ isLoading, filteredPharmacies }: { isLoading: boolean, filteredPharmacies: PharmacyFullState[] }) => {

    if (isLoading) {
        return <Text>Loading</Text>
    }

    if (!filteredPharmacies.length) {
        return <Text>No pharmacies found</Text>
    }



    return (
        <Tbody >

            {filteredPharmacies.map((pharmacy) => {

                const tags = getTags(pharmacy)

                return (<Tr _hover={{ "backgroundColor": "gray.100" }} role="group" >
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
        {tags.map((tag) => {
            return <StateTag state={tag} />
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




interface dataRecapCardProps {
    data: Number | string,
    header: string,
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