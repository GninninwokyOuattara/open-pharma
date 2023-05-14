import React, {
    createContext, MutableRefObject, ReactNode, RefObject,
    useCallback,
    useRef, useState
} from "react";
import MapView from "react-native-maps";
import { SharedValue, useAnimatedProps, useSharedValue } from "react-native-reanimated";


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
    // mapPadding: MapPaddingType;
    // setMapPadding: React.Dispatch<React.SetStateAction<MapPaddingType>> | null;
    // mapSetting: MapSettingType;
    // setMapSetting: React.Dispatch<React.SetStateAction<MapSettingType>> | null;
    isFetching: boolean;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>> | null;
    mapDelta: { latitudeDelta: number, longitudeDelta: number }
    updateMapDelta: (latDelta: number, lngDelta: number) => void,
    mapCurrentRegion: MutableRefObject<{ latitude: number; longitude: number; }> | null
    updateMapCurrentRegion: (latitude: number, longitude: number) => void,
    updateAnimatedBottomMapPaddingValue: (mapBottomPadding: number) => void,
    animatedMapBottomPadding: SharedValue<number> | null,
    animatedProps: Partial<{
        mapPadding: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
    }>,
    animateMapPaddingChange: (height: number) => void,
    paddingHeight: number,
    setPaddingHeight: React.Dispatch<React.SetStateAction<number>>,
    updateHeight: (height: number) => void

    // setAnimatedBottomMapPadding: React.Dispatch<React.SetStateAction<SharedValue<number>>> | null
    // animatedMapBottomPadding: SharedValue<number>



}

interface MapProviderProps {
    children?: JSX.Element | JSX.Element[] | ReactNode;
}

export const MapContext = createContext<MapContextType>({
    mapRef: null,
    selectedMarker: "",
    setSelectedMarker: null,
    // mapPadding: { top: 0, left: 0, right: 0, bottom: 0 },
    // setMapPadding: null,
    // mapSetting: { lat: 0.01672918025, lng: 0.0003419816494, latDelta: 0.0922, lngDelta: 0.0421 },
    // setMapSetting: null,
    isFetching: false,
    setIsFetching: null,
    mapDelta: { latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    updateMapDelta: () => { },
    mapCurrentRegion: null,
    updateMapCurrentRegion: () => { },
    updateAnimatedBottomMapPaddingValue: () => { },
    animatedMapBottomPadding: null,
    animatedProps: {},
    animateMapPaddingChange: () => { },
    paddingHeight: 0,
    setPaddingHeight: () => { },
    updateHeight: () => { }

    // animatedMapBottomPadding: useSharedValue(0)
});


export const MapContextProvider: React.FC<MapProviderProps> = ({
    children,
}) => {
    const mapRef = useRef<MapView>(null);
    const [isFetching, setIsFetching] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState("");
    // const [mapPadding, setMapPadding] = useState<MapPaddingType>({ top: 0, left: 0, right: 0, bottom: 0 });
    const [mapDelta, setMapDelta] = useState({ latitudeDelta: 0.0922, longitudeDelta: 0.0421 })
    // const [mapCurrentRegion, setMapCurrentRegion] = useState({ latitude: 0, longitude: 0 })

    const mapCurrentRegion = useRef({
        latitude: 0,
        longitude: 0
    })
    // const [animatedBottomMapPadding, setAnimatedBottomMapPadding] = useState<SharedValue<number> | null>(null);
    // const [animatedMapBottomPadding, setAnimatedMapBottomPadding] = useState<SharedValue<number>>(useSharedValue(300));
    const animatedMapBottomPadding = useSharedValue(0);
    // const animatedMapBottomPadding = useSharedValue(0);
    // const [animatedProps, setAnimatedProps]
    const animatedProps = useAnimatedProps(() => ({
        mapPadding: {
            top: 0,
            bottom: animatedMapBottomPadding.value,
            left: 0,
            right: 0
        }
    }))

    const [paddingHeight, setPaddingHeight] = useState(0)

    const updateHeight = (height: number) => {
        console.log("updating height to", height)
        setPaddingHeight(height)
    }

    // const [mapSetting, setMapSetting] = useState<MapSettingType>({ lat: 0.01672918025, lng: 0.0003419816494, latDelta: 0.0922, lngDelta: 0.0421 })


    const updateMapDelta = (latDelta: number, lngDelta: number) => {
        console.log("UPDATING DELTA TO", latDelta, lngDelta)
        setMapDelta({
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta,
        })
    }

    const updateMapCurrentRegion = (latitude: number, longitude: number) => {
        console.log("UPDATING REGION TO", latitude, longitude)
        // setMapCurrentRegion({
        //     latitude: latitude,
        //     longitude: longitude
        // })
        mapCurrentRegion.current = {
            latitude: latitude,
            longitude: longitude
        }
    }




    const updateAnimatedBottomMapPaddingValue = (mapBottomPadding: number) => {
        // setAnimatedMapBottomPadding((current) => {
        //     current.value = mapBottomPadding
        //     return current
        // })
        animatedMapBottomPadding.value = mapBottomPadding
    }

    const animateMapPaddingChange = useCallback((height: number) => {
        updateAnimatedBottomMapPaddingValue(height)
        if (mapRef && mapRef.current) {

            let currRegion: {
                latitude: number;
                longitude: number;
            }
            if (mapCurrentRegion.current.latitude && mapCurrentRegion.current.longitude) {
                currRegion = mapCurrentRegion.current
            } else {
                currRegion = {
                    latitude: mapRef.current.props.initialRegion?.latitude || 0,
                    longitude: mapRef.current.props.initialRegion?.longitude || 0
                }
            }

            // mapRef.current.animateToRegion({
            //     ...currRegion,
            //     ...mapDelta
            // }, 1000)
            setTimeout(() => {
                mapRef.current!.animateCamera({
                    center: {
                        ...currRegion
                    }
                })
            }, 1000)


            console.log("IT has been animated")
        }

    }, [updateAnimatedBottomMapPaddingValue, mapRef, mapCurrentRegion])




    return (
        <MapContext.Provider
            value={{ mapRef, selectedMarker, setSelectedMarker, isFetching, setIsFetching, mapDelta, updateMapDelta, mapCurrentRegion, updateMapCurrentRegion, animatedMapBottomPadding, updateAnimatedBottomMapPaddingValue, animatedProps, animateMapPaddingChange, paddingHeight, setPaddingHeight, updateHeight }}
        >
            {children}
        </MapContext.Provider>
    );
};
