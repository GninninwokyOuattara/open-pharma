import { View, Text } from "react-native";
import { useState, useEffect, useRef } from "react";
import RNLocation from "react-native-location";

interface LocationSubscription {
    speed: number;
    longitude: number;
    latitude: number;
    accuracy: number;
    heading: number;
    altitude: number;
    altitudeAccuracy: number;
    floor: number;
    timestamp: number;
    fromMockProvider: boolean;
}

const useLocation = () => {
    const [isGranted, setIsGranted] = useState(false);
    const [locationSubscription, setLocationSubscription] = useState<any>(null);
    const unsubscribe = useRef<any>();

    RNLocation.configure({
        distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
            detail: "coarse",
        },
    }).then((granted) => {
        setIsGranted(true);
    });

    if (isGranted) {
        unsubscribe.current = RNLocation.subscribeToLocationUpdates(
            (locations) => {
                setLocationSubscription(locations);
            }
        );
    }
    console.log(unsubscribe);
    console.log(locationSubscription);

    return [unsubscribe, locationSubscription];
};

export default useLocation;
