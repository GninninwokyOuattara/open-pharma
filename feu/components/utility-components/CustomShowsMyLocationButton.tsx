import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { MapContext, MapContextType } from "../../contexts/MapContext";


const CustomShowsMyLocationButton = () => {
  const { mapRef } = useContext(MapContext) as MapContextType;

  return (
    
<TouchableOpacity onPress={() => console.log("Hello World")}>

    <View style={styles.iconContainer}>

      <MaterialIcons
        style={styles.myLocationIcon}
        name="my-location"
        size={24}
        color="#616161"
        // onPress={() => {
          // console.log("Hello!");
          // dispatch(settingActions.getLocation());
          // mapRef.current.animateToRegion({
          //   latitude: myLatitude,
          //   longitude: myLongitude,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // });
        // }}
      />
    </View>
</TouchableOpacity>

  )
}


const styles = StyleSheet.create({
  iconContainer : {
    // borderWidth: 1,
    // borderColor: 'black',
    width: 60,
    height: 60,
    backgroundColor: "white",
    position: "absolute",
    top: 690,
    left: 200,
    borderRadius: 50,
    flex : 1,
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