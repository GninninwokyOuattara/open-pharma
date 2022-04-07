import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Pharmacy, RootReducerType } from "../types/dataTypes";
import PharmaItemLite from "../components/screens-components/bottomsheet-components/PharmaItemLite";
import CustomSearchBar from "../components/screens-components/bottomsheet-components/CustomSearchBar";

const LocationDeniedScreen = () => {
    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });

    const renderPharmaciesItems = useCallback(
        ({ item }: { item: Pharmacy }) => {
            return (
                <PharmaItemLite
                    key={item.Id}
                    data={{
                        id: item.Id,
                        pharmacyName: item.Nom,
                        status: parseInt(item.Id) % 2 ? "Ouvert" : "Fermé",
                    }}
                />
            );
        },
        [pharmaciesDatas]
    );

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={<CustomSearchBar />}
                data={pharmaciesDatas}
                keyExtractor={(item) => item.Id}
                renderItem={renderPharmaciesItems}
                contentContainerStyle={styles.contentContainer}
            ></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // backgroundColor: "grey",
    },
    contentContainer: {
        paddingHorizontal: 10,
    },
});

export default LocationDeniedScreen;
