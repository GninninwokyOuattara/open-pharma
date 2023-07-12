import { BottomSheetView } from '@gorhom/bottom-sheet';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppMapRefContextRef } from '../../../contexts/AppMapRefContext';
import { PharmacyFullState, RootReducerType } from '../../../types/dataTypes';
import SkeletonContentLoader from '../../utility-components/SkeletonContentLoader';
import PharmaItemExtended from './PharmaItemExtended';




const PharmaciesListContainer = () => {

    const { mapRef, selectedMarker, setSelectedMarker } = useAppMapRefContextRef();

    const { pharmacies, isLoading, displayMode, sortMode, isSearchingPharmacy } = useSelector((state: RootReducerType) => {
        return {
            pharmacies: state.pharmacies.toDisplayInBottomSheet,
            isLoading: state.pharmacies.isLoading,
            displayMode: state.pharmacies.displayMode,
            sortMode: state.pharmacies.sortMode,
            isSearchingPharmacy: state.pharmacies.isSearchingPharmacy,
        }
    });

    const pharmaciesList = useMemo(() => {
        const pharmaciesFilteredByDisplayMode = pharmacies.filter(pharmacy => pharmacy.open);


        const sortField = sortMode === "Alphabetical" ? "name" : "distanceToUser";
        const pharmaciesSortedByMode = _.sortBy(pharmaciesFilteredByDisplayMode, [sortField]);


        return pharmaciesSortedByMode;
    }, [pharmacies, displayMode, sortMode])



    const animateToPressedPharmacy = useCallback((latitude: number, longitude: number) => {
        if (mapRef && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, [mapRef])

    const handlePress = useCallback((pharmacy: PharmacyFullState) => {
        animateToPressedPharmacy(pharmacy.latitude, pharmacy.longitude)
    }, [])


    const renderPharmaciesItems =
        useCallback(({ item }: { item: PharmacyFullState }) => {
            return (
                <PharmaItemExtended
                    key={item.id}
                    // pharmacyData={item}
                    isOpen={item.open}
                    distanceToUser={item.distanceToUserReadable}
                    name={item.name}
                    onPress={handlePress.bind(null, item)}

                // onPress={() => {
                //     setSelectedMarker && setSelectedMarker(item.id);

                //     const { latitude, longitude } = item;
                //     // const [latitude, longitude] = item.Position.split(
                //     //     ","
                //     // ).map((coord) => +coord);
                //     // const { lat, lng } = item.coordinates;
                //     // Navigate to second screen
                //     // navigation.navigate("Information", {
                //     //     pharmacy: item,
                //     // });
                //     animateToPressedPharmacy(latitude, longitude)
                //     // mapRef?.current?.animateToRegion({
                //     //     latitude: latitude,
                //     //     longitude: longitude,
                //     //     latitudeDelta: mapSetting.latDelta,
                //     //     longitudeDelta: mapSetting.lngDelta,
                //     // });

                // }}
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