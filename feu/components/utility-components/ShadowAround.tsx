import React from "react";
import { StyleSheet, View } from "react-native";

interface shadowStyle {
    shadowColor?: string;
    shadowOffset?: {
        width: number;
        height: number;
    };
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
}

interface props {
    children: React.ReactNode;
    shadowStyles?: shadowStyle;
}

const ShadowAround: React.FC<props> = ({ children, shadowStyles }) => {
    return (
        <View style={{ ...styles.container, ...shadowStyles }}>{children}</View>
    );
};

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.0)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
});

export default ShadowAround;
