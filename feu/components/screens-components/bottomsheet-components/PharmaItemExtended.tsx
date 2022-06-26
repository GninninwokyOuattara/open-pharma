import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import ShadowAround from '../../utility-components/ShadowAround'

const PharmaItemExtended = () => {
    return (
        <ShadowAround
            shadowStyles={{
                shadowColor: "#C0AF96",
                shadowOffset: { width: 0, height: 0 },
            }}
        >
            <TouchableWithoutFeedback>
                <View style={styles.container}>

                    <View style={styles.primaryContainer}>


                        <View style={styles.infoContainer}>
                            <View >

                                <Text style={styles.infoHeader}>Hello WorldHello WorldHello WorldHello WorldHello World</Text>
                            </View>
                            <View >

                                <Text style={styles.infoDetails}>Hello WorldHello WorldHello WorldHello WorldHello World</Text>
                            </View>
                        </View>
                        <View style={styles.distanceContainer}>
                            <Text style={styles.distanceDetails}>213.3 Km</Text>
                        </View>
                    </View>

                    <View>
                        <Text>Hello</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ShadowAround>
    )
}

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        backgroundColor: "#FDF2E3",
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        // marginHorizontal: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "red"


    },
    primaryContainer: {
        flex: 1,
        flexDirection: "row",
    },
    secondaryContainer: {

    },
    infoContainer: {
        // backgroundColor: "blue",
        // width: 10,
        // height: 10,
        flex: 1,
        padding: 5,
        borderWidth: 1,

    },
    infoHeader: {
        // fontWeight: "bold",
        fontSize: 15,
    },
    infoDetails: {
        color: "gray",
        fontSize: 13,
    },
    distanceContainer: {
        // backgroundColor: "red",
        borderWidth: 1,
        width: "20%",
        // height: 10,
        minHeight: 10,
        justifyContent: "center",
        alignItems: "center",


    },
    distanceDetails: {
        color: "gray",
        fontSize: 14,
        fontWeight: "bold",
    },
})

export default PharmaItemExtended