import { View, Text, StyleSheet, Button } from "react-native";
import React, { useCallback } from "react";
import usePharmaciesData from "../../hooks/usePharmaciesData";
import PharmaItem from "../../components/PharmaItem";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Pharmacy } from "../../types/dataTypes";
import CustomSearchBar from "../CustomSearchBar";
import { FlatList } from "react-native-gesture-handler";

const BottomSheetContent: React.FC<any> = ({ navigation }) => {
    const pharmaciesDatas = usePharmaciesData();

    const renderPharmaciesItems = useCallback(
        ({ item }: { item: Pharmacy }) => {
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
        },
        [pharmaciesDatas]
    );

    return (
        <>
            {/* <Button
                title="Click me"
                onPress={() => navigation.navigate("ScrollView Screen")}
            /> */}
            <FlatList
                ListHeaderComponent={<CustomSearchBar />}
                data={pharmaciesDatas}
                keyExtractor={(item) => item.Id}
                renderItem={renderPharmaciesItems}
                contentContainerStyle={styles.contentContainer}
            ></FlatList>
        </>
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
