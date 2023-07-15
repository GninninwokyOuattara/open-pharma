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

    const { mapRef, setActiveMarker } = useAppMapRefContextRef();

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
        let ouputPharmacies: PharmacyFullState[] = pharmacies;
        if (displayMode == "OpenOnly") {
            ouputPharmacies = pharmacies.filter(pharmacy => pharmacy.open);
        }

        const sortField = sortMode === "Alphabetical" ? "name" : "distanceToUser";
        ouputPharmacies = _.sortBy(ouputPharmacies, [sortField]);


        return ouputPharmacies;
    }, [pharmacies, displayMode, sortMode])





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