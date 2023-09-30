import React from "react";
import { StyleSheet, View } from "react-native";


import { useDispatch } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";


import MainBottomSheet from "../components/screens-components/BottomSheet";
import { getOpenPharmaPharmaciesDatas } from "../stores/pharmaciesActions";

import ToolBar from "../components/ToolBar";
import AppMap from "../components/screens-components/AppMap";



const MainScreen = () => {

    const dispatch = useDispatch();



    React.useEffect(() => {
        dispatch(getOpenPharmaPharmaciesDatas(null));
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


