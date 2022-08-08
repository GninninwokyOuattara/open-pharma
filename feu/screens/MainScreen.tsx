import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";


import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";
import MainBottomSheet from "../components/screens-components/BottomSheet";
import { UserLocationContext } from "../contexts/UserLocationContext";
import { getAllPharmacies } from "../database/db";
import { FETCH_ALL_PHARMACIES } from "../stores/actions";
import { calculatePharmaciesProximityToUser, fetchAllPharmacies } from "../stores/pharmaciesActions";
import { DBPharmacy, RootReducerType } from "../types/dataTypes";
import { parsePharmacy } from "../utils/datasMorphing";

import Map from "../components/screens-components/Map";


const MainScreen = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { location } = useContext(UserLocationContext)
    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });

    useEffect(() => {
        (async () => {
            let pharmacies: DBPharmacy[] = await getAllPharmacies()
            if (pharmacies.length > 0) {
                let pharmaciesDatas = pharmacies.map((pharmacy) => parsePharmacy(pharmacy))
                return dispatch({
                    type: FETCH_ALL_PHARMACIES,
                    pharmaciesDatas: pharmaciesDatas
                })
            } else {
                await dispatch(fetchAllPharmacies())
            }
        })()
    }, [])




    // Location Updater
    useEffect(() => {
        let intervalId: number
        if (location) {
            intervalId = setInterval(() => {
                dispatch(calculatePharmaciesProximityToUser(location, pharmaciesDatas))
            }, 5000)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [location])




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


