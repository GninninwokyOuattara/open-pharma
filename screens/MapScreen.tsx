import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import Map from "../components/Map";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPharmacies } from "../stores/pharmaciesActions";

const MapScreen = () => {
    const dispatch = useDispatch();
    const pharmacies = useSelector((state: any) => {
        return state.pharmacies.all;
    });

    useEffect(() => {
        dispatch(fetchAllPharmacies());
    }, [dispatch]);

    return <Map pharmaciesData={pharmacies} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default MapScreen;
