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

    // if (userPosition && pharmacies) {
    //     pharmacies.map((pharmacie) => {
    //         // THIS WILL NEED TO BE REFACTORED AS IT IS ONLY USED BECAUSE CURRETLY FROM FIREBASE THE LOCATION DATA ARE INCORRECT, SO I GO THROUGH ALL THIS JUST TO HAVE SOMETHING TO WORK WITH
    //         let positionArray = pharmacie.Position.split(",").map((e) =>
    //             e.trim()
    //         );
    //         positionArray[1] = "-" + positionArray[1];
    //         let pharmaciePosition = positionArray.join(",");
    //         console.log(calculateDistance(userPosition, pharmaciePosition));
    //         return {
    //             ...pharmacie,
    //             Distance: calculateDistance(userPosition, pharmaciePosition),
    //         };
    //     });
    // }

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
            {/* {pharmacies && <Text>Hello World</Text>} */}
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

                        {/* {[1].map(() => {
                            const userPosition = `${location?.coords.latitude}, ${location?.coords.longitude}`;
                            const pharmaciePosition =
                                pharmacies[1].Position.split(",").map((e) =>
                                    e.trim()
                                );
                            pharmaciePosition[1] = "-" + pharmaciePosition[1];
                            const pharmaciePos = pharmaciePosition.join(",");
                            const distance = calculateDistance(
                                userPosition,
                                pharmaciePos
                            );
                            console.log("User Position ; ", userPosition);
                            console.log("Pharmaci Position : ", pharmaciePos);
                            // console.log(pharmacies[0].Position);
                            // console.log(userPosition);
                            // console.log(distance);
                            // const distance = 111;
                            return (
                                <PharmaItem
                                    key={1}
                                    imageUrl={
                                        "https://img.freepik.com/free-vector/pharmacy-building-isolated-white_180264-152.jpg?w=740"
                                    }
                                    data={{
                                        pharmacyName: "Test",
                                        pharmacyLocation: "Non loin de test",
                                    }}
                                    distance={distance}
                                />
                            );
                        })} */}
                        {/* <PharmaItem
                            data={{
                                pharmacyName: " TEst",
                                pharmacyLocation: " Non loin de tst",
                                distance: pharmacies[1].Distance,
                            }}
                            imageUrl="https://img.freepik.com/free-vector/pharmacy-building-isolated-white_180264-152.jpg?w=740"
                        /> */}
                        {/* <PharmaItem />
                        <PharmaItem />
                        <PharmaItem />
                        <PharmaItem />
                        <PharmaItem /> */}
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
