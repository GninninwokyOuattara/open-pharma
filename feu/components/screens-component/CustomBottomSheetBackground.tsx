import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";

const CustomBottomSheetBackground: React.FC<BottomSheetBackgroundProps> = ({
    style,
    animatedIndex,
}) => {
    const containerStyle = useMemo(() => [style, styles.container], [style]);

    return (
        <BlurView
            style={[
                containerStyle,
                {
                    // borderColor: "#F0ECD6",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderTopWidth: 2,
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                },
            ]}
            intensity={7}
        ></BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "orange",
        // opacity: 0.1,
    },
});

export default CustomBottomSheetBackground;
