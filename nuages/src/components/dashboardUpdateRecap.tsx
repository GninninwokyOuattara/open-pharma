import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react"
// import CountUp from "react-countup/build/CountUp"
import CountUp from "react-countup"
import { AiOutlinePlus } from "react-icons/ai"
import { BsLightningFill } from "react-icons/bs"
import { MdHouseSiding } from "react-icons/md"
import { palette } from "../colorPalette"
import { DashboardItemHeader } from "./dashboardItemHeader"

export const DashboardUpdateRecap = () => {
    return (
        <VStack
            height={"100%"}
            width={"100%"}
            backgroundColor={"white"}
            shadow={"md"}
            borderRadius={"md"}
            padding={1}
        >

            <DashboardItemHeader title={"Latest Update Summary"} />
            <UpdateRecapItem
                color={"blue.400"}
                title={"New Pharmacies"}
                value={304}
                icon={<Icon as={AiOutlinePlus}
                    boxSize={12}
                    color={"blue.400"} />}
            />
            {/* Pharmacies opened */}
            <UpdateRecapItem
                color={"green.400"}

                title={"Pharmacies opened"}
                value={165}
                icon={<Icon
                    as={MdHouseSiding}
                    boxSize={12}

                    color={"green.400"} />}
            />

            {/* Pharmacies skipped */}

            <UpdateRecapItem
                color={"yellow.400"}
                title={"Pharmacies skipped"}
                value={44}
                icon={<Icon
                    as={BsLightningFill}
                    boxSize={12}

                    color={"yellow.400"} />}
            />



        </VStack>
    )
}



interface UpdateRecapItemProps {
    color: string,
    title: string,
    value: number
    icon: any

}


const UpdateRecapItem = ({ color, title, value, icon }: UpdateRecapItemProps) => {

    return (
        <HStack
            width={"100%"}
            height={"70px"}
            border={"1px solid"}
            borderColor={"gray.200"}
            borderRadius={"md"}
            // shadow={"md"}
            padding={1}
        >
            <Box
                width={"70px"}
                height={"full"}
                backgroundColor={palette.custom.veryLightOrange}
                borderRadius={"md"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                {icon}
            </Box>

            <Box
                display={"flex"}
                flexDirection={"column"}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={0}
            >
                <Text
                    fontWeight={"bold"}
                    fontSize={"md"}
                    color={color}

                >
                    {title}
                </Text>

                <Text
                    fontWeight={"bold"}
                    fontSize={"30px"}
                    color={color}
                >
                    <CountUp
                        end={value}
                        duration={2}
                    />
                </Text>
            </Box>




        </HStack>
    )
}