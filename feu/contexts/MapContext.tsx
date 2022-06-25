import React, {
    createContext, ReactNode, RefObject, useRef, useState
} from "react";
import MapView from "react-native-maps";


export interface MapPaddingType {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface MapContextType {
    mapRef: RefObject<MapView> | null;
    selectedMarker: string;
    setSelectedMarker: React.Dispatch<React.SetStateAction<string>> | null;
    mapPadding: MapPaddingType;
    setMapPadding: React.Dispatch<React.SetStateAction<MapPaddingType>> | null;
}

interface MapProviderProps {
    children?: JSX.Element | JSX.Element[] | ReactNode;
}

export const MapContext = createContext<MapContextType>({
    mapRef: null,
    selectedMarker: "",
    setSelectedMarker: null,
    mapPadding: { top: 0, left: 0, right: 0, bottom: 0 },
    setMapPadding: null,
});

export const MapContextProvider: React.FC<MapProviderProps> = ({
    children,
}) => {
    const mapRef = useRef<MapView>(null);
    const [selectedMarker, setSelectedMarker] = useState("");
    const [mapPadding, setMapPadding] = useState<MapPaddingType>({ top: 0, left: 0, right: 0, bottom: 0 });

    return (
        <MapContext.Provider
            value={{ mapRef, selectedMarker, setSelectedMarker, mapPadding, setMapPadding }}
        >
            {children}
        </MapContext.Provider>
    );
};
