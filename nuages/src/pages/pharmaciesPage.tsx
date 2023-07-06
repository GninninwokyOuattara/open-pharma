import { CheckIcon, CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, CheckboxGroup, Flex, HStack, IconButton, Menu, MenuButton, MenuList, Skeleton, Spinner, Text, VStack, useCheckboxGroup } from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineHouseSiding } from "react-icons/md";
import { RiEyeOffLine } from "react-icons/ri";
import { PharmaciesDataSummary, PharmacyFullState } from "../types";


import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { palette } from "../colorPalette";
import EditPharmacyModal from "../components/editPharmacyModal";
import Layout from "../components/layout";
import LeafletMap from "../components/leafletMap";
import PharmaciesTableRenderer from "../components/pharmaciesTableRenderer";
import RefreshButton from "../components/refreshButton";
import SearchBar from "../components/searchBar";
import TagsFilterMenu from "../components/tagsFilterMenu";
import { LeafletMapContextProvider } from "../contexts/leafletContext";
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext";
import { ToastContext, ToastContextInterface } from "../contexts/toast";



const backendUrl = import.meta.env.VITE_APP_DJANGO_API_URL



const PharmaciesPage = () => {

    const {
        isOpen,
        onClose,
        setSearch,
        isLoading,
        refreshDatas,
        pharmacies

    } = useContext(PharmaciesContext) as PharmaciesContextInterface




    useEffect(() => {

        console.log("Fired !")
        refreshDatas()
    }, [])

    return (
        <LeafletMapContextProvider>

            <Page
                pharmacies={pharmacies}
                isLoading={isLoading}
                refreshDatas={refreshDatas}
                setSearch={setSearch}
                isOpen={isOpen}
                onClose={onClose}
            />
        </LeafletMapContextProvider>

    );
};

export default PharmaciesPage;



const Page: React.FC<{
    pharmacies: PharmacyFullState[],
    isLoading: boolean
    refreshDatas: () => void
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    isOpen: boolean,
    onClose: () => void
}> = React.memo(({ pharmacies, isLoading, refreshDatas, setSearch, isOpen, onClose }) => {

    return (
        <Layout>

            <MainContent
                pharmacies={pharmacies}
                isLoading={isLoading}
                refreshDatas={refreshDatas}
                setSearch={setSearch}
            />
            <EditPharmacyModal isOpen={isOpen} onClose={onClose} />

        </Layout>
    )
})



interface MainContentProps {
    pharmacies: PharmacyFullState[],
    isLoading: boolean
    refreshDatas: () => void
    setSearch: React.Dispatch<React.SetStateAction<string>>,
}

const MainContent: React.FC<MainContentProps> = memo(({
    pharmacies,
    isLoading,
    refreshDatas,
    setSearch,
}) => {


    return (
        <VStack
            height={"full"}
            width={"full"}
            gap={1}
        >

            <Box borderRadius={"md"} overflow={"hidden"} height={"200px"} width={"100%"} shadow={"md"}>
                <LeafletMap
                    pharmacies={pharmacies}
                    isLoading={isLoading}
                />
            </Box>

            <Box
                height={"100px"}
                width={"100%"}
                borderTop={"1px solid"}
                // borderBottom={"1px solid "}
                borderColor={palette.custom.niceOrange}
                display={"flex"}
                alignItems={"center"}
                paddingX={2}
                zIndex={10}
                justifyContent={"space-between"}
            >
                <HStack >

                    <RefreshButton isLoading={isLoading} onClick={refreshDatas} />
                    <TagsFilterMenu />
                </HStack>
                <SearchBar onChange={setSearch} />

            </Box>

            <Box
                overflowY={"hidden"}
                height={"full"} width={"full"}
            // borderRadius={"md"} 
            // shadow={"lg"} 
            >
                <PharmaciesTableRenderer />
            </Box>


        </VStack>
    )
})




const PharmacyActionContainer = ({ pharmacy }: { pharmacy: PharmacyFullState }) => {

    const { openEditingPharmacyModal, setPharmacyFocusedOnMap } = useContext(PharmaciesContext) as PharmaciesContextInterface

    return <HStack height={"100%"} visibility={"hidden"} display={"inline-block"} alignSelf={"center"} justifySelf={"center"} _groupHover={{ visibility: "visible" }} >
        <Box display={"flex"} alignItems={"center"}>

            <Button

                variant={"outline"}
                rightIcon={<MdOutlineEdit />}
                marginX={1}
                colorScheme='blue'
                height={"20px"}
                onClick={() => openEditingPharmacyModal(pharmacy)}

            >
                Edit
            </Button>

            <Button

                variant={"outline"}
                rightIcon={<MdOutlineEdit />}
                marginX={1}
                colorScheme='blue'
                height={"20px"}
                onClick={() => setPharmacyFocusedOnMap(pharmacy)}

            >
                On map
            </Button>


            <PharmacyActivityToggleButton pharmacy={pharmacy} />
        </Box>
    </HStack>
}





const PharmacyActivityToggleButton = ({ pharmacy }: { pharmacy: PharmacyFullState }) => {

    const [isLoading, setIsLoading] = useState(false)

    const { toggleActivity } = useContext(PharmaciesContext) as PharmaciesContextInterface
    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface

    const icon = pharmacy.active ? <CloseIcon /> : <CheckIcon />

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

    return <Button

        variant={"outline"}
        // rightIcon={icon}
        marginX={1}
        colorScheme={pharmacy.active ? "red" : "green"}
        height={"20px"}
        onClick={handleToggleActivity}

    >
        {pharmacy.active ? "Deactivate" : "Activate"}
    </Button>


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