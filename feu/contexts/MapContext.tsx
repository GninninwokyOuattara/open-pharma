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

export interface MapSettingType {
    lat: number,
    lng: number,
    latDelta: number,
    lngDelta: number
}
export interface MapContextType {
    mapRef: RefObject<MapView> | null;
    selectedMarker: string;
    setSelectedMarker: React.Dispatch<React.SetStateAction<string>> | null;
    mapPadding: MapPaddingType;
    setMapPadding: React.Dispatch<React.SetStateAction<MapPaddingType>> | null;
    mapSetting: MapSettingType;
    setMapSetting: React.Dispatch<React.SetStateAction<MapSettingType>> | null;
    isFetching: boolean;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>> | null;

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
    mapSetting: { lat: 0.01672918025, lng: 0.0003419816494, latDelta: 0.0922, lngDelta: 0.0421 },
    setMapSetting: null,
    isFetching: false,
    setIsFetching: null,
});


export const MapContextProvider: React.FC<MapProviderProps> = ({
    children,
}) => {
    const mapRef = useRef<MapView>(null);
    const [isFetching, setIsFetching] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState("");
    const [mapPadding, setMapPadding] = useState<MapPaddingType>({ top: 0, left: 0, right: 0, bottom: 0 });

    const [mapSetting, setMapSetting] = useState<MapSettingType>({ lat: 0.01672918025, lng: 0.0003419816494, latDelta: 0.0922, lngDelta: 0.0421 })


    return (
        <MapContext.Provider
            value={{ mapRef, selectedMarker, setSelectedMarker, mapPadding, setMapPadding, mapSetting, setMapSetting, isFetching, setIsFetching }}
        >
            {children}
        </MapContext.Provider>
    );
};
