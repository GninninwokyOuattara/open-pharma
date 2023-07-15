import React from "react";
import { StyleSheet, View } from "react-native";
import { PharmaciesScreenType } from "../../../../types/screenTypes";
import PharmaciesListContainer from "../../bottomsheet-components/PharmaciesListContainer";




const PharmaciesScreen: React.FC<PharmaciesScreenType> = ({ navigation }) => {
    // const { pharmacies, isLoading, displayMode, sortMode, isSearchingPharmacy } = useSelector((state: RootReducerType) => {
    //     return {
    //         pharmacies: state.pharmacies.toDisplayInBottomSheet,
    //         isLoading: state.pharmacies.isLoading,
    //         displayMode: state.pharmacies.displayMode,
    //         sortMode: state.pharmacies.sortMode,
    //         isSearchingPharmacy: state.pharmacies.isSearchingPharmacy,
    //     }
    // });
    // const lastSortMode = React.useRef(sortMode);
    // const { mapRef, setSelectedMarker, isFetching, mapDelta } = useContext(MapContext);

    // let pharmaciesToDisplay = pharmacies;
    // if (displayMode === "OpenOnly") {
    //     // Filter to display only open pharmacies
    //     pharmaciesToDisplay = pharmacies.filter(pharmacy => pharmacy.open)

    // }

    // if (lastSortMode.current !== sortMode) {
    //     if (sortMode == "Alphabetical") {
    //         pharmaciesToDisplay = _.sortBy(pharmaciesToDisplay, ["name"]);
    //     }
    //     else if (sortMode == "Proximity") {
    //         pharmaciesToDisplay = _.sortBy(pharmaciesToDisplay, ["distanceToUser"]);
    //     }
    //     lastSortMode.current = sortMode;
    // }

    // const pharmaciesToDisplay = useMemo(() => {
    //     console.log("Running memo")
    //     const pharmaciesFilteredByDisplayMode = pharmacies.filter(pharmacy => pharmacy.open);

    //     const sortField = sortMode === "Alphabetical" ? "name" : "distanceToUser";
    //     const pharmaciesSortedByMode = _.sortBy(pharmaciesFilteredByDisplayMode, [sortField]);

    //     return pharmaciesSortedByMode;


    // }, [pharmacies, displayMode, sortMode])

    // const animateToPressedPharmacy = useCallback((latitude: number, longitude: number) => {

    //     if (mapRef && mapRef.current) {
    //         mapRef.current.animateToRegion({
    //             latitude: latitude,
    //             longitude: longitude,
    //             ...mapDelta
    //         });
    //     }

    // }, [mapRef, mapDelta])

    // const renderPharmaciesItems =
    //     ({ item }: { item: PharmacyFullState }) => {
    //         // console.log(item.phid);
    //         return (
    //             <PharmaItemExtended
    //                 key={item.id}
    //                 // pharmacyData={item}
    //                 isOpen={item.open}
    //                 distanceToUser={item.distanceToUserReadable}
    //                 name={item.name}
    //                 onPress={() => {
    //                     setSelectedMarker && setSelectedMarker(item.id);

    //                     const { latitude, longitude } = item;
    //                     // const [latitude, longitude] = item.Position.split(
    //                     //     ","
    //                     // ).map((coord) => +coord);
    //                     // const { lat, lng } = item.coordinates;
    //                     // Navigate to second screen
    //                     // navigation.navigate("Information", {
    //                     //     pharmacy: item,
    //                     // });
    //                     animateToPressedPharmacy(latitude, longitude)
    //                     // mapRef?.current?.animateToRegion({
    //                     //     latitude: latitude,
    //                     //     longitude: longitude,
    //                     //     latitudeDelta: mapSetting.latDelta,
    //                     //     longitudeDelta: mapSetting.lngDelta,
    //                     // });

    //                 }}
    //             />
    //         );
    //     }

    //     [pharmacies]
    // );




    return (
        <>
            {/* 
            <FlatList
                // ListHeaderComponent={<CustomSearchBar />}
                data={pharmaciesToDisplay}
                keyExtractor={(item) => item.id}
                maxToRenderPerBatch={10}
                initialNumToRender={10}
                windowSize={10}
                removeClippedSubviews={true}
                renderItem={renderPharmaciesItems}
                contentContainerStyle={styles.contentContainer}
                // contentOffset={{ y: 70, x: 0 }}
                ListFooterComponent={<BottomSheetView style={{ height: 200, flex: 1 }} children={undefined} />}

            ></FlatList> */}
            <View style={styles.contentContainer}>


                <PharmaciesListContainer />
                {/* <Text>Hello</Text> */}

            </View>
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
        // paddingHorizontal: 10,
        // paddingBottom: 200,
        flex: 1,
        marginTop: 10,
        // borderWidth: 1,
    },
});
export default PharmaciesScreen;
