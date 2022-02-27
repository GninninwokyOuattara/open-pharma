import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import useLocation from "../hooks/useLocation";

import LoadingSpinner from "./LoadingSpinner";
import UserPositionMarker from "./UserPositionMarker";
import { Pharmacy } from "../types/dataTypes";
import { LocationObject } from "expo-location";

interface props {
    pharmaciesData?: Pharmacy[];
    location: LocationObject | null;
    setIsMapReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map: React.FC<props> = ({ pharmaciesData, location, setIsMapReady }) => {
    // const { location, errorMsg } = useLocation();

    if (!location) {
        return <LoadingSpinner />;
    }

    if (pharmaciesData) {
        console.log(pharmaciesData.length);
    } else {
        console.log("Notheng");
    }

    return (
        <MapView
            onMapReady={() => setIsMapReady(true)}
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
                    const [latitude, longitude] = pharmacyData.Position.split(
                        ","
                    ).map((coord) => +coord);
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: latitude,
                                longitude: -longitude,
                            }}
                            pinColor={"black"}
                            onPress={() => console.log(pharmacyData.Position)}
                        />
                    );
                })}
        </MapView>
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
