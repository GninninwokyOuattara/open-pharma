import React, {
    useState,
    useEffect,
    createContext,
    useRef,
    RefObject,
    ReactNode,
} from "react";
import MapView from "react-native-maps";

export interface MapContextType {
    mapRef: RefObject<MapView> | null;
    selectedMarker: string;
    setSelectedMarker: React.Dispatch<React.SetStateAction<string>> | null;
}

interface MapProviderProps {
    children?: JSX.Element | JSX.Element[] | ReactNode;
}

export const MapContext = createContext<MapContextType>({
    mapRef: null,
    selectedMarker: "",
    setSelectedMarker: null,
});

export const MapContextProvider: React.FC<MapProviderProps> = ({
    children,
}) => {
    const mapRef = useRef<MapView>(null);
    const [selectedMarker, setSelectedMarker] = useState("");

    return (
        <MapContext.Provider
            value={{ mapRef, selectedMarker, setSelectedMarker }}
        >
            {children}
        </MapContext.Provider>
    );
};
