import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Map from "../components/screens-components/Map";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";
import MainBottomSheet from "../components/screens-components/BottomSheet";
import { UserLocationContext } from "../contexts/UserLocationContext";
import { fetchAllPharmacies } from "../stores/pharmaciesActions";

import { getPharmacies, insertPharmacie } from "../database/db";

const MainScreen = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { location } = useContext(UserLocationContext)

    useEffect(() => {
        (async () => {
            if (location) {
                await dispatch(fetchAllPharmacies(location))

            } else {

                await dispatch(fetchAllPharmacies())
            }

        })()
    }, [dispatch, location])

    useEffect(() => {
        (async () => {
            try {

                let res1 = await insertPharmacie({ "name": "name", "_name": "name", "_name_safe": "name", "flat_name": "flat_name", "geographical_position": "geographical_position", "google_maps_position_link": "google_maps_position_position", "phone_numbers": ["1", "2"], "coordinates": { "lat": "1.11", "lng": "2.11" }, "open_from": "01/01/2015", "open_until": "01/01/2015", "open": true, "phid": "21" })

                console.log("RES1", res1)
                let res = await getPharmacies()
                console.log("RES", res)

            } catch (error) {
                console.log("ERROR", error)
            }
        })()
    }, [])


    return (

        <View
            style={{
                flex: 1,
            }}
        >
            <Map setIsMapLoaded={setIsMapLoaded} />
            {isMapLoaded ? <MainBottomSheet /> : null}
            <BottomBar />
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
