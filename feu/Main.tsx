import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import useAxios from "axios-hooks";

import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";

import Map from "./components/screens-components/Map";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { Provider, useDispatch } from "react-redux";
import pharmaciesReducer from "./stores/pharmaciesReducer";
import MainScreen from "./screens/MainScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as Location from "expo-location";
import AppLoading from "expo-app-loading";
import LocationDeniedScreen from "./screens/LocationDeniedScreen";
import { COLOR_SCHEME } from "./constants/colorSchemes";
import {
    fetchAllPharmacies,
    fetchLocalPharmaciesData,
} from "./stores/pharmaciesActions";

const Main = () => {
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    const [location, setLocation] =
        React.useState<Location.LocationObject | null>(null);
    const [isReady, setIsReady] = React.useState(false);

    const dispatch = useDispatch();

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

    React.useEffect(() => {
        (async () => {
            // let e = await dispatch(fetchLocalPharmaciesData(location));
            try {
                await dispatch(fetchAllPharmacies());
                getLocationPermission();
            } catch (error) {
                console.log(error);
            }
        })();
    }, [dispatch, location]);

    if (!isReady) {
        return <AppLoading />;
    } else {
        if (!location) {
            return (
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: COLOR_SCHEME.LIGHT_ORANGE,
                    }}
                >
                    <LocationDeniedScreen />
                </SafeAreaView>
            );
        }
        return (
            <SafeAreaProvider>
                {/* <StatusBar style="auto" /> */}
                <MainScreen />
            </SafeAreaProvider>
        );
    }
};

export default Main;
