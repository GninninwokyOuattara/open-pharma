import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";


import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";
import MainBottomSheet from "../components/screens-components/BottomSheet";
import { UserLocationContext } from "../contexts/UserLocationContext";
import { getAllPharmacies, getUpdateVersion, updateDeviceUpdateVersionTo } from "../database/db";
import { FETCH_ALL_PHARMACIES } from "../stores/actions";
import { calculatePharmaciesProximityToUser, fetchAllPharmacies, getCurrentUpdateVersion } from "../stores/pharmaciesActions";
import { DBPharmacy, RootReducerType } from "../types/dataTypes";
import { parsePharmacy } from "../utils/datasMorphing";


import Map from "../components/screens-components/Map";
import ToolBar from "../components/ToolBar";
import { MapContext } from "../contexts/MapContext";


const MainScreen = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { location } = useContext(UserLocationContext)
    const { setIsFetching } = useContext(MapContext)
    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });
    const [isProximityMode, setIsProximityMode] = useState<boolean>(false);

    const isDeviceVersionValid = async () => {
        // Check is current version of data is up to date.
        console.log("Checking for device version...");
        try {
            let deviceVersion = await getCurrentUpdateVersion()
            let lastVersion = await getUpdateVersion()

            // console.log(deviceVersion, lastVersion)
            if (deviceVersion === lastVersion) return true;
            return false;
        } catch (error) {
            throw error;
        }

    }

    const updateDeviceVersion = async () => {
        // Update current device version with lastest
        console.log("Updating device version...");
        try {
            const latestVersion = await getCurrentUpdateVersion()
            await updateDeviceUpdateVersionTo(latestVersion)
            return latestVersion
        } catch (error) {
            throw error;
        }

    }

    // On launch, retrieve data from database if exist otherwise from firebase
    useEffect(() => {
        // if(setIsFetching){}
        (async () => {
            setIsFetching!(true)
            // const update = await updateDeviceUpdateVersionTo("TEST0001")
            // console.log("update", update);
            // const currentVersion = await getUpdateVersion()
            // console.log("Current version: " + currentVersion)

            let pharmacies: DBPharmacy[] = await getAllPharmacies()
            if (pharmacies.length > 0) {
                // const isOk = await isDeviceVersionValid()

                console.log("Using locally stored pharmacies")
                let pharmaciesDatas = pharmacies.map((pharmacy) => parsePharmacy(pharmacy))
                dispatch({
                    type: FETCH_ALL_PHARMACIES,
                    pharmaciesDatas: pharmaciesDatas
                })
                // const isOk = await isDeviceVersionValid()
                // console.log("isOk: " + isOk)
                if (!await isDeviceVersionValid()) {
                    console.log("Outdated device version, fetching most recent one...")
                }



                // Check if version  is ok to work with here

            } else if (!pharmacies.length) {
                // There is no pharmacies in the database yet.
                console.log("Fetching pharmacies online")
                // await dropPharmaciesTable()
                await Promise.all([dispatch(fetchAllPharmacies()), updateDeviceVersion()])
                // await dispatch(fetchAllPharmacies())
                // await updateDeviceVersion()
                // const latestVersion = await getCurrentUpdateVersion()
                // await updateDeviceUpdateVersionTo(latestVersion)
                // const currentVersion = await getUpdateVersion()
                // console.log("Latest version: " + latestVersion)
                // console.log("Current version: " + currentVersion)

            } else {
                // await dispatch(fetchAllPharmacies())
                console.log(pharmacies)
                console.log(!pharmacies)
                console.log("Something went wrong")
            }
            setIsFetching!(false)
        }
        )()
    }, [])


    const proximityCalculationDispatcher = useCallback(() => {

        let intervalId = setInterval(() => {
            dispatch(calculatePharmaciesProximityToUser(location, pharmaciesDatas, isProximityMode))

        }, 5000)

        return intervalId
    }, [location, pharmaciesDatas, isProximityMode])



    // Location Updater
    useEffect(() => {
        // let intervalId: number
        // if (location) {
        //     intervalId = setInterval(() => {
        //         dispatch(calculatePharmaciesProximityToUser(location, pharmaciesDatas))
        //     }, 5000)
        // }

        // return () => {
        //     if (intervalId) clearInterval(intervalId)
        // }

        const intervalId = proximityCalculationDispatcher()

        return () => clearInterval(intervalId)


    }, [proximityCalculationDispatcher])




    return (

        <View
            style={{
                flex: 1,
            }}
        >
            {/* <Map setIsMapLoaded={setIsMapLoaded} />
            {isMapLoaded ? <MainBottomSheet /> : null} */}
            <Map setIsMapLoaded={setIsMapLoaded} />

            <MainBottomSheet />
            <BottomBar />

            {/* SearchBar */}
            <ToolBar {...{ setIsProximityMode }} />


        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomSheetContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
});

export default MainScreen;


