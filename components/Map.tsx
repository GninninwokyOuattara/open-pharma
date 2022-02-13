import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import useLocation from "../hooks/useLocation";

import LoadingSpinner from "./LoadingSpinner";
import UserPositionMarker from "./UserPositionMarker";
import { Pharmacy } from "../types/dataTypes";

interface props {
    pharmaciesData?: Pharmacy[];
}

const Map: React.FC<props> = ({ pharmaciesData }) => {
    const { location, errorMsg } = useLocation();

    if (!location) {
        return <LoadingSpinner />;
    }

    if (pharmaciesData) {
        console.log(pharmaciesData.length);
    } else {
        console.log("Notheng");
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
                <Marker
                    key={1000}
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={"My marker"}
                />
                {pharmaciesData &&
                    pharmaciesData.map((pharmacyData, index) => {
                        const [latitude, longitude] =
                            pharmacyData.Position.split(",").map(
                                (coord) => +coord
                            );
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: latitude,
                                    longitude: -longitude,
                                }}
                                pinColor={"black"}
                                onPress={() => console.log(pharmacyData.Nom)}
                            />
                        );
                    })}
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
