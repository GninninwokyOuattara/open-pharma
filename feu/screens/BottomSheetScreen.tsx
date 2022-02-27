import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const BottomSheetScreen = () => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["10%", "25%", "50%", "100%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    // renders
    return (
        // <View style={styles.container}>
        <SafeAreaView style={styles.container}>
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
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
        </SafeAreaView>
        // </View>
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
});

export default BottomSheetScreen;
