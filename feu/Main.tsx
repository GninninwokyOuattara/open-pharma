import * as React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import MainScreen from "./screens/MainScreen";

import * as Location from "expo-location";

import AppLoading from 'expo-app-loading';
import { MapContextProvider } from "./contexts/MapContext";
import { UserLocationProvider } from "./contexts/UserLocationContext";

import { BottomSheetRefContextProvider } from "./contexts/BottomSheetRefContext";
import { SET_IS_LOCATION_PERMISSION_GRANTED } from "./stores/actions";


const Main = () => {
    // const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    // const [location, setLocation] =
    // React.useState<Location.LocationObject | null>(null);

    const [isReady, setIsReady] = React.useState(false);
    // useEffect(() => {
    //     (async () => {

    //         try {
    //             let response = await axios.get<PharmacyFullState[]>(
    //                 `http://localhost:8000/api/open-pharmacies/`
    //             );
    //             console.log("REQUEST ", response.data.length);

    //             // return response.data as string;
    //         } catch (error) {
    //             throw error;
    //         }

    //         // try {
    //         //     // await dropPharmaciesTable()
    //         //     const initDbRes = await initDatabase();
    //         //     const initUpdateDbRes = await initUpdateTable();

    //         //     console.log(initDbRes);
    //         //     console.log(initUpdateDbRes)
    //         // } catch (error) {
    //         //     console.log(error);
    //         // }
    //     })()
    // }, [])

    const dispatch = useDispatch();


    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        // setIsReady(true);
        if (status !== "granted") {
            // setErrorMsg("Permission to access location was denied");
            dispatch({
                type: SET_IS_LOCATION_PERMISSION_GRANTED,
                data: false
            })

        } else {
            dispatch({
                type: SET_IS_LOCATION_PERMISSION_GRANTED,
                data: true
            })
        }

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
