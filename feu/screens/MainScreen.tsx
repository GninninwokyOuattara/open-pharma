import React, { useCallback, useContext, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";


import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";
import { UserLocationContext } from "../contexts/UserLocationContext";
import { RootReducerType } from "../types/dataTypes";


import MainBottomSheet from "../components/screens-components/BottomSheet";
import ToolBar from "../components/ToolBar";
import { MapContext } from "../contexts/MapContext";
import useInitializer from "../hooks/useInitializer";
import { getOpenPharmaPharmaciesDatas } from "../stores/pharmaciesActions";

import * as Location from "expo-location";
import { UPDATE_RELATIVE_DISTANCES } from "../stores/actions";



const MainScreen = () => {
    const insets = useSafeAreaInsets();

    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [isProximityMode, setIsProximityMode] = useState<boolean>(false);

    const updatePharmaciesDistancesIntervalId = useRef<number | null>(null)


    const dispatch = useDispatch();
    const pharmacies = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplayInBottomSheet;
    });
    const isLococationPermissionGranted = useSelector((state: RootReducerType) => {
        return state.pharmacies.isLocationPermissionGranted;
    });

    const { location } = useContext(UserLocationContext)
    const { setIsFetching } = useContext(MapContext)

    const { init } = useInitializer()




    const dispatchUpdatePharmaciesDistancestoUser = useCallback(() => {
        if (!isLococationPermissionGranted) {
            return
        }

        Location.getCurrentPositionAsync({}).then((location) => {
            dispatch({
                type: UPDATE_RELATIVE_DISTANCES,
                data: location
            })
        })
    }, [isLococationPermissionGranted, dispatch])


    React.useEffect(() => {

        if (isLococationPermissionGranted) {
            Location.getCurrentPositionAsync({}).then((location) => {
                dispatch(getOpenPharmaPharmaciesDatas(location))

            });

        } else {
            dispatch(getOpenPharmaPharmaciesDatas(null))
        }



    }, [])

    // useEffect(() => {
    //     if (isLococationPermissionGranted) {
    //         updatePharmaciesDistancesIntervalId.current = setInterval(() => {

    //             dispatchUpdatePharmaciesDistancestoUser()

    //         }, 10000)
    //     }

    //     return () => {
    //         if (updatePharmaciesDistancesIntervalId.current) {
    //             clearInterval(updatePharmaciesDistancesIntervalId.current)
    //         }
    //     }

    // }, [isLococationPermissionGranted, dispatchUpdatePharmaciesDistancestoUser])

    console.log("RERENDER PARENT")




    return (

        <View
            style={{
                flex: 1,
            }}
        >

            {/* <Map setIsMapLoaded={setIsMapLoaded} /> */}

            <MainBottomSheet />
            <BottomBar />

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


