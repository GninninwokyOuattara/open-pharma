import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

import useAxios from "axios-hooks";

import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";

import Map from "./components/Map";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { Provider } from "react-redux";
import pharmaciesReducer from "./stores/pharmaciesReducer";
import MapScreen from "./screens/MapScreen";
import BottomSheetScreen from "./screens/BottomSheetScreen";

export default function App() {
    const rootReducers = combineReducers({
        pharmacies: pharmaciesReducer,
    });

    const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Provider store={store}>
                <MapScreen />
            </Provider>
        </SafeAreaView>
        // <SafeAreaView style={styles.container}>
        //     <StatusBar style="auto" />
        //     <BottomSheetScreen />
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fee",
        // alignItems: "center",
        // justifyContent: "center",
    },
});
