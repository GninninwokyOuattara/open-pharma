import React, { memo } from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import ShadowAround from '../../utility-components/ShadowAround'

import { PharmacyFullState } from '../../../types/dataTypes'
import Pulse from '../../utility-components/Pulse'



interface Props {
    pharmacyData: PharmacyFullState,
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
                        <ScrollView
                            style={styles.pharmacyInfoContainer}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >

                            <Text style={styles.pharmacyHeader}>{pharmacyData.name}</Text>

                        </ScrollView>


                        <View style={styles.pharmacyMetaContainer}>
                            <View>

                                <Text style={styles.pharmacyDistance}>{pharmacyData.distanceToUserReadable}</Text>
                            </View>

                            {
                                pharmacyData.open &&
                                <Pulse color='#28a745' />


                            }
                        </View>



                    </View>



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
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50,
        // borderWidth: 1,
        // borderColor: "red"
    },
    primaryContainer: {
        width: "100%",
        height: "100%",
        // borderWidth: 1,
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
    },
    pharmacyInfoContainer: {
        flexDirection: "row",
        // width: "80%",
        flex: 1,
        marginRight: 10,
        // borderWidth: 1,
    },
    pharmacyMetaContainer: {
        flexDirection: "row",

        // borderWidth: 1,
        // borderColor: "red",
        height: "100%",
        // width: 70,
        justifyContent: "space-between",
        alignItems: "center",
        // padding: 0,
        // space
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
        borderRadius: 5,
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


export default memo(PharmaItemExtended)