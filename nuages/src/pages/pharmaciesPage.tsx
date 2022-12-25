import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { AiOutlineFieldTime } from "react-icons/ai";





const PharmaciesPage = () => {

    // get the environment variable REACT_APP_DJANGO_API_URL
    const REACT_APP_DJANGO_API_URL = process.env.REACT_APP_DJANGO_API_URL;
    console.log("REACT_APP_DJANGO_API_URL: ", REACT_APP_DJANGO_API_URL);







    return (
        <>
            <DataRecapCard data={100} icon={<AiOutlineFieldTime size={"40px"} color={"#2B7DBF"} />} iconBg={"#E8F3FF"} header={"Pending Reviews"} width={"300px"} height={"100px"} />


        </>
    );
};

export default PharmaciesPage;



interface dataRecapCardProps {
    data: Number | string,
    header: string,
    icon: JSX.Element,
    iconBg?: string,
    width?: string
    height?: string
}

const DataRecapCard = ({ data, icon, iconBg, header, width, height }: dataRecapCardProps) => {

    width = width || "300px"
    height = height || "100px"
    iconBg = iconBg || "#E8F3FF"


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