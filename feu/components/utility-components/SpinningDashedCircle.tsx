import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';


const SpinningDashedCircle = () => {
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




    // let rotation = new Animated.Value(200);
    // let rotate = rotation.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [360, 0]
    // })

    // const animatedStyle = [{
    //     transform: [{ rotateZ: `${rotate}deg` }]
    // }]


    // useEffect(() => {

    //     Animated.loop(Animated.timing(
    //         rotation,
    //         {
    //             toValue: 0,
    //             duration: 3000,
    //             easing: Easing.linear,
    //             useNativeDriver: true
    //         }
    //     )).start()
    // }, [rotation])


    return (
        <>
            <Animated.View style={[animatedStyle]}>

                <Image source={require("../../assets/dashedCircle.png")} />

            </Animated.View>
        </>
    )
}

export default SpinningDashedCircle