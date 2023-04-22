import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';


interface props {
    color?: "default" | "orange" | "green"
}

const SpinningDashedCircle: React.FC<props> = ({ color }) => {

    color = color || "default"
    const imgSource = color === "default"
        ? require("../../assets/dashedCircle.png")
        : color === "orange"
            ? require("../../assets/dashedCircleOrange.png")
            : require("../../assets/dashedCircleGreen.png")
    const rotation = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });


    useEffect(() => {
        rotation.value = withRepeat(withTiming(360,
            {
                duration: 1500,
                easing: Easing.linear,
            }), -1, false)

    }, [])


    return (
        <>
            <Animated.View style={[animatedStyle]}>

                <Image source={imgSource} />

            </Animated.View>
        </>
    )
}

export default SpinningDashedCircle