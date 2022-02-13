import { View, Text } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

const useLocation = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    );
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
        return () => {};
    }, []);
    return { location, errorMsg };
};

export default useLocation;
