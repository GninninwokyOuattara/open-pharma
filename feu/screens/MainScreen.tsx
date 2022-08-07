import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Map from "../components/screens-components/Map";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";
import MainBottomSheet from "../components/screens-components/BottomSheet";
import { UserLocationContext } from "../contexts/UserLocationContext";
import { getAllPharmacies } from "../database/db";
import { FETCH_ALL_PHARMACIES } from "../stores/actions";
import { fetchAllPharmacies } from "../stores/pharmaciesActions";
import { DBPharmacy } from "../types/dataTypes";
import { parsePharmacy } from "../utils/datasMorphing";


const MainScreen = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const { location } = useContext(UserLocationContext)

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
