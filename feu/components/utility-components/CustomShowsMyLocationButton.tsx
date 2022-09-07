import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { MapContext, MapContextType } from "../../contexts/MapContext";
import { UserContextType, UserLocationContext } from '../../contexts/UserLocationContext';

import { COLOR_SCHEME } from '../../constants/colorSchemes';



const CustomShowsMyLocationButton = () => {
  const { mapRef, mapSetting } = useContext(MapContext) as MapContextType;
  const { location } = useContext(UserLocationContext) as UserContextType;

  // Hooks


  return (

    <TouchableOpacity onPress={() => mapRef?.current?.animateToRegion({
      latitude: location!.coords.latitude - mapSetting.lat,
      longitude: location!.coords.longitude - mapSetting.lng,
      latitudeDelta: mapSetting.latDelta,
      longitudeDelta: mapSetting.lngDelta,
    })}>
      <View style={styles.iconContainer}>

        <MaterialIcons
          style={styles.myLocationIcon}
          name="my-location"
          size={20}
          color={COLOR_SCHEME.ORANGE}
        />
      </View>
    </TouchableOpacity>

  )
}



const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 3,
    // borderWidth: 1,
    // borderColor: 'black',
    // width: 60,
    // height: 60,
    padding: 5,
    backgroundColor: "white",
    // position: "absolute",
    // top: 200,
    // right: 10,
    borderRadius: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },

  myLocationIcon: {
    // borderColor: "red",
    // borderWidth: 1,
    // position: "relative",
    // right: 0,
    // top: 0,
    // left: 0,
    // bottom: 0,
  }
})

export default CustomShowsMyLocationButton