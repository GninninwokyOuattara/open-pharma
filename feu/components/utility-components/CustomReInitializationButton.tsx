import React, { useCallback, useContext } from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_SCHEME } from '../../constants/colorSchemes';
import { MapContext } from '../../contexts/MapContext';
import useInitializer from '../../hooks/useInitializer';
import { getOpenPharmaPharmaciesDatas } from '../../stores/pharmaciesActions';
import { RootReducerType } from '../../types/dataTypes';




const CustomReInitializationButton = () => {

    // Hooks
    const dispatch = useDispatch()
    const { init } = useInitializer()
    const { isFetching } = useContext(MapContext)
    const isLocationPermissionGranted = useSelector((state: RootReducerType) => state.pharmacies.isLocationPermissionGranted)
    const isLoading = useSelector((state: RootReducerType) => state.pharmacies.isLoading)


    const handleClick = useCallback(() => {
        if (isLocationPermissionGranted) {
            return Location.getCurrentPositionAsync({}).then((location) => {
                return dispatch(getOpenPharmaPharmaciesDatas(location))
            })
        }
        return dispatch(getOpenPharmaPharmaciesDatas(null));
    }, [isLocationPermissionGranted, dispatch])


    let spinValue = new Animated.Value(0);

    const spinningAnimation = Animated.loop(Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        }
    ))

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    if (isLoading) {
        spinningAnimation.start()
    } else {
        spinningAnimation.stop()
    }


    return (

        <TouchableOpacity
            onPress={() => handleClick()
            }
            disabled={!!isLoading}
        >
            <Animated.View style={{ ...styles.iconContainer, transform: [{ rotate: spin }], backgroundColor: isLoading ? "gray" : COLOR_SCHEME.LIGHT_ORANGE }}>

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
        marginHorizontal: 3,
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