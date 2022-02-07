import * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import useAxios from "axios-hooks";

import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";

export default function App() {
    console.log(PROJECT_ENDPOINT, ALL_PHARMACIES);
    const [{ data, loading, error }, refetch] = useAxios(
        { url: `${PROJECT_ENDPOINT}${ALL_PHARMACIES}.json`, method: "GET" },
        {
            manual: true,
        }
    );
    React.useEffect(() => {
        refetch();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text>Open up App.tsx to start working on your app!!</Text>
            <Button
                onPress={() => refetch()}
                title="Click Me"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
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
