
import { Box, HStack, VStack } from "@chakra-ui/react";
import { DashboardActivity } from "../components/dashboardActivity";
import DashboardLineChart from "../components/dashboardLineChart";
import DashboardPieChart from "../components/dashboardPieChart";

const Dashboard = () => {
    return (
        <Box
            height={"100%"}
            display={"flex"}
            gap={2}

        >

            <VStack
                height={"100%"} width={"30%"}
            >

                {/* summary
                <Box

                    height={"45%"} width={"100%"}
                // border={"2px solid"}
                >
                    <DashboardSummary />
                </Box> */}

                {/* Activity */}
                <Box

                    height={"100%"} width={"100%"}
                // border={"2px solid"}
                >
                    <DashboardActivity />
                </Box>
            </VStack>

            <VStack
                width={"70%"}
                height={"100%"}
                gap={2}
            >
                <HStack

                    height={"60%"} width={"100%"}
                    gap={2}
                >

                    {/* pie chart */}
                    <Box

                        height={"100%"} width={"50%"}
                    >
                        <DashboardPieChart />
                    </Box>

                    {/* Buttons */}
                    <Box

                        height={"100%"} width={"50%"}
                        border={"2px solid"}
                    >
                        Buttons
                    </Box>



                </HStack>


                {/* Graph */}
                <Box

                    height={"40%"} width={"100%"}
                >
                    <DashboardLineChart />
                </Box>
            </VStack>






        </Box>
    );
};

export default Dashboard;