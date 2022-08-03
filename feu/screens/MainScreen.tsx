import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Map from "../components/screens-components/Map";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import BottomBar from "../components/screens-components/BottomBar";
import MainBottomSheet from "../components/screens-components/BottomSheet";
import { UserLocationContext } from "../contexts/UserLocationContext";
import { fetchAllPharmacies } from "../stores/pharmaciesActions";


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
