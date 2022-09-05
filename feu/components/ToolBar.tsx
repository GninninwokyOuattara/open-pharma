import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserLocationContext } from '../contexts/UserLocationContext';
import PharmacyShowMode from './PharmacyDisplayMode';
import PharmacyListOrder from './PharmacyListOrder';
import CustomSearchBar from './screens-components/bottomsheet-components/CustomSearchBar';
import CustomShowsMyLocationButton from './utility-components/CustomShowsMyLocationButton';

interface Props {
    setIsProximityMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ToolBar: React.FC<Props> = ({ setIsProximityMode }) => {

    const insets = useSafeAreaInsets();
    const { location, errorMsg } = useContext(UserLocationContext);


    return (
        <View style={{ position: 'absolute', width: "100%", top: insets.top }}>
            <CustomSearchBar />
            <View style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                // borderWidth: 1,
                justifyContent: 'space-between'
            }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}

                    style={{
                        flex: 1,
                        flexDirection: "row"
                    }}>
                    <PharmacyShowMode />
                    <PharmacyListOrder {...{ setIsProximityMode }} />
                    {/* <Tag title={"Pharmacie de garde"} /> */}
                    {/* <Tag title={"Toutes les pharmacies"} /> */}
                    {/* <Tag title={"Toutes les pharmacies"} /> */}
                </ScrollView>
                <View style={{
                    // flex: 1,
                    flexDirection: "row-reverse",
                    marginRight: 10,
                }}>
                    {location && <CustomShowsMyLocationButton />}


                </View>

            </View>
            {/* Tags */}
        </View>
    )
}

export default ToolBar