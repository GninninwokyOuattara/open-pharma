import * as React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import MainScreen from "./screens/MainScreen";

import * as Location from "expo-location";

import AppLoading from 'expo-app-loading';
import { MapContextProvider } from "./contexts/MapContext";
import { UserLocationProvider } from "./contexts/UserLocationContext";

import { BottomSheetRefContextProvider } from "./contexts/BottomSheetRefContext";
import { initDatabase } from "./database/db";


const Main = () => {
    // const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    // const [location, setLocation] =
    // React.useState<Location.LocationObject | null>(null);

    const [isReady, setIsReady] = React.useState(false);

    initDatabase().then((res) => {
        console.log(res)

    }).catch((err) => { console.log(err) });

    const dispatch = useDispatch();

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        // setIsReady(true);
        // if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");

        // return;
        // }

        // let location = await Location.getCurrentPositionAsync({});
        // setLocation(location);
        // setIsReady(true);
    };

    if (!isReady) {
        return (
            <AppLoading
                startAsync={() => getLocationPermission()}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <SafeAreaProvider>
            <UserLocationProvider>
                <MapContextProvider>
                    <BottomSheetRefContextProvider>

                        <MainScreen />
                    </BottomSheetRefContextProvider>

                </MapContextProvider>

            </UserLocationProvider>

            {/* <StatusBar style="auto" /> */}
        </SafeAreaProvider>
    );
};

export default Main;
