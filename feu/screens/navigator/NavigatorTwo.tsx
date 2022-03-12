import {
    createStackNavigator,
    StackNavigationOptions,
    TransitionPresets,
} from "@react-navigation/stack";
import MainBottomSheet from "../bs/MainBottomSheet";
import SecondaryBottomSheet from "../bs/SecondaryBottomSheet";
import BottomSheetContent from "../bs/BottomSheetContent";
import React, { useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

function BottomSheetStackNavigator() {
    const screenOptions = useMemo<StackNavigationOptions>(
        () => ({
            ...TransitionPresets.SlideFromRightIOS,

            // headerShown: true,
            safeAreaInsets: { top: 0 },
            cardStyle: {
                backgroundColor: "#F0ECD6",
                overflow: "hidden",
            },
        }),
        []
    );

    const screenPharmaciesOptions = useMemo(
        () => ({ headerLeft: () => null, headerShown: false }),
        []
    );
    const screenInformationOptions = useMemo(
        () => ({ headerLeft: () => null, headerShown: false }),
        []
    );
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen
                    name="Pharmacies"
                    options={screenPharmaciesOptions}
                    component={BottomSheetContent}
                />
                <Stack.Screen
                    name="Information"
                    options={screenInformationOptions}
                    component={SecondaryBottomSheet}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default BottomSheetStackNavigator;
