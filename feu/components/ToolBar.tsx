import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomSearchBar from './screens-components/bottomsheet-components/CustomSearchBar';
import Tag from './Tag';

const ToolBar = () => {

    const insets = useSafeAreaInsets();

    return (
        <View style={{ position: 'absolute', width: "100%", top: insets.top }}>
            <CustomSearchBar />
            <View style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                borderWidth: 1,
                justifyContent: 'space-between'
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row"
                }}>

                    <Tag />
                    <Tag />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row-reverse"
                }}>
                    <Tag />

                    {/* <CustomShowsMyLocationButton /> */}
                </View>

            </View>
            {/* Tags */}
        </View>
    )
}

export default ToolBar