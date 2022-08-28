import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLOR_SCHEME } from '../constants/colorSchemes'
import ShadowAround from './utility-components/ShadowAround'


const PharmacyShowMode = () => {
    const [showMode, setShowMode] = useState<"All" | "OpenOnly">("All")

    const toggleShowMode = () => {
        setShowMode(showMode === "All" ? "OpenOnly" : "All")
    }
    return (
        <ShadowAround>
            <TouchableOpacity onPress={toggleShowMode}>

                <View style={{
                    // borderWidth: 1,
                    // borderColor: "black",
                    backgroundColor: COLOR_SCHEME.MEDIUM_ORANGE,
                    alignSelf: "flex-start",
                    padding: 5,
                    marginRight: 5,
                    borderRadius: 5
                }}>
                    <Text style={{ fontWeight: "500" }}>{showMode == "All" ? "Toutes les pharmacies" : "Pharmacies de garde uniquement"}</Text>
                </View>
            </TouchableOpacity>
        </ShadowAround>
    )
}

export default PharmacyShowMode