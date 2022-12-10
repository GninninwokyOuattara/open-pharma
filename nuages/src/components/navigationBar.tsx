// Navigation bar component

import { Box, Icon, List, ListItem, VStack } from "@chakra-ui/react";
import { MdSettings } from 'react-icons/md';

// import Link from router
import { Link } from 'react-router-dom';



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


                <List width={"full"}>
                    <ListItem w={"full"} h={"40px"} justifyContent="center" alignItems="center" _hover={{
                        backgroundColor: "gray.700",

                    }}
                        _groupHover={{
                            bg: "gray.500",
                            color: "white"
                        }}>
                        <Link to={"/"} style={{ display: "block" }} >
                            <Icon as={MdSettings} w="full" _hover={{
                                color: "white",
                            }} />
                        </Link>
                    </ListItem>
                    <ListItem
                        _hover={{
                            bg: "gray.500",
                            color: "orange",
                        }}
                    >
                        <Icon
                            as={MdSettings} w="full"
                            _hover={{
                                color: "orange",
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <Link to={"/"}>
                            <Icon as={MdSettings} />
                        </Link>
                    </ListItem>
                </List>



            </VStack>

        </Box >
    );
};

export default NavigationBar;