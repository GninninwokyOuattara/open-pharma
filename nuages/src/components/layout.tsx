// Layout component

// import Box
import { Box, Flex } from '@chakra-ui/react';
import NavigationBar from './navigationBar';

// import outlet from router
import { Outlet } from 'react-router-dom';
import { palette } from '../colorPalette';



const Layout = () => {
    return (
        // The box should have padding left and right of 10
        <Box paddingX={0} paddingY={0}
            height="100vh"
            width="100vw"
            maxW={"100vw"}
            maxH={"100vh"}
            overflow={"hidden"}
            backgroundColor={palette.custom.veryLightOrange}

        >
            {/* <VStack spacing={10}> */}
            <Flex height={"100%"} width={"100%"}>
                <NavigationBar />
                <Box
                    width={"100%"}
                    height={"100%"}
                    // overflow={"hidden"}
                    padding={2}
                    paddingY={5}
                    paddingX={5}
                    // borderWidth={1}
                    // borderColor="orange.200"
                    borderRadius={5}
                    backgroundColor={palette.custom.veryLightOrange}
                >
                    <Outlet />
                </Box>



            </Flex>

        </Box>
    );
};


export default Layout;

