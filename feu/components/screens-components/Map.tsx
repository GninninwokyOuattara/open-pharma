import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import useLocation from "../../hooks/useLocation";

import LoadingSpinner from "../utility-components/LoadingSpinner";
import UserPositionMarker from "../utility-components/UserPositionMarker";
import { Pharmacy, RootReducerType } from "../../types/dataTypes";
import { LocationObject } from "expo-location";
import usePharmaciesData from "../../hooks/usePharmaciesData";
import { MapContext, MapContextType } from "../../contexts/MapContext";
import { UserLocationContext } from "../../contexts/UserLocationContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocalPharmaciesData } from "../../stores/pharmaciesActions";

interface props {
    setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map: React.FC<props> = ({ setIsMapLoaded }) => {
    const { location, errorMsg } = useContext(UserLocationContext);
    const { mapRef, selectedMarker } = useContext(MapContext);

    const dispatch = useDispatch();
    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });

    return (
        <MapView
            ref={mapRef}
            onMapLoaded={() => setIsMapLoaded(true)}
            style={styles.map}
            initialRegion={{
                latitude: location?.coords.latitude || 5.393620594067611,
                longitude: location?.coords.longitude || -4.005658558941592,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            // showsMyLocationButton={true}
            // mapPadding={{ top: 0, right: 0, bottom: 50, left: 0 }}
        >
            {/* <Marker
                key={1000}
                coordinate={{
                    latitude: location?.coords.latitude || 5.393620594067611,
                    longitude: location?.coords.longitude || -4.005658558941592,
                }}
                title={"My marker"}
            /> */}
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
                            pinColor={
                                pharmacyData.Id == selectedMarker
                                    ? "green"
                                    : "black"
                            }
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
