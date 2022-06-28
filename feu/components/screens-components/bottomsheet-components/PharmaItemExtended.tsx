import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import ShadowAround from '../../utility-components/ShadowAround'

import { Pharmacy } from '../../../types/dataTypes'
import OpenPharmacyItemSticker from './OpenPharmacyItemSticker'



interface Props {
    pharmacyData: Pharmacy,
    onPress?: () => void
}

const PharmaItemExtended: React.FC<Props> = ({ pharmacyData, onPress }) => {
    return (
        <ShadowAround
            shadowStyles={{
                shadowColor: "#C0AF96",
                shadowOffset: { width: 0, height: 0 },
            }}
        >
            <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
                <View style={styles.container}>

                    <View style={styles.primaryContainer}>
                        <View style={styles.pharmacyInfoContainer}>

                            <Text style={styles.pharmacyHeader}>{pharmacyData.flat_name}</Text>
                            <Text style={styles.pharmacyPosition}>{pharmacyData.geographical_position}</Text>
                        </View>
                        {
                            pharmacyData.distance && <View style={styles.pharmacyDistanceContainer}>

                                <Text style={styles.pharmacyDistance}>{pharmacyData.distance}</Text>
                            </View>
                        }

                    </View>
                    {

                        pharmacyData.open && <OpenPharmacyItemSticker state='open' title="Pharmacie de garde" />
                    }


                </View>
            </TouchableWithoutFeedback>
        </ShadowAround>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'column',
        backgroundColor: "#FDF2E3",
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        // borderWidth: 1,
        // borderColor: "red"
    },
    primaryContainer: {
        width: "100%",
        // borderWidth: 1,
        flexDirection: "row",
        marginBottom: 10,
    },
    pharmacyInfoContainer: {
        flexDirection: "column",
        // width: "80%",
        flex: 1,
    },
    pharmacyHeader: {
        fontSize: 15,
        fontWeight: "bold",
        // textTransform: "capitalize",
    },
    pharmacyPosition: {
        color: "gray",
    },
    pharmacyDistanceContainer: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",

    },
    pharmacyDistance: {
        fontSize: 13,
        fontWeight: "bold",
        color: "gray",
        textAlign: "center",
    },
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
    }

})


const PharmacyStateContainer = () => {

    return (
        <View></View>
    )
}


export default PharmaItemExtended