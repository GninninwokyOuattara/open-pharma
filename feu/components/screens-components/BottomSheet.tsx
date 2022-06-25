import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLOR_SCHEME } from "../../constants/colorSchemes";
import { MapContext, MapContextType } from "../../contexts/MapContext";
import BottomsheetStackNavigator from "./bottomsheet-navigation/BottomsheetStackNavigator";

const MainBottomSheet = () => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { mapRef } = useContext(MapContext) as MapContextType;

    // variables
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => [24, "50%", "100%"], []);

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
            topInset={insets.top}
            bottomInset={insets.bottom}
            backgroundStyle={{ backgroundColor: "#F0ECD6", opacity: 0.9 }}
            keyboardBehavior="extend"
            handleStyle={{
                backgroundColor: COLOR_SCHEME.LIGHT_ORANGE,
            }}
        >
            {/* <BottomSheetContent /> */}
            <BottomsheetStackNavigator />
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
    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "grey",
        color: "white",
        textAlign: "center",
    },
});

export default MainBottomSheet;
