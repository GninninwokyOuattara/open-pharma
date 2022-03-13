import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

import ShadowAround from "../../utility-components/ShadowAround";
import TextWithIcons from "../../utility-components/TextWithIcons";
import { LocationObject } from "expo-location";

import { calculateDistance } from "../../../utils/calculateDistance";
import { convertToReadableDistance } from "../../../utils/convertToReadableDistance";

import {
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";

interface Data {
    pharmacyName: string;
    pharmacyLocation: string;
    distance?: number;
    status?: "Ouvert" | "Fermé" | "Ferme bientot";
}

interface Props {
    imageUrl: string;
    data: Data;
    // distance: number;
    onPress?: () => void;
}

const PharmaItem: React.FC<Props> = ({ imageUrl, data, onPress }) => {
    // console.log(data.distance);
    // const pharmaciePosition = `${location?.coords.latitude}, ${location?.coords.longitude}`;

    // pharmaciePosition && console.log(pharmaciePosition);
    // console.log(distance);
    return (
        <ShadowAround>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.container}>
                    <Image
                        style={styles.innerImageContainer}
                        source={{
                            uri: imageUrl,
                        }}
                    ></Image>
                    <View style={styles.innerInfoContainer}>
                        <View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <Text style={styles.headerText}>
                                    {data.pharmacyName}
                                </Text>
                            </ScrollView>
                            <ScrollView horizontal={true}>
                                <Text style={styles.infoText}>
                                    {data.pharmacyLocation}
                                </Text>
                            </ScrollView>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <TextWithIcons
                                name="map-marker-distance"
                                type="material-community"
                                marginRight={10}
                                color="#C6C6C6"
                                text={`${
                                    data.distance
                                        ? convertToReadableDistance(
                                              data.distance
                                          )
                                        : 0
                                }`}
                                size={25}
                                textStyle={{
                                    fontSize: 20,
                                    fontWeight: "500",
                                    color: "#C6C6C6",
                                    marginLeft: 5,
                                }}
                            />
                            <TextWithIcons
                                name="map-marker-distance"
                                type="material-community"
                                color="#cecece"
                                text="30"
                                size={25}
                                textStyle={{
                                    fontSize: 20,
                                    fontWeight: "500",
                                    color: "#cecece",
                                    marginLeft: 5,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ShadowAround>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 110,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 7,
        marginVertical: 10,
        // marginHorizontal: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    innerImageContainer: {
        width: "30%",
        height: "100%",
        backgroundColor: "blue",
        borderRadius: 15,
        marginRight: 5,
    },
    innerImage: {
        height: "80%",
        width: "80%",
        backgroundColor: "blue",
    },
    innerInfoContainer: {
        height: "100%",
        width: 50,
        flex: 1,
        justifyContent: "space-between",
        // backgroundColor: "red",
        // padding: 5,
    },
    headerText: { fontWeight: "500", fontSize: 20 },
    infoText: {
        color: "#A7A7A7",
    },
});

export default PharmaItem;
