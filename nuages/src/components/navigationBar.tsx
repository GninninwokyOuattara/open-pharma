// Navigation bar component

import { Box, Button, Divider, HStack, IconButton, List, Text, VStack } from "@chakra-ui/react";


// import Link from router
import routes from "../routes";



// styles
import { palette } from "../colorPalette";
import styles from "../styles/navigation.module.css";

// import HiOutlineExternalLink
import { useContext } from "react";
import { HiOutlineExternalLink, HiOutlineLogout } from "react-icons/hi";
import { UserAuthContext, UserAuthContextInterface } from "../contexts/userAuthContext";
import NavigationItemIcon from "./navigationItemIcon";
import NavigationTabItem from "./navigationTabItem";
import OpenPharmaIcon from "./openPharmaIcon";


const OpenPharmaLogoText = () => {


    return (

        <Box display={"flex"} alignItems={"center"} justifyItems={"center"}>

            <OpenPharmaIcon boxSize={10} color={palette.app.orange} />
            <Text
                display={["none", "none", "none", "inline-block"]}
                fontWeight={"bold"}
                fontSize={"28px"}
            >
                OpenPharma</Text>
        </Box>
    )
}





const NavigationBar = () => {

    const { logout } = useContext(UserAuthContext) as UserAuthContextInterface

    return (
        <>
            <Box
                display={["none", "none", "none", "flex"]}
                height="100%"
                // width={"100px"}
                minWidth={"60"}
                paddingY={5}
                // borderRadius="md"

                overflow={"hidden"}
                flexDirection={"column"}
                alignItems={"center"}
            // borderRight={"1px solid"}
            // borderColor={palette.colorHuntTheme.strongOrange}

            >
                <Box
                    height={"100%"}
                    width={"100%"}
                    paddingX={"2"}
                    display={"flex"}

                    flexDirection={"column"}
                    alignItems={"center"}

                    // border={"2px solid"}
                    borderRight={`1px solid ${palette.custom.niceOrange}`}
                >




                    <OpenPharmaLogoText />

                    <VStack spacing={10} w={"full"} height={"100%"}>


                        <nav className={styles.navigation}>
                            <List >
                                {routes.map((route, idx) => {

                                    return <NavigationTabItem route={route} idx={idx} key={idx} />

                                })}
                            </List>

                        </nav>



                    </VStack>
                    <a
                        href="https://google.ci"
                        style={{
                            width: "100%",

                        }}
                    >

                        <Button
                            w={"full"}
                            h={16}
                            backgroundColor={"black"}
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

                    <Button
                        w={"full"}
                        h={16}
                        marginTop={3}
                        backgroundColor={palette.custom.niceOrange}
                        onClick={logout}
                    >
                        Logout
                    </Button>

                </Box>

            </Box >

            <NavigationBarDefault />
        </>

    );
};



const NavigationBarDefault = () => {
    // Default navigation bar for small screen to medium

    return (
        <Box
            display={["flex", "flex", "flex", "none"]}
            width={"100%"}
            height={"3em"}
            // backgroundColor={"black"}
            borderBottomColor={palette.app.gray}
            borderBottomWidth={1}
            flexDirection={"row"}
            paddingX={2}
            paddingY={1}
            alignItems={"center"}
            justifyContent={"space-between"}
        >

            <OpenPharmaLogoText />

            <NavigationLinkBar />

            <IconButton
                aria-label="logout"
                variant={"ghost"}
                // size={"lg"}
                fontSize={"30px"}
                icon={<HiOutlineLogout />}
            />



        </Box>
    )
}


const NavigationLinkBar = () => {

    const routeSize = routes.length
    return (
        <Box
            backgroundColor={palette.app.white}
            height={"100%"}
            paddingY={1}
            paddingX={5}
            borderRadius={"md"}
            display={"flex"}
            alignItems={"center"}
            justifyItems={"center"}
        >
            <HStack
                justifyContent={"space-evenly"}
                height={"100%"}
            >
                {routes.map((route, idx) => {

                    const outputComponent = <>
                        <NavigationItemIcon route={route} idx={idx} key={idx} />
                        {(idx + 1 < routeSize) ?

                            <Divider orientation="vertical" />

                            : null
                        }
                    </>
                    return (
                        outputComponent
                    )


                })}
            </HStack>
        </Box>
    )
}

export default NavigationBar;