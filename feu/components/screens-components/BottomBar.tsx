import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLOR_SCHEME } from "../../constants/colorSchemes";

const BottomBar = () => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                backgroundColor: COLOR_SCHEME.LIGHT_ORANGE,
                height: insets.bottom,
                width: "100%",
                position: "absolute",
                bottom: 0,
            }}
        ></View>
    );
};

export default BottomBar;
