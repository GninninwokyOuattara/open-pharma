import { Text } from '@chakra-ui/react'
import { palette } from '../colorPalette'

export const DashboardItemHeader = ({ title }: { title: string }) => {
    return (
        <Text
            fontWeight={"bold"}
            fontSize={"xl"}
            backgroundColor={palette.custom.veryLightOrange}
            borderRadius={"md"}
            width={"100%"}
            textAlign={"center"}
            color={palette.custom.niceOrange}
        >{title}</Text>
    )
}
