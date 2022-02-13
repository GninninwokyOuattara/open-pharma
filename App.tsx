import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import useAxios from "axios-hooks";

import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";

import Map from "./components/Map";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { Provider } from "react-redux";
import pharmaciesReducer from "./stores/pharmaciesReducer";
import MapScreen from "./screens/MapScreen";

export default function App() {
    const rootReducers = combineReducers({
        pharmacies: pharmaciesReducer,
    });

    const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Provider store={store}>
                {/* <Map></Map> */}
                <MapScreen />
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
