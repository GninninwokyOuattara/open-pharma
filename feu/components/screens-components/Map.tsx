import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { useDispatch, useSelector } from "react-redux";
import { MapContext } from "../../contexts/MapContext";
import { UserLocationContext } from "../../contexts/UserLocationContext";
import { RootReducerType } from "../../types/dataTypes";
// import { fetchLocalPharmaciesData } from "../../stores/pharmaciesActions";

interface props {
    setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Map: React.FC<props> = ({ setIsMapLoaded }) => {
    const { location, errorMsg } = useContext(UserLocationContext);
    const { mapRef, selectedMarker, mapPadding, mapSetting } = useContext(MapContext);

    const dispatch = useDispatch();
    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });


    // if (location) {

    // }
    return (
        <MapView
            ref={mapRef}
            onMapLoaded={() => setIsMapLoaded(true)}
            onUserLocationChange={(locationEvent) => console.log(locationEvent.nativeEvent.coordinate)}
            // onRegionChange={(region) => console.log("Region", region)}
            style={styles.map}
            // initialRegion={{
            //     latitude: location?.coords.latitude || 5.393620594067611,
            //     longitude: location?.coords.longitude || -4.005658558941592,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            // }}
            initialRegion={(() => {

                if (location) {

                    return {
                        latitude: location.coords.latitude - mapSetting.lat,
                        longitude: location.coords.longitude - mapSetting.lng,
                        latitudeDelta: mapSetting.latDelta,
                        longitudeDelta: mapSetting.lngDelta,
                    }
                }
            })()}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            // mapPadding={{ ...mapPadding }}
            // mapType={"mutedStandard"}
            // showsMyLocationButton={true}
            showsCompass={true}
            loadingEnabled={true}
        // mapPadding={{ top: 0, right: 0, bottom: 50, left: 0 }}
        >

            {pharmaciesDatas &&
                pharmaciesDatas.map((pharmacyData, index) => {
                    const { lat, lng } = pharmacyData.coordinates;
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: +lat,
                                longitude: +lng,
                            }}
                            pinColor={pharmacyData.open ? "#a0f20c" : "red"}
                        // pinColor={
                        //     pharmacyData.Id == selectedMarker
                        //         ? "green"
                        //         : "black"
                        // }
                        // onPress={() => console.log(pharmacyData.Position)}
                        />
                    );
                })}

            {/* Button to point map on user position */}
            {/* {location && <CustomShowsMyLocationButton />} */}

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

//  Bottomsheet component should use new data format
//  Pharma item should display something please
