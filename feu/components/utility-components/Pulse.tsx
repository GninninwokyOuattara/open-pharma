import React, { useEffect } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

interface PulseProps {
    color?: "string";
    size?: number;
}

const Pulse: React.FC<{ color?: string, dotSize?: number }> = ({ color, dotSize }) => {
    let opacity = new Animated.Value(1);

    // const animate = () => {

    // };

    const size = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    });

    const animatedStyles = [
        styles.dot,
        { backgroundColor: color || "blue" },
        {
            opacity,
            width: size,
            height: size,
        },
    ];

    useEffect(() => {
        opacity.setValue(0);
        Animated.loop(
            Animated.timing(opacity, {
                useNativeDriver: false,
                toValue: 0,
                duration: 1000,
                easing: Easing.ease,
            })
        ).start();
    }, [opacity]);

    // animate();

    return (
        <>
            <View style={styles.container}>
                <Animated.View style={animatedStyles} />
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

export default Pulse;
