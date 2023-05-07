import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { palette } from "../colorPalette";
import { DashboardItemHeader } from "./dashboardItemHeader";

export const DashboardActivity = () => {
    return (
        <VStack
            paddingBottom={2}
            backgroundColor={"white"}
            shadow={"md"}
            height={"100%"}
            borderRadius={"md"}
            gap={0.1}
            padding={1}

        >

            <DashboardItemHeader title={"Recent Activity"} />


            <VStack
                height={"100%"}
                width={"100%"}
                // border={"2px solid"}
                padding={1}
                gap={0.1}
                overflowY={"scroll"}

            >



                <ActivityItem
                    icon={<CheckCircleIcon color={"green.500"} />}
                    title={"Pharmacy du petit marché du dokui has been Approved"}
                    time={"2 hours ago"}
                />
                <ActivityItem
                    icon={<CheckCircleIcon color={"red.500"} />}
                    title={"Pharmacy Rejected"}
                    time={"3 hours ago"}
                />
                <ActivityItem
                    icon={<CheckCircleIcon color={"gray.500"} />}
                    title={"Automatic Update"}
                    time={"3 hours ago"}
                />
                <ActivityItem
                    icon={<CheckCircleIcon color={"green.500"} />}
                    title={"Pharmacy du petit marché du dokui has been Approved"}
                    time={"2 hours ago"}
                />
                <ActivityItem
                    icon={<CheckCircleIcon color={"red.500"} />}
                    title={"Pharmacy Rejected"}
                    time={"3 hours ago"}
                />
                <ActivityItem
                    icon={<CheckCircleIcon color={"gray.500"} />}
                    title={"Automatic Update"}
                    time={"3 hours ago"}
                />


            </VStack>



        </VStack>
    )
}



interface ActivityItemProps {

    icon: any;
    title: string;
    time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, time }) => {


    return (

        <Box
            width={"100%"}
            // height={"100%"}
            padding={2}
            backgroundColor={palette.custom.veryLightOrange}
            borderRadius={"md"}
            shadow={"md"}



        >
            <HStack


            >

                {icon}

                <Box
                    display={"flex"}
                    flexDirection={"column"}
                >
                    <Text
                        fontWeight={"medium"}
                        fontSize={"medium"}
                    >{title}</Text>

                    <Text
                        fontWeight={"bold"}
                        fontSize={"small"}
                        color={"gray"}                    >
                        {time}
                    </Text>

                </Box>

            </HStack>

        </Box>
    )

}