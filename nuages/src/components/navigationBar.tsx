// Navigation bar component

import { Box, Icon, Link, VStack } from "@chakra-ui/react";
import { MdSettings } from 'react-icons/md';



const NavigationBar = () => {
    return (
        // A Box of black color with padding of 10 that take all the available height
        <Box
            backgroundColor="black"
            padding={10}
            height="100%"
            width={15}
            borderRadius="md"
            overflow={"hidden"}
        >

            <VStack spacing={10}>
                <Link href="/" display={"block"} color="gray.400" _hover={{ color: "white", background: "gray" }}>

                    <Icon as={MdSettings} />

                </Link>
                <Link href="/" display={"block"} color="gray.400" _hover={{ color: "white" }}>
                    <Icon as={MdSettings} />

                </Link>
                <Link href="/" display={"block"} color="gray.400" _hover={{ color: "white" }}>
                    <Icon as={MdSettings} />

                </Link>
            </VStack>

        </Box >
    );
};

export default NavigationBar;