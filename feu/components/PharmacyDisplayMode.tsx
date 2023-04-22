import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR_SCHEME } from '../constants/colorSchemes'
import { SET_DISPLAY_MODE } from '../stores/actions'
import { RootReducerType } from '../types/dataTypes'
import ShadowAround from './utility-components/ShadowAround'


const PharmacyDisplayMode = () => {
    const dispatch = useDispatch()

    const displayMode = useSelector((state: RootReducerType) => {
        return state.pharmacies.displayMode;
    });

    const textColor = displayMode === "All" ? "black" : COLOR_SCHEME.MEDIIUM_GREEN

    const toggledisplayMode = () => {

        dispatch({
            type: SET_DISPLAY_MODE,
            data: displayMode === "All" ? "OpenOnly" : "All"
        })
    }

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
                    borderRadius: 5,

                }}>
                    <Text style={{ fontWeight: "500", color: textColor }}>{displayMode == "All" ? "Toutes les pharmacies" : "Pharmacies de garde"}</Text>
                </View>
            </TouchableOpacity>
        </ShadowAround>
    )
}

export default PharmacyDisplayMode