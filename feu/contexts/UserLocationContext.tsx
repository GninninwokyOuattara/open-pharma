import React, {
    useState,
    useEffect,
    createContext,
    useRef,
    RefObject,
} from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export interface UserContextType {
    location: Location.LocationObject | null;
    errorMsg: string | null;
}

export const UserLocationContext = createContext<UserContextType>({
    location: null,
    errorMsg: null,
});

export const UserLocationProvider: React.FC<{
    children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
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

    return (
        <UserLocationContext.Provider value={{ location, errorMsg }}>
            {children}
        </UserLocationContext.Provider>
    );
};
