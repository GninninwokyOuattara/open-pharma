import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import { useAppMapRefContextRef } from '../../contexts/AppMapRefContext';
import { useUserLocation } from '../../contexts/UserLocationContext';
import MapMarkersContainer from './MapMarkersContainer';


const AnimatedMapView = Animated.createAnimatedComponent(MapView);

const AppMap = () => {

    console.log("Map rerender")
    const { mapRef } = useAppMapRefContextRef();

    const { location } = useUserLocation()

    const getInitialRegion = useCallback(() => {
        if (location != null) {
            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.02568403283423315,
                longitudeDelta: 0.018894821405410767
            }
        } else {
            return {
                latitude: 5.3484446,
                longitude: -4.0620656,
                latitudeDelta: 0.02568403283423315,
                longitudeDelta: 0.018894821405410767
            }
        }
    }, [location])

    const handleMapReady = useCallback(() => {
        if (mapRef && mapRef.current && location) {
            mapRef.current.animateToRegion(getInitialRegion())
        }
    }, [mapRef, getInitialRegion, location])

    return (
        <AnimatedMapView
            ref={mapRef}
            style={styles.map}
            onMapReady={() => {
                handleMapReady()
            }}

            provider={PROVIDER_DEFAULT}
            showsUserLocation={true}

            showsCompass={true}
            loadingEnabled={true}
            mapPadding={{ top: 0, bottom: 300, left: 0, right: 0 }}


        >



            <MapMarkersContainer />

        </AnimatedMapView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fce",

    },
    map: {
        flex: 1,
    },
});


export default AppMap;

