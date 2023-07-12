import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import { useAppMapAnimationContext } from '../../contexts/AppMapAnimationContext';
import { useAppMapRefContextRef } from '../../contexts/AppMapRefContext';
import MapMarkersContainer from './MapMarkersContainer';


const AnimatedMapView = Animated.createAnimatedComponent(MapView);

const AppMap = () => {

    console.log("Map rerender")
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

