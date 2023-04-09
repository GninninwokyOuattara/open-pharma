import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

import { useDispatch, useSelector } from "react-redux";
import { MapContext } from "../../contexts/MapContext";
import { UserLocationContext } from "../../contexts/UserLocationContext";
import { RootReducerType } from "../../types/dataTypes";
import CustomMarker from "../CustomMarker";

interface props {
    setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map: React.FC<props> = ({ setIsMapLoaded }) => {
    const { location, errorMsg } = useContext(UserLocationContext);
    const { mapRef, selectedMarker, mapPadding, mapSetting, isFetching } = useContext(MapContext);


    const dispatch = useDispatch();
    const pharmacies = useSelector((state: RootReducerType) => {
        return state.pharmacies.pharmacies;
    });
    const displayMode = useSelector((state: RootReducerType) => {
        return state.pharmacies.displayMode;
    });

    let pharmaciesToDisplay = pharmacies
    if (displayMode === "OpenOnly") {
        // Filter to display only open pharmacies
        pharmaciesToDisplay = pharmacies.filter(pharmacy => pharmacy.open)
    }


    return (
        <MapView
            ref={mapRef}
            onMapLoaded={() => setIsMapLoaded(true)}
            style={styles.map}

            initialRegion={(() => {

                if (location) {

                    return {
                        latitude: location.coords.latitude - mapSetting.lat,
                        longitude: location.coords.longitude - mapSetting.lng,
                        latitudeDelta: mapSetting.latDelta,
                        longitudeDelta: mapSetting.lngDelta,
                    }
                } else {
                    if (pharmaciesToDisplay.length) {

                        const pharmacy = pharmacies[0]
                        return {
                            latitude: +pharmacy.latitude - mapSetting.lat,
                            longitude: +pharmacy.coordinates.longitude - mapSetting.lng,
                            latitudeDelta: mapSetting.latDelta,
                            longitudeDelta: mapSetting.lngDelta,
                        }
                    }
                }
            })()}
            provider={PROVIDER_DEFAULT}
            showsUserLocation={true}
            // mapPadding={{ ...mapPadding }}
            // mapType={"mutedStandard"}
            // showsMyLocationButton={true}
            showsCompass={true}
            loadingEnabled={true}
        // mapPadding={{ top: 0, right: 0, bottom: 50, left: 0 }}
        >

            {(!isFetching && pharmaciesToDisplay) &&
                pharmaciesToDisplay.map((pharmacyData, index) => {
                    const { latitude, longitude } = pharmacyData;
                    return (

                        <CustomMarker
                            key={pharmacyData.id}
                            title={pharmacyData.name}
                            id={pharmacyData.id}
                            coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                            }}
                            open={pharmacyData.open}
                            selected={selectedMarker === pharmacyData.id}
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

    },
    map: {
        flex: 1,
    },
});

export default Map;

