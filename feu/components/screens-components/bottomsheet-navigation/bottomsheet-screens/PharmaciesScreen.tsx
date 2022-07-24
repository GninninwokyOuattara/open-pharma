import React, { useCallback, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { MapContext } from "../../../../contexts/MapContext";
import { Pharmacy, RootReducerType } from "../../../../types/dataTypes";
import { PharmaciesScreenType } from "../../../../types/screenTypes";
import SkeletonContentLoader from "../../../utility-components/SkeletonContentLoader";
import CustomSearchBar from "../../bottomsheet-components/CustomSearchBar";
import PharmaItemExtended from "../../bottomsheet-components/PharmaItemExtended";



const BottomSheetContent: React.FC<PharmaciesScreenType> = ({ navigation }) => {
    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });
    const { mapRef, setSelectedMarker, mapSetting } = useContext(MapContext);



    const renderPharmaciesItems = useCallback(
        ({ item }: { item: Pharmacy }) => {
            // console.log(item.phid);
            return (
                <PharmaItemExtended
                    key={item.phid}
                    pharmacyData={item}
                    onPress={() => {
                        setSelectedMarker && setSelectedMarker(item.phid);

                        // const [latitude, longitude] = item.Position.split(
                        //     ","
                        // ).map((coord) => +coord);
                        const { lat, lng } = item.coordinates;
                        // Navigate to second screen
                        // navigation.navigate("Information", {
                        //     pharmacy: item,
                        // });
                        mapRef?.current?.animateToRegion({
                            latitude: +lat - mapSetting.lat,
                            longitude: +lng - mapSetting.lng,
                            latitudeDelta: mapSetting.latDelta,
                            longitudeDelta: mapSetting.lngDelta,
                        });

                    }}
                />
            );
        },
        [pharmaciesDatas]
    );

    if (!pharmaciesDatas.length) {
        return <SkeletonContentLoader />

    }

    return (
        <>
            <FlatList
                ListHeaderComponent={<CustomSearchBar />}
                data={pharmaciesDatas}
                keyExtractor={(item) => item.phid}
                renderItem={renderPharmaciesItems}
                contentContainerStyle={styles.contentContainer}
                contentOffset={{ y: 70, x: 0 }}
                ListFooterComponent={<View style={{ height: 200, flex: 1 }} />}

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
        paddingBottom: 200,
        // borderWidth: 1,
    },
});
export default BottomSheetContent;
