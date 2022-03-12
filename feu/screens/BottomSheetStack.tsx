import { createStackNavigator } from "@react-navigation/stack";

import Screen2 from "./dummyScreen/Screen2";
import Screen1 from "./dummyScreen/Screen1";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import BottomSheetContent from "./BottomSheetContent";

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
                    component={BottomSheetContent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Information"
                    component={Screen2}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default BottomSheetStack;
