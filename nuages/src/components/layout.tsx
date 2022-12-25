// Layout component

// import Box
import { Box, Flex } from '@chakra-ui/react';
import NavigationBar from './navigationBar';

// import outlet from router
import { Outlet } from 'react-router-dom';



const Layout = () => {
    return (
        // The box should have padding left and right of 10
        <Box paddingX={0} paddingY={0}
            height="100vh"
            width="100vw"
            overflow={"hidden"}
            backgroundColor={"#F8FBFC"}

        >
            {/* <VStack spacing={10}> */}
            <Flex height={"100%"} >
                <NavigationBar />
                <Box width={"100%"} height={"100%"}
                    padding={2}
                    // borderWidth={1}
                    // borderColor="orange.200"
                    borderRadius={5}
                >
                    <Outlet />
                </Box>



            </Flex>

        </Box>
    );
};


export default Layout;

