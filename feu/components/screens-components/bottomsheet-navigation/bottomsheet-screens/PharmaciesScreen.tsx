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
            return (
                <PharmaItemLite
                    key={item.Id}
                    data={{
                        id: item.Id,
                        pharmacyName: item.Nom,
                        status: parseInt(item.Id) % 2 ? "Ouvert" : "Fermé",
                    }}
                    onPress={() => {
                        setSelectedMarker && setSelectedMarker(item.Id);

                        const [latitude, longitude] = item.Position.split(
                            ","
                        ).map((coord) => +coord);
                        // Navigate to second screen
                        navigation.navigate("Information", {
                            pharmacy: item,
                        });
                        mapRef?.current?.animateToRegion({
                            latitude,
                            longitude: -longitude,
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
                keyExtractor={(item) => item.Id}
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
