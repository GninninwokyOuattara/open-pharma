import { Box, HStack, Icon, ListItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
import { palette } from "../colorPalette";


interface props {
    route: {
        path: string;
        name: string;
        icon: IconType;
    },
    idx: number;
}

function NavigationTabItem({ route, idx }: props) {

    const [isLinkActive, setIsLinkActive] = useState(false)

    return (
        <ListItem

            height={14}
            key={idx}
            display={"block"}
            borderRadius={"md"}
            overflow="hidden"
            marginBottom={1}


        >
            <NavLink
                to={route.path}
                className={({ isActive }) => {
                    if (isActive) {
                        setIsLinkActive(true)
                        return ""
                    } else {
                        setIsLinkActive(false)
                        return ""
                    }
                }}



            >




                <HStack w={"full"} paddingLeft={1} height={"100%"} paddingY={2}>

                    <Box
                        height={"100%"}
                        width={10}
                        borderRadius={"md"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        backgroundColor={isLinkActive ? palette.custom.niceOrange : "white"}
                    >
                        <Icon as={route.icon}
                            boxSize={6}
                            display={"block"}
                            color={isLinkActive ? "black" : "gray.500"}
                        />

                    </Box>
                    <Text fontWeight={"700"}>{route.name}</Text>

                </HStack>





            </NavLink>
        </ListItem>
    )
}

export default NavigationTabItem