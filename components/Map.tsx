import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import useLocation from "../hooks/useLocation";

import LoadingSpinner from "./LoadingSpinner";
import UserPositionMarker from "./UserPositionMarker";

const Map = () => {
    const { location, errorMsg } = useLocation();

    if (!location) {
        return <LoadingSpinner />;
    }

    if (errorMsg) {
        console.log(errorMsg);
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
                provider={PROVIDER_GOOGLE}
            >
                {/* <Marker
                    key={1}
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={"My marker"}
                /> */}
                <UserPositionMarker
                    {...{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                />
            </MapView>
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
