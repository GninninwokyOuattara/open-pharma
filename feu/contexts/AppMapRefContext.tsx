import React, {
    createContext,
    ReactNode, RefObject,
    useCallback,
    useContext,
    useRef
} from "react";
import MapView from "react-native-maps";
import { PharmacyFullState } from "../types/dataTypes";

export interface AppMapRefContextRefProps {
    mapRef: RefObject<MapView> | null;
    selectedMarker: PharmacyFullState | null,
    setSelectedMarker: React.Dispatch<React.SetStateAction<PharmacyFullState | null>> | null,
    setActiveMarker: (marker: PharmacyFullState) => void
}

interface AppMapRefContextRefProviderProps {
    children?: JSX.Element | JSX.Element[] | ReactNode;
}

export const AppMapRefContextRef = createContext<AppMapRefContextRefProps>({
    mapRef: null,
    selectedMarker: null,
    setSelectedMarker: null,
    setActiveMarker: () => { }


});


type DeltaCoords = { latitudeDelta: number, longitudeDelta: number }

export const AppMapRefContextRefProvider: React.FC<AppMapRefContextRefProviderProps> = ({
    children,
}) => {
    const mapRef = useRef<MapView>(null);

    const [selectedMarker, setSelectedMarker] = React.useState<PharmacyFullState | null>(null);
    const [deltaCoords, setDeltaCoords] = React.useState<DeltaCoords>({ latitudeDelta: 0.0922, longitudeDelta: 0.0421 })




    const setMapDelta = useCallback((latDelta: number, lngDelta: number) => {
        setDeltaCoords(
            {
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta
            })
    }, [setDeltaCoords]);

    const animateToPharmacyOnMap = useCallback((pharmacy: PharmacyFullState) => {
        if (mapRef && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: pharmacy.latitude,
                longitude: pharmacy.longitude,
                latitudeDelta: deltaCoords.latitudeDelta,
                longitudeDelta: deltaCoords.longitudeDelta,
            });
        }
    }, [mapRef, deltaCoords])

    const setActiveMarker = useCallback((pharmacy: PharmacyFullState) => {
        animateToPharmacyOnMap(pharmacy)
        setSelectedMarker((currentlySelected) => {
            if (currentlySelected?.id === pharmacy.id) return null
            return pharmacy
        })

    }, [setSelectedMarker, animateToPharmacyOnMap]);






    return (
        <AppMapRefContextRef.Provider
            value={{
                mapRef,
                selectedMarker,
                setSelectedMarker,
                setActiveMarker
            }}
        >
            {children}
        </AppMapRefContextRef.Provider>
    );
};


export const useAppMapRefContextRef = () => {
    const context = useContext(AppMapRefContextRef);
    return context;
}
