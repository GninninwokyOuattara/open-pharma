import React from "react";
import { StyleSheet, View } from "react-native";


import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";
import { RootReducerType } from "../types/dataTypes";


import MainBottomSheet from "../components/screens-components/BottomSheet";
import { getOpenPharmaPharmaciesDatas } from "../stores/pharmaciesActions";

import * as Location from "expo-location";
import ToolBar from "../components/ToolBar";
import AppMap from "../components/screens-components/AppMap";



const MainScreen = () => {

    const dispatch = useDispatch();

    const isLococationPermissionGranted = useSelector((state: RootReducerType) => {
        return state.pharmacies.isLocationPermissionGranted;
    });



    React.useEffect(() => {

        if (isLococationPermissionGranted) {
            Location.getCurrentPositionAsync({}).then((location) => {
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


            <AppMap />
            <MainBottomSheet />
            <BottomBar />
            <ToolBar />


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


