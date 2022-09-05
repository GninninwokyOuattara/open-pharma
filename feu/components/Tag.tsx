import React from 'react'
import { Text, View } from 'react-native'
import ShadowAround from './utility-components/ShadowAround'

interface Props {
    title: string,
    // color: string,
    // action ?: () => void,
}

const Tag: React.FC<Props> = ({ title }) => {
    return (
        <ShadowAround>

            <View style={{
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "white",
                alignSelf: "flex-start",
                padding: 5,
                marginRight: 5,
                borderRadius: 5
            }}>
                <Text>{title}</Text>
            </View>
        </ShadowAround>
    )
}

export default Tag