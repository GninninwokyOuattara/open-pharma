import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Button, View, StyleSheet } from "react-native";
import RootStack from "./navigator/NavigatorTwo";

const NavigatorExample = () => {
    // hooks
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        // eslint-disable-next-line no-console
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);
    const handleExpandPress = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const handleCollapsePress = useCallback(() => {
        bottomSheetRef.current?.collapse();
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    // renders
    return (
        <View style={styles.container}>
            <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
            <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
            <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
            <Button title="Expand" onPress={() => handleExpandPress()} />
            <Button title="Collapse" onPress={() => handleCollapsePress()} />
            <Button title="Close" onPress={() => handleClosePress()} />
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                animateOnMount={true}
                onChange={handleSheetChange}
            >
                {/* <Navigator /> */}
                <RootStack />
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
});

export default NavigatorExample;
