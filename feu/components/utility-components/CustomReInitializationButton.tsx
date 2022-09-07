import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import useInitializer from '../../hooks/useInitializer';




const CustomReInitializationButton = () => {

    // Hooks
    const { init } = useInitializer()



    return (

        <TouchableOpacity onPress={async () => {
            console.log("Reinitialization")
            await init();
        }}>
            <View style={styles.iconContainer}>

                <MaterialCommunityIcons
                    style={styles.myLocationIcon}
                    name="reload"
                    size={20}
                    color="green"
                />
            </View>
        </TouchableOpacity>

    )
}



const styles = StyleSheet.create({
    iconContainer: {
        // borderWidth: 1,
        // borderColor: 'black',
        // width: 60,
        // height: 60,
        padding: 5,
        backgroundColor: "white",
        // position: "absolute",
        // top: 200,
        // right: 10,
        borderRadius: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },

    myLocationIcon: {
        // borderColor: "red",
        // borderWidth: 1,
        // position: "relative",
        // right: 0,
        // top: 0,
        // left: 0,
        // bottom: 0,
    }
})

export default CustomReInitializationButton