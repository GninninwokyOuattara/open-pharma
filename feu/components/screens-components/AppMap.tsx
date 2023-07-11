import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import { useAppMapAnimationContext } from '../../contexts/AppMapAnimationContext';
import { useAppMapRefContextRef } from '../../contexts/AppMapRefContext';


const AnimatedMapView = Animated.createAnimatedComponent(MapView);

const AppMap = () => {

    console.log("MAp rerender")
    // const { mapRef, animatedMapBottomPadding } = useContext(MapContext);
    const { mapRef } = useAppMapRefContextRef();
    const { mapDynamicBottomOffsetValue } = useAppMapAnimationContext()
    // const { location } = useContext(UserLocationContext);


    // const bottomPadding = useSharedValue(0)



    // let animatedProps = useAnimatedProps(() => ({
    //     mapPadding: {
    //         top: 0,
    //         bottom: animatedMapBottomPadding!.value,
    //         left: 0,
    //         right: 0
    //     }

    // }))

    // console.log("MapDynamicBottomOffsetValue", mapDynamicBottomOffsetValue)

    return (
        <AnimatedMapView
            ref={mapRef}
            style={styles.map}

            // initialRegion={(() => {

            //     if (location) {
            //         // updateMapCurrentRegion(location.coords.latitude, location.coords.longitude)

            //         return {
            //             latitude: location.coords.latitude,
            //             longitude: location.coords.longitude,
            //             // latitudeDelta: mapSetting.latDelta,
            //             // longitudeDelta: mapSetting.lngDelta,
            //             ...mapDelta,


            //         }
            //     }
            //     // else {
            //     //     if (pharmaciesToDisplay.length) {

            //     //         const pharmacy = pharmaciesToDisplay[0]
            //     //         return {
            //     //             latitude: +pharmacy.latitude,
            //     //             longitude: +pharmacy.coordinates.longitude,
            //     //             // latitudeDelta: mapSetting.latDelta,
            //     //             // longitudeDelta: mapSetting.lngDelta,
            //     //             ...mapDelta,

            //     //         }
            //     //     }
            //     // }
            // })()}
            provider={PROVIDER_DEFAULT}
            showsUserLocation={true}

            showsCompass={true}
            loadingEnabled={true}
            animatedProps={mapDynamicBottomOffsetValue}

        // onRegionChangeComplete={(region) => {
        //     console.log("REGION CHANGED", region)
        //     updateMapDelta(region.latitudeDelta, region.longitudeDelta)
        //     updateMapCurrentRegion(region.latitude, region.longitude)
        // }}
        >

            {/* {(!isFetching && pharmaciesToDisplay) &&
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
                })} */}


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

