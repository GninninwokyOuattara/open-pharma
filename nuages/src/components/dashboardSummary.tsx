import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { palette } from "../colorPalette"

const DashboardSummary = () => {
    return (

        <Box
            padding={2}
            backgroundColor={palette.custom.veryLightOrange}
            shadow={"md"}
            height={"100%"}
            borderRadius={"md"}
        >

            <Text
                fontWeight={"bold"}
                fontSize={"xl"}
            >Summary Overview</Text>

            <VStack
                gap={2}
                padding={2}
            >

                <SummaryCard
                    title={"Open Pharmacies"}
                    value={100}
                    color={"green.500"}
                />

                <SummaryCard
                    title={"Active Pharmacies"}
                    value={100}
                    color={"blue.500"}
                />

                <SummaryCard
                    title={"Inactive Pharmacies"}
                    value={100}
                    color="gray.500"
                />

                {/* <SummaryCard />
                <SummaryCard /> */}


            </VStack>

        </Box>


    )
}

export default DashboardSummary




interface SummaryCardProps {
    title: string;
    value: number;
    color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, color }) => {
    return (

        <Box
            width={"100%"}
            height={"50px"}
            backgroundColor={"white"}
            borderRadius={"md"}
            shadow={"md"}
            padding={2}
            display={"flex"}
        >

            <HStack width={"100%"}>

                <Box width={"100%"}>

                    <Text
                        fontWeight={"medium"}
                        color={color}
                    >{title}</Text>
                </Box>

                <Box
                    backgroundColor={palette.custom.veryLightOrange}
                    borderRadius={"lg"}
                    width={"60px"}
                    // height={"20px"}
                    display={"flex"}
                    justifyContent={"center"}
                    padding={0}

                >

                    <Text
                        fontWeight={"bold"}
                        color={color}
                    >
                        {value}
                    </Text>
                </Box>

            </HStack>

        </Box>
    )
}