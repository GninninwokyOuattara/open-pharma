import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import useAxios from "axios-hooks";

import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";

import Map from "./components/screens-components/Map";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { Provider } from "react-redux";
import pharmaciesReducer from "./stores/pharmaciesReducer";
import MainScreen from "./screens/MainScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as Location from "expo-location";
import AppLoading from "expo-app-loading";

export default function App() {
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    const [location, setLocation] =
        React.useState<Location.LocationObject | null>(null);
    const [isReady, setIsReady] = React.useState(false);

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            setIsReady(true);

            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setIsReady(true);
    };

    const rootReducers = combineReducers({
        pharmacies: pharmaciesReducer,
    });

    const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

    React.useEffect(() => {
        getLocationPermission();
    }, []);

    if (!isReady) {
        return <AppLoading />;
    } else {
        if (!location) {
            return (
                <View style={styles.container}>
                    <Text>Location Permission not provided</Text>
                </View>
            );
        }
        return (
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <Provider store={store}>
                    <MainScreen />
                </Provider>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fee",
        alignItems: "center",
        justifyContent: "center",
    },
});
