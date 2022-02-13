import { Marker } from "react-native-maps";

import { View, Text } from "react-native";
import React from "react";

interface props {
    latitude: number;
    longitude: number;
}

const UserPositionMarker: React.FC<props> = (props) => {
    console.log(props);
    return (
        <Marker coordinate={{ ...props }}>
            <View style={{ backgroundColor: "red", padding: 10 }}>
                <Text>SF</Text>
            </View>
        </Marker>
    );
};

export default UserPositionMarker;
