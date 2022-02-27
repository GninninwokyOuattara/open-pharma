import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

import Map from "../components/Map";
import PharmaItem from "../components/PharmaItem";

import { useSelector, useDispatch } from "react-redux";
import {
    calculateRelativeDistances,
    fetchAllPharmacies,
} from "../stores/pharmaciesActions";

import { RootReducerType } from "../types/dataTypes";
import useLocation from "../hooks/useLocation";
import { calculateDistance } from "../utils/calculateDistance";

const MapScreen = () => {
    const [isMapReady, setIsMapReady] = useState(false);
    const { location, errorMsg } = useLocation();
    const userPosition = useMemo(() => {
        if (location) {
            return `${location?.coords.latitude}, ${location?.coords.longitude}`;
        }
        return null;
    }, [location]);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["10%", "25%", "50%"], []);

    const dispatch = useDispatch();
    const pharmacies = useSelector((state: RootReducerType) => {
        return state.pharmacies.all;
    });

    useEffect(() => {
        dispatch(fetchAllPharmacies());
    }, [dispatch]);

    useEffect(() => {
        if (userPosition && pharmacies) {
            console.log(
                "User Position and Pharmacies available, Calculating relative distances"
            );
            dispatch(calculateRelativeDistances(pharmacies, userPosition));
        }
    }, [userPosition, pharmacies, dispatch]);

    return (
        <React.Fragment>
            <Map
                pharmaciesData={pharmacies}
                location={location}
                {...{ setIsMapReady }}
            />
            {pharmacies.length !== 0 && isMapReady ? (
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                >
                    <ScrollView>
                        {pharmacies.map((pharmacie, index) => {
                            const pharmaciePosition = `${location?.coords.latitude}, ${location?.coords.longitude}`;
                            const distance = calculateDistance(
                                pharmaciePosition,
                                pharmacie.Localisation
                            );
                            return (
                                <PharmaItem
                                    key={index}
                                    imageUrl={
                                        "https://img.freepik.com/free-vector/pharmacy-building-isolated-white_180264-152.jpg?w=740"
                                    }
                                    data={{
                                        pharmacyName: pharmacie.Nom,
                                        pharmacyLocation:
                                            pharmacie.Localisation,
                                        distance: pharmacie.Distance,
                                    }}
                                />
                            );
                        })}
                    </ScrollView>
                </BottomSheet>
            ) : null}
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
});

export default MapScreen;
