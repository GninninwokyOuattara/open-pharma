import React, { RefObject, memo, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated';

import { LocationObject } from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { MapContext, MapContextType } from "../../contexts/MapContext";
import { UserLocationContext } from "../../contexts/UserLocationContext";
import { PharmacyFullState, RootReducerType } from "../../types/dataTypes";
import CustomMarker from "../CustomMarker";


const AnimatedMapView = Animated.createAnimatedComponent(MapView);

interface props {
    setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApplicationMap: React.FC<props> = ({ setIsMapLoaded }) => {



    const { location, errorMsg } = useContext(UserLocationContext);
    const { mapRef, selectedMarker, isFetching, mapDelta, updateMapDelta, updateMapCurrentRegion, updateAnimatedBottomMapPaddingValue, animatedMapBottomPadding, animatedProps } = useContext(MapContext);


    const [hasInitialRegionBeenSet, setHasInitialRegionBeenSet] = React.useState(false);

    // Store the latitude and longitude delta of the map across changes



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


    // useEffect(() => {
    //     if (location != null) {
    //         console.log("Updating map region to user location")
    //         updateMapCurrentRegion(location.coords.latitude, location.coords.longitude)
    //     } else if (pharmaciesToDisplay.length) {
    //         console.log("updating map region to first pharmacy")
    //         const pharmacy = pharmaciesToDisplay[0]
    //         updateMapCurrentRegion(+pharmacy.latitude, +pharmacy.coordinates.longitude)
    //     }
    // }, [location, pharmaciesToDisplay])


    console.log("ANIMATED BOTTOM MAP PADDING", animatedMapBottomPadding?.value)

    // const animatedBottomMapPadding = new Animated.Value(0);
    // const animatedBottomMapPaddingTemp = useSharedValue(0);

    // updateAnimatedBottomMapPaddingValue(animatedBottomMapPaddingTemp)

    // console.log('animatedBottomMapPaddingTemp 1', animatedBottomMapPaddingTemp.value)




    // updateAnimatedBottomMapPaddingValue(animatedBottomMapPaddingTemp)

    // const animatedProps = ((() => {
    //     if (animatedBottomMapPadding) {
    //         console.log("We got the state working")
    //         return useAnimatedProps(() => ({
    //             mapPadding: {
    //                 top: 0,
    //                 bottom: animatedBottomMapPadding.value,
    //                 left: 0,
    //                 right: 0,
    //             },
    //         }))
    //     } else {
    //         console.log("State not working")
    //         return useAnimatedProps(() => ({
    //             mapPadding: {
    //                 top: 0,
    //                 bottom: 0,
    //                 left: 0,
    //                 right: 0,
    //             },
    //         }))
    //     }
    // }))()




    // useEffect(() => {
    //     const id = setTimeout(() => {
    //         if (!location) {
    //             console.log("no location")
    //             return
    //         }
    //         console.log("Changd padding")
    //         animatedBottomMapPadding.value = 300;
    //         mapRef?.current?.animateToRegion(
    //             {
    //                 latitude: location!.coords.latitude,
    //                 longitude: location!.coords.longitude,
    //                 // latitudeDelta: mapSetting.latDelta,
    //                 // longitudeDelta: mapSetting.lngDelta,
    //                 ...mapDelta,
    //             }
    //         )
    //     }, 10000);

    //     return () => {

    //         clearTimeout(id)
    //     }
    // }, [location])

    useEffect(() => {
        if (!hasInitialRegionBeenSet) {
            if (location != null) {
                console.log("Updating map region to user location")
                updateMapCurrentRegion(location.coords.latitude, location.coords.longitude)
                setHasInitialRegionBeenSet(true)

            } else if (pharmaciesToDisplay.length) {
                console.log("updating map region to first pharmacy")
                const pharmacy = pharmaciesToDisplay[0]
                updateMapCurrentRegion(+pharmacy.latitude, +pharmacy.coordinates.longitude)
                setHasInitialRegionBeenSet(true)

            }
        }


    }, [hasInitialRegionBeenSet, location, pharmaciesToDisplay])



    return (
        <CustomMapView
            setIsMapLoaded={setIsMapLoaded}
            mapRef={mapRef}

            location={location}
            mapDelta={mapDelta}
            pharmaciesToDisplay={pharmaciesToDisplay}
            animatedProps={animatedProps}
            updateMapDelta={updateMapDelta}
            updateMapCurrentRegion={updateMapCurrentRegion}
            isFetching={isFetching}
            selectedMarker={selectedMarker}
        />
    );
};



interface CustomMapViewProps {
    setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    mapRef: RefObject<MapView> | null;
    location?: LocationObject | null;
    mapDelta: { latitudeDelta: number, longitudeDelta: number };
    pharmaciesToDisplay: PharmacyFullState[];
    animatedProps: Partial<{
        mapPadding: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
    }>;
    updateMapDelta: (latDelta: number, lngDelta: number) => void,
    updateMapCurrentRegion: (latitude: number, longitude: number) => void,
    isFetching: boolean;
    selectedMarker: string;



}

const CustomMapView: React.FC<CustomMapViewProps> = memo(({ setIsMapLoaded, mapRef, location, mapDelta, pharmaciesToDisplay, animatedProps, updateMapDelta, updateMapCurrentRegion, isFetching, selectedMarker }) => {

    const { animatedMapBottomPadding } = useContext(MapContext) as MapContextType;

    const bottomPadding = useSharedValue(0)



    let animatedPropss = useAnimatedProps(() => ({
        mapPadding: {
            top: 0,
            bottom: animatedMapBottomPadding!.value,
            left: 0,
            right: 0
        }

    }))

    return (
        <AnimatedMapView
            ref={mapRef}
            onMapLoaded={() => setIsMapLoaded(true)}
            style={styles.map}

            initialRegion={(() => {

                if (location) {
                    // updateMapCurrentRegion(location.coords.latitude, location.coords.longitude)

                    return {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        // latitudeDelta: mapSetting.latDelta,
                        // longitudeDelta: mapSetting.lngDelta,
                        ...mapDelta,


                    }
                } else {
                    if (pharmaciesToDisplay.length) {

                        const pharmacy = pharmaciesToDisplay[0]
                        return {
                            latitude: +pharmacy.latitude,
                            longitude: +pharmacy.coordinates.longitude,
                            // latitudeDelta: mapSetting.latDelta,
                            // longitudeDelta: mapSetting.lngDelta,
                            ...mapDelta,

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
            animatedProps={animatedPropss}

            onRegionChangeComplete={(region) => {
                console.log("REGION CHANGED", region)
                updateMapDelta(region.latitudeDelta, region.longitudeDelta)
                updateMapCurrentRegion(region.latitude, region.longitude)
            }}
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


        </AnimatedMapView>
    )
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fce",

    },
    map: {
        flex: 1,
    },
});

export default ApplicationMap;



