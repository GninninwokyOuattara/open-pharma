import React, {
    useState,
    useEffect,
    createContext,
    useRef,
    RefObject,
} from "react";
import MapView from "react-native-maps";

export interface MapContextType {
    mapRef: RefObject<MapView> | null;
}

interface MapProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const MapContext = createContext<MapContextType>({ mapRef: null });

export const MapContextProvider: React.FC<MapProviderProps> = ({
    children,
}) => {
    const mapRef = useRef<MapView>(null);

    return (
        <MapContext.Provider value={{ mapRef }}>{children}</MapContext.Provider>
    );
};
