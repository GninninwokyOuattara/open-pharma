// Navigation bar component

import { Box, Button, HStack, Icon, List, ListItem, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";


// import Link from router
import routes from "../routes";



// styles
import { palette } from "../colorPalette";
import styles from "../styles/navigation.module.css";

// import HiOutlineExternalLink
import { HiOutlineExternalLink } from "react-icons/hi";


const NavigationBar = () => {
    return (

        <Box
            backgroundColor="whiteAlpha.100"
            // padding={10}
            height="100%"
            // width={"100px"}
            minWidth={"52"}
            paddingY={5}
            // borderRadius="md"
            paddingX={"2"}
            overflow={"hidden"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            borderRight={"1px solid"}
            borderColor={palette.colorHuntTheme.strongOrange}

        >

            <Box h={10} w="full" alignItems={"center"} justifyContent={"center"} display={"flex"} marginBottom={20}>

                <Icon as={routes[0].icon} color="black" display={"block"} />



            </Box>

            <VStack spacing={10} w={"full"} height={"100%"}>


                <nav className={styles.navigation}>
                    <List >
                        {routes.map((route, idx) => {

                            return <ListItem

                                height={10}
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


                                    <HStack w={"full"} paddingLeft={4}>

                                        <Icon as={route.icon}
                                            boxSize={6}
                                            display={"block"}
                                        />
                                        <Text>{route.name}</Text>

                                    </HStack>


                                </NavLink>
                            </ListItem>
                        })}
                    </List>

                </nav>



            </VStack>

            {/* <Box h={10} w="full" alignItems={"center"} justifyContent={"center"} display={"flex"} borderRadius={"md"} backgroundColor={palette.colorHuntTheme.tameOrange} shadow={"md"}>

              

                <Text
                    color={"white"}
                    fontSize={"24px"}
                >Go To App</Text>

            </Box> */}
            <a
                href="https://google.ci"
                style={{
                    width: "100%",

                }}
            >

                <Button
                    w={"full"}
                    h={16}
                    backgroundColor={palette.colorHuntTheme.lightOrange}
                    rightIcon={<HiOutlineExternalLink />}
                    color={"white"}
                    fontSize={"24px"}

                    _hover={{
                        backgroundColor: palette.colorHuntTheme.strongOrange
                    }}

                >
                    App
                </Button>
            </a>

        </Box >
    );
};

export default NavigationBar;