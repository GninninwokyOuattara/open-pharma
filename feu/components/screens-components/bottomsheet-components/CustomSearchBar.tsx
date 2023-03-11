import React, { useContext, useRef, useState } from "react";
import { SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";
import { useDispatch } from "react-redux";
import { BottomSheetRefContext } from "../../../contexts/BottomSheetRefContext";
import ShadowAround from "../../utility-components/ShadowAround";

const SafeSearchBar = SearchBar as unknown as React.FC<
    SearchBarBaseProps & { cancelButtonTitle?: boolean }
>;

const CustomSearchBar = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const { bottomSheetRef } = useContext(BottomSheetRefContext)
    const timeoutId = useRef<number | null>(null);



    const handleChange = (searchString: string) => {
        setSearch(searchString);
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }
        timeoutId.current = setTimeout(() => {
            dispatch({
                type: "SEARCH_PHARMACIES",
                data: searchString
            })
        }, 500)
    };


    return (
        <ShadowAround>

            <SafeSearchBar
                platform="ios"
                placeholder="Rechercher une pharmacie..."
                clearButtonMode="never"
                onChangeText={handleChange}
                onFocus={() => bottomSheetRef?.current?.expand()
                }
                onClear={() => handleChange("")}
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
