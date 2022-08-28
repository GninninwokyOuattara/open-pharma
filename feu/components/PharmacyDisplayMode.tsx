import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { COLOR_SCHEME } from '../constants/colorSchemes'
import { changeDisplayMode } from '../stores/pharmaciesActions'
import ShadowAround from './utility-components/ShadowAround'


const PharmacyDisplayMode = () => {
    const dispatch = useDispatch()
    const [displayMode, setdisplayMode] = useState<"All" | "OpenOnly">("All")

    const toggledisplayMode = () => {
        setdisplayMode(displayMode === "All" ? "OpenOnly" : "All")
    }


    useEffect(() => {
        dispatch(changeDisplayMode(displayMode))
        console.log("Dispatched")
    }, [displayMode])

    return (
        <ShadowAround>
            <TouchableOpacity onPress={toggledisplayMode}>

                <View style={{
                    // borderWidth: 1,
                    // borderColor: "black",
                    backgroundColor: COLOR_SCHEME.MEDIUM_ORANGE,
                    alignSelf: "flex-start",
                    padding: 5,
                    marginRight: 5,
                    borderRadius: 5
                }}>
                    <Text style={{ fontWeight: "500" }}>{displayMode == "All" ? "Toutes les pharmacies" : "Pharmacies de garde uniquement"}</Text>
                </View>
            </TouchableOpacity>
        </ShadowAround>
    )
}

export default PharmacyDisplayMode