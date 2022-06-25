import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Map from "../components/screens-components/Map";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomBar from "../components/screens-components/BottomBar";
import MainBottomSheet from "../components/screens-components/BottomSheet";
import { MapContextProvider } from "../contexts/MapContext";
import { UserLocationProvider } from "../contexts/UserLocationContext";

const MainScreen = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const insets = useSafeAreaInsets();

    return (
        <UserLocationProvider>
            <MapContextProvider>
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Map setIsMapLoaded={setIsMapLoaded} />
                    {isMapLoaded ? <MainBottomSheet /> : null}
                    <BottomBar />
                </View>
            </MapContextProvider>
        </UserLocationProvider>
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
