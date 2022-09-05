import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useContext, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLOR_SCHEME } from "../../constants/colorSchemes";
import { BottomSheetRefContext } from "../../contexts/BottomSheetRefContext";
import { MapContext, MapContextType } from "../../contexts/MapContext";
import BottomsheetStackNavigator from "./bottomsheet-navigation/BottomsheetStackNavigator";

const MainBottomSheet = () => {
    // ref
    // const bottomSheetRef = useRef<BottomSheet>(null);
    const { bottomSheetRef } = useContext(BottomSheetRefContext)
    const { mapRef, setMapPadding } = useContext(MapContext) as MapContextType;

    // variables
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => [24, "50%", "100%"], []);

    // MapPadding Manager


    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if (setMapPadding) {

            // if (!index) {
            //     setMapPadding({ top: 0, left: 0, right: 0, bottom: 0 })
            // } else {
            //     console.log("Incresing mapPadding")
            //     // mapRef?.current?.animate([{"latitude": 5.376891458495003,
            //     // "latitudeDelta": 0.09220246288836087,
            //     // "longitude": -4.006000533699989,
            //     // "longitudeDelta": 0.04276916384697005, }], { edgePadding: { top: 0, left: 0, right: 0, bottom: 0 }, animated: true })
            //     mapRef?.current?.animateToRegion({
            //         "latitude": 5.376891458495003,
            //         "latitudeDelta": 0.09220246288836087,
            //         "longitude": -4.006000533699989,
            //         "longitudeDelta": 0.04276916384697005
            //     }, 1000)
            // }
        }

    }, []);

    // renders

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            topInset={insets.top + 110}
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
