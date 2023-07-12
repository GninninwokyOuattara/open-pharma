import React, {
    createContext,
    ReactNode, RefObject,
    useCallback,
    useContext,
    useRef
} from "react";
import MapView from "react-native-maps";

export interface AppMapRefContextRefProps {
    mapRef: RefObject<MapView> | null;
    selectedMarker: string,
    setSelectedMarker: React.Dispatch<React.SetStateAction<string>> | null,
}

interface AppMapRefContextRefProviderProps {
    children?: JSX.Element | JSX.Element[] | ReactNode;
}

export const AppMapRefContextRef = createContext<AppMapRefContextRefProps>({
    mapRef: null,
    selectedMarker: "",
    setSelectedMarker: null,


});


type DeltaCoords = { latitudeDelta: number, longitudeDelta: number }

export const AppMapRefContextRefProvider: React.FC<AppMapRefContextRefProviderProps> = ({
    children,
}) => {
    const mapRef = useRef<MapView>(null);

    const [selectedMarker, setSelectedMarker] = React.useState<string>("");
    const [deltaCoords, setDeltaCoords] = React.useState<DeltaCoords>({ latitudeDelta: 0.0922, longitudeDelta: 0.0421 })




    const setMapDelta = useCallback((latDelta: number, lngDelta: number) => {
        setDeltaCoords(
            {
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta
            })
    }, [setDeltaCoords]);


    return (
        <AppMapRefContextRef.Provider
            value={{
                mapRef,
                selectedMarker,
                setSelectedMarker,
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
