import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";
import { useDispatch } from "react-redux";
import { SearchBar } from "react-native-elements";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { applyFilter } from "../stores/pharmaciesActions";
import usePharmaciesData from "../hooks/usePharmaciesData";

const SafeSearchBar = SearchBar as unknown as React.FC<
    SearchBarBaseProps & { cancelButtonTitle?: boolean }
>;

const CustomSearchBar = () => {
    const dispatch = useDispatch();
    const pharmaciesDatas = usePharmaciesData();
    const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
    const [search, setSearch] = useState("");

    const handleChange = (searchString: string) => {
        setSearch(searchString);
        // dispatch({type : "FILTER", data : searchString})
    };

    //#endregion

    //#region callbacks
    const handleOnFocus = useCallback(() => {
        shouldHandleKeyboardEvents.value = true;
    }, [shouldHandleKeyboardEvents]);
    const handleOnBlur = useCallback(() => {
        shouldHandleKeyboardEvents.value = false;
    }, [shouldHandleKeyboardEvents]);

    useEffect(() => {
        if (pharmaciesDatas) {
            dispatch(applyFilter(search));
        }
    }, [search]);

    return (
        <SafeSearchBar
            platform="ios"
            placeholder="Rechercher une pharmacie..."
            clearButtonMode="never"
            onChangeText={handleChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            // clearIcon={false}
            value={search}
            containerStyle={{
                backgroundColor: "#F0ECD6",
                opacity: 0.9,
            }}
            inputContainerStyle={{
                backgroundColor: "#FFF",
                // marginLeft: 0,
                // marginRight: 0,
            }}
            cancelButtonTitle={false}
        />
    );
};

export default CustomSearchBar;
