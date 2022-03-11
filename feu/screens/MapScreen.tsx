import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

import Map from "../components/Map";
import PharmaItem from "../components/PharmaItem";

import { useSelector, useDispatch } from "react-redux";
import {
    calculateRelativeDistances,
    fetchAllPharmacies,
    fetchLocalPharmaciesData,
} from "../stores/pharmaciesActions";

import { RootReducerType } from "../types/dataTypes";
import useLocation from "../hooks/useLocation";
import { calculateDistance } from "../utils/calculateDistance";
import SkeletonContent from "react-native-skeleton-content";
import MainBottomSheet from "./MainBottomSheet";

const MapScreen = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    return (
        <React.Fragment>
            <Map setIsMapLoaded={setIsMapLoaded} />
            {isMapLoaded && console.log("Map is Loaded")}
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

export default MapScreen;
