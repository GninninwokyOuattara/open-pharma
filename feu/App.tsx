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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import * as Location from "expo-location";
import AppLoading from "expo-app-loading";
import LocationDeniedScreen from "./screens/LocationDeniedScreen";
import { COLOR_SCHEME } from "./constants/colorSchemes";
import Main from "./Main";

export default function App() {
    const rootReducers = combineReducers({
        pharmacies: pharmaciesReducer,
    });

    const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fee",
        alignItems: "center",
        justifyContent: "center",
    },
});
