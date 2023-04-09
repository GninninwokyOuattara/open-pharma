import { BottomSheetView } from "@gorhom/bottom-sheet";
import _ from "lodash";
import React, { useContext } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { MapContext } from "../../../../contexts/MapContext";
import { PharmacyFullState, RootReducerType } from "../../../../types/dataTypes";
import { PharmaciesScreenType } from "../../../../types/screenTypes";
import SkeletonContentLoader from "../../../utility-components/SkeletonContentLoader";
import PharmaItemExtended from "../../bottomsheet-components/PharmaItemExtended";




const BottomSheetContent: React.FC<PharmaciesScreenType> = ({ navigation }) => {
    const { pharmacies, isLoading, displayMode, sortMode } = useSelector((state: RootReducerType) => {
        return {
            pharmacies: state.pharmacies.toDisplayInBottomSheet,
            isLoading: state.pharmacies.isLoading,
            displayMode: state.pharmacies.displayMode,
            sortMode: state.pharmacies.sortMode,
        }
    });
    const lastSortMode = React.useRef(sortMode);
    const { mapRef, setSelectedMarker, mapSetting, isFetching } = useContext(MapContext);

    let pharmaciesToDisplay = pharmacies;
    if (displayMode === "OpenOnly") {
        // Filter to display only open pharmacies
        pharmaciesToDisplay = pharmacies.filter(pharmacy => pharmacy.open)

    }

    if (lastSortMode.current !== sortMode) {
        if (sortMode == "Alphabetical") {
            pharmaciesToDisplay = _.sortBy(pharmaciesToDisplay, ["name"]);
        }
        else if (sortMode == "Proximity") {
            pharmaciesToDisplay = _.sortBy(pharmaciesToDisplay, ["distanceToUser"]);
        }
        lastSortMode.current = sortMode;
    }

    const renderPharmaciesItems =
        ({ item }: { item: PharmacyFullState }) => {
            // console.log(item.phid);
            return (
                <PharmaItemExtended
                    key={item.id}
                    pharmacyData={item}
                    onPress={() => {
                        setSelectedMarker && setSelectedMarker(item.id);

                        const { latitude, longitude } = item;
                        // const [latitude, longitude] = item.Position.split(
                        //     ","
                        // ).map((coord) => +coord);
                        // const { lat, lng } = item.coordinates;
                        // Navigate to second screen
                        // navigation.navigate("Information", {
                        //     pharmacy: item,
                        // });
                        mapRef?.current?.animateToRegion({
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: mapSetting.latDelta,
                            longitudeDelta: mapSetting.lngDelta,
                        });

                    }}
                />
            );
        }
    //     [pharmacies]
    // );


    if (isLoading) {
        return <SkeletonContentLoader />

    }

    if (!isFetching && !pharmaciesToDisplay.length) {
        return <Text>Yup something went horribly wrong...</Text>
    }

    return (
        <>

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
        // flex: 1,
        // borderWidth: 1,
    },
});
export default BottomSheetContent;
