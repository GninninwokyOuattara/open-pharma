import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { PROJECT_ENDPOINT } from "@env";

export default function App() {
    console.log(PROJECT_ENDPOINT);
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!!</Text>
            <StatusBar style="auto" />
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
