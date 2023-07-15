import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { useAppMapRefContextRef } from '../../contexts/AppMapRefContext'
import { RootReducerType } from '../../types/dataTypes'
import CustomMarker from '../CustomMarker'

const MapMarkersContainer = () => {
    const { pharmacies } = useSelector((state: RootReducerType) => {
        return {
            pharmacies: state.pharmacies.toDisplayInBottomSheet,
        }
    });

    const { selectedMarker } = useAppMapRefContextRef();

    const pharmaciesMarkersData = useMemo(() => {
        return pharmacies.map((pharmacy) => {
            return {
                id: pharmacy.id,
                title: pharmacy.name,
                coordinate: {

                    latitude: pharmacy.latitude,
                    longitude: pharmacy.longitude,
                },
                open: pharmacy.open,
                selected: selectedMarker?.id === pharmacy.id
            }
        })
    }, [pharmacies, selectedMarker])


    if (pharmaciesMarkersData.length) {
        return (
            <>
                {

                    pharmaciesMarkersData.map((pharmacy) => {
                        return (
                            <CustomMarker
                                key={pharmacy.id}
                                {...pharmacy}
                            />
                        )
                    })
                }
            </>
        )
    }

    return (
        <View></View>
    )
}

export default MapMarkersContainer