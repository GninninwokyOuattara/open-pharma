import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import usePharmaciesData from "../hooks/usePharmaciesData";
import PharmaItem from "../components/PharmaItem";

const BottomSheetContent = () => {
    const pharmaciesDatas = usePharmaciesData();

    return (
        <ScrollView style={styles.bottomSheetContainer}>
            {pharmaciesDatas.length !== 0 ? (
                pharmaciesDatas.map((pharmacie, index) => {
                    // const pharmaciePosition = `${location?.coords.latitude}, ${location?.coords.longitude}`;
                    // const distance = calculateDistance(
                    //     pharmaciePosition,
                    //     pharmacie.Localisation
                    // );
                    return (
                        <PharmaItem
                            key={index}
                            imageUrl={
                                "https://img.freepik.com/free-vector/pharmacy-building-isolated-white_180264-152.jpg?w=740"
                            }
                            data={{
                                pharmacyName: pharmacie.Nom,
                                pharmacyLocation: pharmacie.Localisation,
                                distance: pharmacie.Distance,
                            }}
                        />
                    );
                })
            ) : (
                <Text>Fetching...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "grey",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
    bottomSheetContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
});
export default BottomSheetContent;
