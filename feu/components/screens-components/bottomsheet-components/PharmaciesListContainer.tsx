import { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Location from "expo-location";
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAppMapRefContextRef } from '../../../contexts/AppMapRefContext';
import { calculateDistanceToUser, updateProximity } from '../../../stores/pharmaciesActions';
import { PharmacyFullState, RootReducerType } from '../../../types/dataTypes';
import SkeletonContentLoader from '../../utility-components/SkeletonContentLoader';
import PharmaItemExtended from './PharmaItemExtended';




const PharmaciesListContainer = () => {

    const { mapRef, setActiveMarker } = useAppMapRefContextRef();
    const dispatch = useDispatch();

    const { pharmacies, isLoading, displayMode, sortMode, search, isLocationPermissionGranted } = useSelector((state: RootReducerType) => {
        return {
            pharmacies: state.pharmacies.pharmacies,
            isLoading: state.pharmacies.isLoading,
            displayMode: state.pharmacies.displayMode,
            sortMode: state.pharmacies.sortMode,
            isSearchingPharmacy: state.pharmacies.isSearchingPharmacy,
            isLocationPermissionGranted: state.pharmacies.isLocationPermissionGranted,
            search: state.pharmacies.search,
        }
    });

    const pharmaciesList = useMemo(() => {
        let outputPharmacies: PharmacyFullState[] = pharmacies;
        if (displayMode == "OpenOnly") {
            outputPharmacies = pharmacies.filter(pharmacy => pharmacy.open);
        }

        const sortField = sortMode === "Alphabetical" ? "name" : "distanceToUser";

        if (search) {
            outputPharmacies = outputPharmacies.filter(pharmacy => pharmacy.name.toLowerCase().includes(search.toLowerCase()))
        }
        outputPharmacies = _.sortBy(outputPharmacies, [sortField]);
        return outputPharmacies;
    }, [pharmacies, displayMode, sortMode, search])




    useEffect(() => {
        let intervalId: number;
        if (sortMode === "Proximity") {
            intervalId = setInterval(() => {
                // console.log("Hello World")
                if (isLocationPermissionGranted) {

                    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }).then((location) => {

                        const pharmaciesWithDistances = calculateDistanceToUser(pharmaciesList, location)
                        dispatch(updateProximity(pharmaciesWithDistances))
                    })

                }
            }, 10000)

        }


        return () => {
            if (intervalId) {

                clearInterval(intervalId)
            }
        }
    }, [sortMode, pharmaciesList, isLocationPermissionGranted])





    const handlePress = useCallback((pharmacy: PharmacyFullState) => {
        setActiveMarker(pharmacy)
    }, [setActiveMarker])


    const renderPharmaciesItems =
        useCallback(({ item }: { item: PharmacyFullState }) => {
            return (
                <PharmaItemExtended
                    key={item.id}
                    // pharmacyData={item}
                    isOpen={item.open}
                    distanceToUser={item.distanceToUserReadable}
                    name={item.name}
                    onPress={() => handlePress(item)}
                />
            );
        }, [pharmaciesList])


    if (isLoading) {
        return <SkeletonContentLoader />
    }


    if (!isLoading && pharmaciesList.length > 0) {
        return (
            <View>
                <FlatList
                    data={pharmaciesList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPharmaciesItems}
                    initialNumToRender={20}
                    maxToRenderPerBatch={20}

                    ListFooterComponent={<BottomSheetView style={{
                        height: 50,
                    }} children={undefined} />}

                />

            </View>
        )
    } else {
        return <NoPharmaciesToDisplay />
    }


}

export default PharmaciesListContainer




const NoPharmaciesToDisplay = () => {
    return (
        <View style={{
            flex: 1,
            // justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,

        }}>
            <Text
                style={{
                    color: "grey",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >Aucune pharmacie trouvé.</Text>
            <Text
                style={{
                    color: "grey",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                }}
            >Veuillez rééssayer dans après court instant.</Text>
        </View>
    )
}