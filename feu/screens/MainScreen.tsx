import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

import Map from "../components/screens-components/Map";

import MainBottomSheet from "../components/screens-components/BottomSheet";

const MainScreen = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    return (
        <React.Fragment>
            <Map setIsMapLoaded={setIsMapLoaded} />
            <MainBottomSheet />
        </React.Fragment>
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
