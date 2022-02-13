import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import useAxios from "axios-hooks";

import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";

import Map from "./components/Map";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import pharmaciesReducer from "./stores/pharmaciesReducer";

export default function App() {
    const rootReducers = combineReducers({
        pharmacies: pharmaciesReducer,
    });

    const store = createStore(rootReducers);

    return (
        <View style={styles.container}>
            <Provider store={store}>
                <StatusBar style="auto" />
                <Map></Map>
            </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
