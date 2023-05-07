import { Text, VStack } from '@chakra-ui/react';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { palette } from '../colorPalette';

const DashboardLineChart = () => {
    return (
        <VStack
            height={"100%"}
            shadow={"md"}
            borderRadius={"md"}
            padding={2}
        >

            <Text
                fontWeight={"bold"}
                fontSize={"xl"}
            >Pharmacies Growth Overtime</Text>

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

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="linear" dataKey="pv" stroke={palette.custom.niceOrange} activeDot={{ r: 8 }} animationBegin={0} />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
    );
}

