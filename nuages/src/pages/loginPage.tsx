import { Box, Button, FormControl, FormLabel, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { palette } from '../colorPalette'
import OpenPharmaIcon from '../components/openPharmaIcon'
import { useUserAuthContext } from '../contexts/userAuthContext'

const LoginPage = () => {

    // const { authenticate, isAuthenticating } = useContext(UserAuthContext) as UserAuthContextInterface

    const { authenticate, isAuthenticating } = useUserAuthContext();


    const [loginForm, setLoginForm] = useState({

        email: "",
        password: ""
    })


    console.log(loginForm)

    const handleLoginFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event) {
            setLoginForm({
                ...loginForm,
                [event.target.type]: event.target.value
            })
        }
    }


    return (
        <Box
            height={"100vh"}
            width={"100vw"}
            backgroundColor={"white"}
            display={"block"}

        >


            <HStack
                w={"100%"}
                h={"100%"}
            >
                <Box
                    w={"40%"}
                    height={"100%"}
                    padding={2}
                    backgroundColor={palette.custom.veryLightOrange}
                >
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                    >

                        <OpenPharmaIcon boxSize={12} color={palette.custom.niceOrange} />
                        <Text
                            fontWeight={"bold"}
                            fontSize={"28px"}
                        >
                            OpenPharma</Text>
                    </Box>
                </Box>
                <Box
                    w={"60%"}
                    height={"100%"}

                ></Box>
            </HStack>

            <VStack
                display={"flex"}
                justifyContent={"flex-start"}
                padding={10}
                position={"absolute"}
                margin={"auto"}
                top={0}
                right={0}
                left={0}
                bottom={0}
                shadow={"md"}
                backgroundColor={"white"}

                w={"400px"}
                h={"400px"}

                gap={3}
            >

                <Text
                    fontSize={"2xl"}
                    fontWeight={"bold"}
                >Authentication</Text>


                <FormControl>

                    <FormLabel>Login</FormLabel>
                    <Input
                        type='email'
                        value={loginForm.email}
                        onChange={handleLoginFormChange}
                    />

                </FormControl>

                <FormControl>

                    <FormLabel>Password</FormLabel>
                    <Input
                        type='password'
                        value={loginForm.password}
                        onChange={handleLoginFormChange}
                    />

                </FormControl>


                <Button
                    width={"100%"}
                    backgroundColor={palette.custom.veryLightOrange}
                    title='LOGIN'
                    // borderRadius={"10%"}
                    borderLeftRadius={20}
                    borderRightRadius={20}
                    color={"white"}

                    _hover={{
                        backgroundColor: palette.custom.niceOrange

                    }}
                    overflow={"hidden"}

                    disabled={isAuthenticating}

                    onClick={() => {
                        console.log("click")
                        authenticate(loginForm.email, loginForm.password)
                    }}

                >
                    <Text
                        textShadow={`white 0px 0px 10px`}
                        color={"black"}
                        fontWeight={"light"}

                    >
                        LOGIN
                    </Text>
                </Button>

            </VStack>

        </Box>
    )
}




export default LoginPage