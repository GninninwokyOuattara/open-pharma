import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import usePharmaciesData from "../../hooks/usePharmaciesData";
import PharmaItem from "../../components/PharmaItem";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Pharmacy } from "../../types/dataTypes";
import CustomSearchBar from "../CustomSearchBar";
import { FlatList } from "react-native-gesture-handler";

const SecondaryBottomSheet = () => {
    return <Text>Hello World</Text>;
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
export default SecondaryBottomSheet;
