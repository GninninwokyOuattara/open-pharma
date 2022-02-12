import { View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import useLocation from "../hooks/useLocation";

import LoadingSpinner from "./LoadingSpinner";

const Map = () => {
    const { location, errorMsg } = useLocation();

    if (!location) {
        return <LoadingSpinner />;
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fce",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default Map;
