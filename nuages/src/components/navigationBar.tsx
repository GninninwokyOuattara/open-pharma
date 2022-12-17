// Navigation bar component

import { Box, Icon, List, ListItem, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";


// import Link from router
import routes from "../routes";

import { IoIosAddCircleOutline } from "react-icons/io";


// styles
import styles from "./navigation.module.css";


const NavigationBar = () => {
    return (

        <Box
            backgroundColor="black"
            // padding={10}
            height="100%"
            // width={"100px"}
            minWidth={"20"}
            paddingY={5}
            // borderRadius="md"
            overflow={"hidden"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}

        >

            <Box h={10} w="full" alignItems={"center"} justifyContent={"center"} display={"flex"} marginBottom={20}>

                <Icon as={routes[0].icon} color="white" display={"block"} />


            </Box>

            <VStack spacing={10} w={"full"} height={"100%"}>


                <nav className={styles.navigation}>
                    <List paddingX={"2"}>
                        {routes.map((route, idx) => {

                            return <ListItem

                                height={14}
                                key={idx}
                                display={"block"}
                                // borderColor={"red.700"}
                                // borderWidth={"1px"}
                                borderRadius={"md"}
                                overflow="hidden"
                                marginBottom={1}


                            >
                                <NavLink
                                    to={route.path}
                                    className={({ isActive }) => isActive ? styles.navigationLinkActive : styles.navigationLink}

                                >

                                    <Icon as={route.icon}
                                        boxSize={4}
                                        display={"block"}
                                        _hover={{
                                            color: "white",
                                        }} />

                                </NavLink>
                            </ListItem>
                        })}
                    </List>

                </nav>



            </VStack>

            <Box h={10} w="full" alignItems={"center"} justifyContent={"center"} display={"flex"}>

                <Icon as={IoIosAddCircleOutline} color="white" display={"block"} boxSize={10} />


            </Box>
        </Box >
    );
};

export default NavigationBar;