import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import useLocation from "../hooks/useLocation";

import LoadingSpinner from "./LoadingSpinner";
import UserPositionMarker from "./UserPositionMarker";
import { Pharmacy } from "../types/dataTypes";
import { LocationObject } from "expo-location";
import usePharmaciesData from "../hooks/usePharmaciesData";

interface props {
    setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map: React.FC<props> = ({ setIsMapLoaded }) => {
    const { location, errorMsg } = useLocation();
    const pharmaciesDatas = usePharmaciesData();

    if (!location) {
        return <LoadingSpinner />;
    }

    return (
        <MapView
            onMapLoaded={() => setIsMapLoaded(true)}
            style={styles.map}
            initialRegion={{
                latitude: 5.393620594067611 || location.coords.latitude,
                longitude: -4.005658558941592 || location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
        >
            <Marker
                key={1000}
                coordinate={{
                    latitude: 5.393620594067611 || location.coords.latitude,
                    longitude: -4.005658558941592 || location.coords.longitude,
                }}
                title={"My marker"}
            />
            {pharmaciesDatas &&
                pharmaciesDatas.map((pharmacyData, index) => {
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
