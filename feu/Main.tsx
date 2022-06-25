import * as React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import MainScreen from "./screens/MainScreen";

import * as Location from "expo-location";
import {
    fetchAllPharmacies
} from "./stores/pharmaciesActions";

const Main = () => {
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    const [location, setLocation] =
        React.useState<Location.LocationObject | null>(null);
    const [isReady, setIsReady] = React.useState(false);

    const dispatch = useDispatch();

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            setIsReady(true);

            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setIsReady(true);
    };

    React.useEffect(() => {
        (async () => {
            // let e = await dispatch(fetchLocalPharmaciesData(location));
            try {
                // Separate problem
                // Function to fetch data from firebase call here
                // Calculate distance function called from Map component with onUserPositionchange
                await dispatch(fetchAllPharmacies());
                // await getLocationPermission();
            } catch (error) {
                console.log(error);
            }
        })();
    }, [dispatch, location]);

    return (
        <SafeAreaProvider>
            {/* <StatusBar style="auto" /> */}
            <MainScreen />
        </SafeAreaProvider>
    );
};

export default Main;
