import { VStack } from '@chakra-ui/react';

import { useContext } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { palette } from '../colorPalette';
import { DashboardContext, DashboardContextInterface } from '../contexts/dashboardContext';
import { DashboardItemHeader } from './dashboardItemHeader';

const DashboardLineChart = () => {
    return (
        <VStack
            height={"100%"}
            shadow={"base"}
            borderRadius={"md"}
            padding={1}
        // backgroundColor={"white"}
        >

            <DashboardItemHeader title={"Pharmacies Growth Overtime"} />


            <CustomLineChart />
        </VStack>
    )
}

export default DashboardLineChart



const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const CustomLineChart = () => {

    const { lineChartDatas } = useContext(DashboardContext) as DashboardContextInterface

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={lineChartDatas}
                margin={{
                    top: 5,
                    right: 10,
                    left: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="linear" dataKey="count" stroke={palette.custom.niceOrange} activeDot={{ r: 8 }} animationBegin={0} />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
    );
}

