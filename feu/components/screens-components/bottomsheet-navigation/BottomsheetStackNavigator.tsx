import { createStackNavigator } from "@react-navigation/stack";

import InformationScreen from "./bottomsheet-screens/InformationScreen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import PharmaciesScreen from "./bottomsheet-screens/PharmaciesScreen";

const Stack = createStackNavigator();

function BottomSheetStack() {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: "transparent",
        },
    };

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
                screenOptions={{
                    cardStyle: {
                        flex: 1,
                        backgroundColor: "transparent",
                    },
                }}
            >
                <Stack.Screen
                    name="Pharmacies"
                    component={PharmaciesScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Information"
                    component={InformationScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default BottomSheetStack;
