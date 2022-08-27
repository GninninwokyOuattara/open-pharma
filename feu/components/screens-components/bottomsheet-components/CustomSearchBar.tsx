import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter } from "../../../stores/pharmaciesActions";
import { RootReducerType } from "../../../types/dataTypes";
import ShadowAround from "../../utility-components/ShadowAround";

const SafeSearchBar = SearchBar as unknown as React.FC<
    SearchBarBaseProps & { cancelButtonTitle?: boolean }
>;

const CustomSearchBar = () => {
    const dispatch = useDispatch();
    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });
    const [search, setSearch] = useState("");

    const handleChange = (searchString: string) => {
        setSearch(searchString);
        // dispatch({type : "FILTER", data : searchString})
    };

    useEffect(() => {
        if (pharmaciesDatas) {
            dispatch(applyFilter(search));
        }
    }, [search]);

    return (
        <ShadowAround>

            <SafeSearchBar
                platform="ios"
                placeholder="Rechercher une pharmacie..."
                clearButtonMode="never"
                onChangeText={handleChange}
                // clearIcon={false}
                value={search}
                containerStyle={{
                    backgroundColor: "transparent",
                    // backgroundColor: "#F0ECD6",
                    // opacity: 0.9,
                }}
                inputContainerStyle={{
                    backgroundColor: "#FFF",
                    // marginLeft: 0,
                    // marginRight: 0,
                }}
                cancelButtonTitle={false}
            />
        </ShadowAround>
    );
};

export default CustomSearchBar;
