import React, { useContext, useEffect } from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MapContext } from '../../contexts/MapContext';
import useInitializer from '../../hooks/useInitializer';




const CustomReInitializationButton = () => {

    // Hooks
    const { init } = useInitializer()
    const { isFetching } = useContext(MapContext)


    let spinValue = new Animated.Value(0);

    // First set up animation

    const spinningAnimation = Animated.loop(Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true  // To make use of native driver for performance
        }
    ))


    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const respin = () => {

        spinningAnimation.start((result) => {
            console.log("Animation done!")

        })

    }

    // respin()

    useEffect(() => {
        console.log(isFetching)
        if (isFetching) {
            spinningAnimation.start()
        } else {
            spinningAnimation.stop()
        }
    }, [isFetching, spinningAnimation])


    return (

        <TouchableOpacity onPress={async () => {
            console.log("Reinitialization")
            await init();
        }}>
            <Animated.View style={{ ...styles.iconContainer, transform: [{ rotate: spin }] }}>

                <MaterialCommunityIcons
                    style={styles.myLocationIcon}
                    name="reload"
                    size={20}
                    color="green"
                />
            </Animated.View>
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