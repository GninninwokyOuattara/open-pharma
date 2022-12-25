import { Box, Flex, Input, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineHouseSiding } from "react-icons/md";
import { RiEyeOffLine } from "react-icons/ri";
import usePharmacies from "../hooks/usePharmacies";
import { PharmaciesDataSummary, PharmacyFullState } from "../types";
import { getTags } from "../utils/dry";





const PharmaciesPage = () => {

    const { isLoading, summary, pharmacies, error } = usePharmacies()
    console.log(pharmacies)





    return (
        <>
            <VStack height={"100%"} width={"100%"}>

                <RecapContainer summary={summary} isLoading={isLoading} />
                <Box height={10}></Box>
                <PharmaciesTableContainer pharmacies={pharmacies} isLoading={isLoading} />

            </VStack>

        </>
    );
};

export default PharmaciesPage;





const PharmaciesTableContainer = ({ pharmacies, isLoading }: { pharmacies: PharmacyFullState[], isLoading: boolean }) => {


    return (
        <TableContainer shadow={"md"} borderRadius={"md"} width="full" height="full" >
            <VStack width={"full"} height="full">

                <Box width={"full"} backgroundColor={"#F8FBFC"} padding={1} top={0} position={"sticky"} zIndex={100} height={"50px"}>
                    <VStack>
                        <Input placeholder='Search by name'
                            width={200}
                            alignSelf={"flex-start"}
                            shadow={"md"}
                        />


                    </VStack>

                </Box>
                <Box overflowY={"scroll"} height={"100%"} width="full">

                    <Table variant='simple'>

                        <Thead position={"sticky"} top={0} zIndex={100} backgroundColor={"#F8FBFC"}>
                            <Tr>
                                <Th>Name</Th>
                                <Th>State</Th>
                                <Th>Opening</Th>
                            </Tr>
                        </Thead>
                        <Tbody >

                            {!isLoading && pharmacies.length ? pharmacies.map((pharmacy) => {

                                const tags = getTags(pharmacy)

                                return <Tr>
                                    <Td>{pharmacy.name}</Td>
                                    <Td>

                                        <Tags tags={tags} />

                                    </Td>
                                    <Td >{pharmacy.open_date_range?.date_range_string || "-"}</Td>
                                </Tr>
                            }) : 0}

                        </Tbody>
                    </Table>
                </Box>
            </VStack>

        </TableContainer>
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