import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { BsFileEarmarkCheck, BsToggles } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { palette } from "../colorPalette";
import { DashboardContext, DashboardContextInterface } from "../contexts/dashboardContext";
import { getTimeElapsed } from "../utils/dry";
import { DashboardItemHeader } from "./dashboardItemHeader";

export const DashboardActivity = () => {


    const { activities } = useContext(DashboardContext) as DashboardContextInterface

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

                {
                    activities.map((activity, index) => {

                        const time_elapsed = getTimeElapsed(activity.date_created)

                        let icon: any
                        let color: string


                        // The color
                        switch (activity.action) {
                            case "accepted":
                                color = "green.400"
                                break;
                            case "rejected":
                                color = "red.400"
                                break;
                            case "activation":
                                color = "blue.400"
                                break;
                            case "deactivation":
                                color = "gray.400"
                                break;
                            case "manual":
                                color = "blue.400"
                                break;
                            case "automatic":
                                color = "gray.400"
                                break;

                            default:
                                color = "gray.400"
                        }


                        // The icon
                        switch (activity.type) {
                            case "review":
                                icon = <Icon as={BsFileEarmarkCheck} color={color} boxSize={7} />
                                break;
                            case "state":
                                icon = <Icon as={BsToggles} color={color} boxSize={7} />
                                break;
                            case "actualization":
                                icon = <Icon as={FiSettings} color={color} boxSize={7} />

                        }


                        return (
                            <ActivityItem
                                key={index}
                                icon={icon}
                                title={activity.description}
                                time={time_elapsed}
                            />
                        )
                    })
                }




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