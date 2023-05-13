import React from "react";
import { StyleSheet, View } from "react-native";

interface DotProps {
    color?: "string";
    size?: number;
}

const Dot: React.FC<{ color?: string, dotSize?: number }> = ({ color, dotSize }) => {


    // animate();

    return (
        <>
            <View style={styles.container}>
                <View
                    style={{ ...styles.dot, backgroundColor: color || "blue", height: dotSize || 10, width: dotSize || 10 }}
                ></View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 50,
        // marginLeft: 50,
        // alignSelf: "flex-start",
        alignItems: "center",
        justifyContent: "center",
        height: 20,
        width: 20,
    },
    dot: {
        width: 10,
        height: 10,
        // backgroundColor: "blue",
        borderRadius: 50,
        position: "absolute",
    },

    btn: {
        marginTop: 20,
    },
});

export default Dot;
