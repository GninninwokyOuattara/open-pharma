import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useContext } from "react";
import usePharmaciesData from "../../../../hooks/usePharmaciesData";
import PharmaItem from "../../bottomsheet-components/PharmaItem";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Pharmacy, RootReducerType } from "../../../../types/dataTypes";
import CustomSearchBar from "../../bottomsheet-components/CustomSearchBar";
import { FlatList } from "react-native-gesture-handler";
import { PharmaciesScreenType } from "../../../../types/screenTypes";
import { MapContext } from "../../../../contexts/MapContext";
import { useSelector } from "react-redux";
import PharmaItemLite from "../../bottomsheet-components/PharmaItemLite";

const BottomSheetContent: React.FC<PharmaciesScreenType> = ({ navigation }) => {
    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });
    const { mapRef, setSelectedMarker } = useContext(MapContext);

    const renderPharmaciesItems = useCallback(
        ({ item }: { item: Pharmacy }) => {
            // console.log(item.phid);
            return (
                <PharmaItemLite
                    // key={item.phid}
                    data={{
                        id: item.phid,
                        pharmacyName: item.name,
                        // status: parseInt(item.phid) % 2 ? "Ouvert" : "Fermé",
                    }}
                    onPress={() => {
                        setSelectedMarker && setSelectedMarker(item.phid);

                        // const [latitude, longitude] = item.Position.split(
                        //     ","
                        // ).map((coord) => +coord);
                        const { lat, lng } = item.coordinates;
                        // Navigate to second screen
                        navigation.navigate("Information", {
                            pharmacy: item,
                        });
                        mapRef?.current?.animateToRegion({
                            latitude: +lat,
                            longitude: +lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        });

                        // console.log("Hello");
                    }}
                />
            );
        },
        [pharmaciesDatas]
    );

    return (
        <>
            <FlatList
                ListHeaderComponent={<CustomSearchBar />}
                data={pharmaciesDatas}
                keyExtractor={(item) => item.phid}
                renderItem={renderPharmaciesItems}
                contentContainerStyle={styles.contentContainer}
            ></FlatList>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // backgroundColor: "grey",
    },
    contentContainer: {
        paddingHorizontal: 10,
    },
});
export default BottomSheetContent;
