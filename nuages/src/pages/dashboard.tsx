
import { Box, HStack, VStack } from "@chakra-ui/react";
import { DashboardActions } from "../components/dashboardActions";
import { DashboardActivity } from "../components/dashboardActivity";
import DashboardLineChart from "../components/dashboardLineChart";
import DashboardPieChart from "../components/dashboardPieChart";
import { DashboardUpdateRecap } from "../components/dashboardUpdateRecap";

const Dashboard = () => {
    return (
        <>

            <Box
                height={"100%"}
                display={"flex"}
                gap={2}

            >



                <VStack
                    width={"70%"}
                    height={"100%"}
                    gap={1}
                >
                    <HStack

                        height={"60%"} width={"100%"}
                        gap={1}
                    >

                        <Box

                            height={"100%"} width={"50%"}
                        >
                            <DashboardPieChart />
                        </Box>

                        <VStack

                            height={"100%"}
                            width={"50%"}
                            gap={1}
                        >
                            <Box
                                height={"30%"} width={"100%"}
                            >

                                <DashboardActions />
                            </Box>
                            <Box
                                height={"100%"} width={"100%"}
                            >

                                <DashboardUpdateRecap />
                            </Box>
                        </VStack>



                    </HStack>


                    <Box

                        height={"40%"} width={"100%"}
                    >
                        <DashboardLineChart />
                    </Box>
                </VStack>
                <VStack
                    height={"100%"} width={"30%"}
                >


                    <Box

                        height={"100%"} width={"100%"}
                    // border={"2px solid"}
                    >
                        <DashboardActivity />
                    </Box>
                </VStack>






            </Box>
        </>

    );
};

export default Dashboard;