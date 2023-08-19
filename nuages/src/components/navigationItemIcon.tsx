import { Box, HStack, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { NavLink } from "react-router-dom"
import { palette } from "../colorPalette"

interface props {
    idx: number
    route: {
        path: string
        name: string
        icon: IconType
    }
}

const NavigationItemIcon = ({ route, idx }: props) => {


    return (

        <NavLink
            to={route.path}
        >


            {
                ({ isActive, isPending }) => {

                    return <HStack w={"full"} paddingLeft={1} height={"100%"} paddingY={2}>

                        <Box


                        >
                            <Icon as={route.icon}
                                boxSize={6}
                                display={"block"}
                                color={isActive ? palette.app.orange : palette.app.gray}

                                _hover={{
                                    color: isActive ? palette.app.orange : palette.app.black
                                }}
                            />

                        </Box>

                    </HStack>

                }
            }







        </NavLink>

    )
}


export default NavigationItemIcon;