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

export default function App() {
    const rootReducers = combineReducers({
        pharmacies: pharmaciesReducer,
    });

    const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <Provider store={store}>
                <MainScreen />
            </Provider>
        </SafeAreaProvider>
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
