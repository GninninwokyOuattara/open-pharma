import { View, Text, StyleSheet } from "react-native";
import React from "react";
import usePharmaciesData from "../hooks/usePharmaciesData";
import PharmaItem from "../components/PharmaItem";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Pharmacy } from "../types/dataTypes";

const BottomSheetContent = () => {
    const pharmaciesDatas = usePharmaciesData();

    const renderPharmaciesItems = ({ item }: { item: Pharmacy }) => {
        console.log("Rendered using renderer :)");
        return (
            <PharmaItem
                key={item.Id}
                imageUrl={
                    "https://img.freepik.com/free-vector/pharmacy-building-isolated-white_180264-152.jpg?w=740"
                }
                data={{
                    pharmacyName: item.Nom,
                    pharmacyLocation: item.Localisation,
                    distance: item.Distance,
                }}
            />
        );
    };

    return (
        <BottomSheetFlatList
            data={pharmaciesDatas}
            keyExtractor={(item) => item.Id}
            renderItem={renderPharmaciesItems}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "grey",
    },
    contentContainer: {
        paddingHorizontal: 10,
    },
});
export default BottomSheetContent;
