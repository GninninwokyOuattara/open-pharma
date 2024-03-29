import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';




interface Props {
    // pharmacyData: PharmacyFullState,
    isOpen: boolean,
    distanceToUser?: string,
    name: string,
    onPress?: () => void
}


const PharmaItemExtended: React.FC<Props> = React.memo(({ name, distanceToUser, isOpen, onPress }) => {

    let containerStyle;
    if (isOpen) {
        containerStyle = [styles.container, {
            borderWidth: 1,
            borderColor: "green"
        }]
    } else {
        containerStyle = styles.container
    }

    return (


        <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
            <View style={containerStyle}>

                <View style={styles.primaryContainer}>
                    <ScrollView
                        style={styles.pharmacyInfoContainer}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >

                        <Text style={styles.pharmacyHeader}>{name}</Text>

                    </ScrollView>


                    <View style={styles.pharmacyMetaContainer}>
                        <View>
                            {
                                distanceToUser && <Text style={styles.pharmacyDistance}>{distanceToUser}</Text>
                            }

                        </View>

                        {/* {
                            isOpen &&
                            <Pulse color='#28a745' />


                        } */}
                    </View>



                </View>



            </View>
        </TouchableWithoutFeedback>

    )
})


const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'column',
        backgroundColor: "#FDF2E3",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        height: 50,
        // borderWidth: 1,
        // borderColor: "red",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,

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
        color: "#d69352",
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




export default PharmaItemExtended



