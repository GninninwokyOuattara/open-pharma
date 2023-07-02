import { Button, Icon, VStack } from "@chakra-ui/react"
import { useCallback, useContext, useState } from "react"
import { BiRefresh } from "react-icons/bi"
import { MdSettings } from "react-icons/md"
import { palette } from "../colorPalette"
import { DashboardContext, DashboardContextInterface } from "../contexts/dashboardContext"


export const DashboardActions = () => {

    const { getStatistics, isLoading, triggerActualization } = useContext(DashboardContext) as DashboardContextInterface

    const [isActualiztionLoading, setIsActualizationLoading] = useState<boolean>(false)

    const handleActualization = useCallback(async () => {
        setIsActualizationLoading(true)
        await triggerActualization()
        setIsActualizationLoading(false)
    }, [isActualiztionLoading, triggerActualization])



    return (
        <VStack
            height={"100%"}
            width={"100%"}
            // backgroundColor={"white"}
            shadow={"md"}
            borderRadius={"md"}
            padding={1}
            align={"flex-start"}
        >



            <ActionButton
                title={"Refresh Dashboard"}
                icon={<Icon as={BiRefresh} />}
                onClick={() => getStatistics()}
                isLoading={isLoading}
            />

            <ActionButton
                title={"Trigger Data Actualization"}
                icon={<Icon as={MdSettings} />}
                onClick={() => handleActualization()}
                isLoading={isActualiztionLoading}
            />




        </VStack>
    )
}



interface ActionButtonProps {
    title: string,
    icon: any,
    onClick: () => void,
    isLoading: boolean
}

const ActionButton = ({ title, icon, onClick, isLoading }: ActionButtonProps) => {
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
            isLoading={isLoading}
        // isLoading
        >
            {title}
        </Button>
    )
}
