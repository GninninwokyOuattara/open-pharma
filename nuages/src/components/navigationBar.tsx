// Navigation bar component

import { Box, Icon, List, ListItem, VStack } from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";


// import Link from router
import routes from "../routes";



const NavigationBar = () => {
    return (
        // A Box of black color with padding of 10 that take all the available height
        <Box
            backgroundColor="black"
            // padding={10}
            height="100%"
            width={"100px"}
            paddingY={5}
            borderRadius="md"
            overflow={"hidden"}
        >

            <VStack spacing={10} w={"full"}>


                <nav style={{
                    width: "100%"
                }}>
                    <List>
                        {routes.map((route) => {

                            return <ListItem h={10}

                            >
                                <NavLink
                                    className={"navigationLink"}
                                    to={route.path}
                                    style={{
                                        // display: "block",
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#8F8F8F"


                                    }}
                                >

                                    <Icon as={MdSettings}
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

        </Box >
    );
};

export default NavigationBar;