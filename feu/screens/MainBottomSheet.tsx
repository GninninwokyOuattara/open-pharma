import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import usePharmaciesData from "../hooks/usePharmaciesData";
import PharmaItem from "../components/PharmaItem";
import { calculateDistance } from "../utils/calculateDistance";
import BottomSheetContent from "./BottomSheetContent";

const MainBottomSheet = () => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["10%", "25%", "50%", "90%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    // renders
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            handleStyle={{
                backgroundColor: "orange",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
            }}
        >
            <BottomSheetContent />
        </BottomSheet>
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

export default MainBottomSheet;
