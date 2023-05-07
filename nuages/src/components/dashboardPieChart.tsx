import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';


import { Box } from "@chakra-ui/react";
import { DashboardItemHeader } from "./dashboardItemHeader";

const DashboardPieChart = () => {
    return (
        <Box
            width={"100%"}
            height={"100%"}
            shadow={"md"}
            borderRadius={"md"}
            padding={2}
            backgroundColor={"white"}
        >
            <DashboardItemHeader title={"Charts"} />

            <PieCharts />

        </Box>
    )
}

export default DashboardPieChart



const data01 = [
    {
        name: 'Open Pharmacies', value: 100, fill: '#38A169',
    },
    { name: 'Active Pharmacies', value: 300, fill: "#3182CE" },
    { name: 'Inactive Pharmacies', value: 28, fill: "#718096" },

];

const data02 = [
    { name: 'Pharmacies reviewed', value: 150, fill: "#38A169" },
    { name: 'Pharmacies pending review', value: 50, fill: "#DD6B20" },

];

const PieCharts = () => {


    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={500} height={500}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data01}
                    cx={"50%"}
                    cy={100}
                    outerRadius={90}
                    innerRadius={10}
                    fill="#8884d8"
                    label
                />
                <Pie dataKey="value" data={data02} cx={"50%"} cy={"70%"} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}

