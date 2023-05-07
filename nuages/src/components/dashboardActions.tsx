import { Button, Icon, VStack } from "@chakra-ui/react"
import { BiRefresh } from "react-icons/bi"
import { MdSettings } from "react-icons/md"
import { palette } from "../colorPalette"


export const DashboardActions = () => {
    return (
        <VStack
            height={"100%"}
            width={"100%"}
            backgroundColor={"white"}
            shadow={"md"}
            borderRadius={"md"}
            padding={1}
            align={"flex-start"}
        >



            <ActionButton
                title={"Refresh Dashboard"}
                icon={<Icon as={BiRefresh} />}
                onClick={() => console.log("clicked")}
            />

            <ActionButton
                title={"Trigger Data Actualization"}
                icon={<Icon as={MdSettings} />}
                onClick={() => console.log("clicked")}
            />




        </VStack>
    )
}



interface ActionButtonProps {
    title: string,
    icon: any,
    onClick: () => void
}

const ActionButton = ({ title, icon, onClick }: ActionButtonProps) => {
    return (
        <Button
            width={"100%"}
            // variant={'outline'}
            // colorScheme='orange'
            rightIcon={icon}
            backgroundColor={palette.custom.niceOrange}
            color={"white"}
            _hover={{ backgroundColor: "orange.500" }}
            onClick={onClick}
        // isLoading
        >
            {title}
        </Button>
    )
}
