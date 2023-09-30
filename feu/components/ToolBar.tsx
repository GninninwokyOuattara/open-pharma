import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserLocation } from '../contexts/UserLocationContext';
import PharmacyShowMode from './PharmacyDisplayMode';
import PharmacyListOrder from './PharmacyListOrder';
import CustomSearchBar from './screens-components/bottomsheet-components/CustomSearchBar';
import CustomReInitializationButton from './utility-components/CustomReInitializationButton';
import CustomShowsMyLocationButton from './utility-components/CustomShowsMyLocationButton';


const ToolBar = () => {

    const insets = useSafeAreaInsets();


    return (
        <View style={{ position: 'absolute', width: "100%", top: insets.top }}>
            <CustomSearchBar />
            <View style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                // borderWidth: 1,
                justifyContent: 'space-between'
            }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}

                    style={{
                        flex: 1,
                        flexDirection: "row"
                    }}>

                    <ToolBarModes />

                </ScrollView>
                <View style={{
                    // flex: 1,
                    flexDirection: "row-reverse",
                    // marginRight: 1,
                }}>

                    <CustomReInitializationButton />
                    <LocationButtonContainer />


                </View>

            </View>
            {/* Tags */}
        </View>
    )
}

export default ToolBar


const ToolBarModes = () => {

    const [isProximityMode, setIsProximityMode] = useState(false)

    return (
        <>
            <PharmacyShowMode />
            <PharmacyListOrder {...{ setIsProximityMode }} />
        </>
    )

}


const LocationButtonContainer = () => {

    const { location } = useUserLocation()

    if (location) {
        return (
            <CustomShowsMyLocationButton />
        )
    } else {
        return <View />
    }
}