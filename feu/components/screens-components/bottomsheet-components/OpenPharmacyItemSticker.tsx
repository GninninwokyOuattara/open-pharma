import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PHARMACY_STATE } from "../../../constants/colorSchemes"

interface Props {
    title: string,
    state: "open" | "closed" | "close soon"
}


const OpenPharmacyItemSticker: React.FC<Props> = ({ title, state }) => {
    let color: string = "#000000";
    if (state == "open") {
        color = PHARMACY_STATE.OPEN
    } else if (state == "closed") {
        color = PHARMACY_STATE.CLOSED
    } else if (state == "close soon") {
        color = PHARMACY_STATE.CLOSE_SOON
    }
    return (
        <View style={styles.pharmacyStateContainer}>
            <View style={[styles.pharmacyState, { borderColor: color }]}>

                <Text style={{ color: color }}>{title}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    pharmacyStateContainer: {
        // flex: 1,
        // borderWidth: 1,
        // height: 100,
        // width: 100,
    },
    pharmacyState: {
        borderRadius: 15,
        borderWidth: 1,
        alignSelf: "flex-start",
        paddingVertical: 2,
        paddingHorizontal: 10,
        fontWeight: "bold",
    }
})

export default OpenPharmacyItemSticker