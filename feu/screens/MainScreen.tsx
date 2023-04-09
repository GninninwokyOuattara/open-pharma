import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";


import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";
import { UserLocationContext } from "../contexts/UserLocationContext";
import { RootReducerType } from "../types/dataTypes";

import Map from "../components/screens-components/Map";

import MainBottomSheet from "../components/screens-components/BottomSheet";
import ToolBar from "../components/ToolBar";
import { MapContext } from "../contexts/MapContext";
import useInitializer from "../hooks/useInitializer";
import { getOpenPharmaPharmaciesDatas } from "../stores/pharmaciesActions";

import * as Location from "expo-location";



const MainScreen = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { location } = useContext(UserLocationContext)
    const { setIsFetching } = useContext(MapContext)
    const pharmacies = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplayInBottomSheet;
    });
    const isLococationPermissionGranted = useSelector((state: RootReducerType) => {
        return state.pharmacies.isLocationPermissionGranted;
    });
    const [isProximityMode, setIsProximityMode] = useState<boolean>(false);
    const distanceCalculatorIntervalId = useRef<number | null>(null)

    const { init } = useInitializer()


    // On launch, retrieve data from database if exist otherwise from firebase
    // useEffect(() => {
    //     // if(setIsFetching){}
    //     (async () => {
    //         await init()
    //     }
    //     )()
    // }, [])


    // const proximityCalculationDispatcher = useCallback(() => {

    //     let intervalId = setInterval(() => {
    //         dispatch(calculatePharmaciesProximityToUser(location, pharmaciesDatas, isProximityMode))

    //     }, 5000)

    //     return intervalId
    // }, [location, pharmaciesDatas, isProximityMode])



    // Location Updater
    // useEffect(() => {
    //     // let intervalId: number
    //     // if (location) {
    //     //     intervalId = setInterval(() => {
    //     //         dispatch(calculatePharmaciesProximityToUser(location, pharmaciesDatas))
    //     //     }, 5000)
    //     // }

    //     // return () => {
    //     //     if (intervalId) clearInterval(intervalId)
    //     // }

    //     const intervalId = proximityCalculationDispatcher()

    //     return () => clearInterval(intervalId)


    // }, [proximityCalculationDispatcher])

    // useEffect(() => {
    //     if (location && pharmacies) {

    //         distanceCalculatorIntervalId.current = setInterval(() => {
    //             dispatch({
    //                 type: UPDATE_RELATIVE_DISTANCES,
    //                 data: location
    //             })
    //         }, 5000);

    //     }

    //     return () => {
    //         if (distanceCalculatorIntervalId) {
    //             clearTimeout(distanceCalculatorIntervalId.current!)
    //         }
    //     }
    // }, [pharmacies, location])


    React.useEffect(() => {
        console.log("Dispatch fetch current state")

        if (isLococationPermissionGranted) {
            Location.getCurrentPositionAsync({}).then((location) => {
                console.log("currentLocation is : ", location)
                dispatch(getOpenPharmaPharmaciesDatas(location))

            });

        } else {
            dispatch(getOpenPharmaPharmaciesDatas(null))
        }



    }, [])


    return (

        <View
            style={{
                flex: 1,
            }}
        >
            {/* <Map setIsMapLoaded={setIsMapLoaded} />
            {isMapLoaded ? <MainBottomSheet /> : null} */}
            <Map setIsMapLoaded={setIsMapLoaded} />

            <MainBottomSheet />
            <BottomBar />

            {/* SearchBar */}
            <ToolBar {...{ setIsProximityMode }} />


        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomSheetContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
});

export default MainScreen;


