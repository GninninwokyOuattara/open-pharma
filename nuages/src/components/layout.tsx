// Layout component

// import Box
import { Box, Flex } from '@chakra-ui/react';
import NavigationBar from './navigationBar';

// import outlet from router
import { Outlet } from 'react-router-dom';



const Layout = () => {
    return (
        // The box should have padding left and right of 10
        <Box paddingX={10} paddingY={10}
            height="100vh"
            width="100vw"

        >
            {/* <VStack spacing={10}> */}
            <Flex height={"100%"} gap={2}>
                <NavigationBar />
                <Box backgroundColor="red.100" width={"100%"} height={"100%"} >
                    <Outlet />
                </Box>



            </Flex>

        </Box>
    );
};


export default Layout;

