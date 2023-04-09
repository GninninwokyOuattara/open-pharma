import React, { useCallback } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR_SCHEME } from '../constants/colorSchemes'
import { SET_SORT_MODE } from '../stores/actions'
import { RootReducerType } from '../types/dataTypes'
import ShadowAround from './utility-components/ShadowAround'


export type OrderType = OrderWIthoutUserLocation | OrderWithUserLocation

type OrderWithUserLocation = "A proximité" | "Ascendant" | "Descendant"
type OrderWIthoutUserLocation = "Ascendant" | "Descendant"
interface Props {
  setIsProximityMode: React.Dispatch<React.SetStateAction<boolean>>

}

const PharmacyListOrder: React.FC<Props> = ({ setIsProximityMode }) => {



  const dispatch = useDispatch();
  const sortMode = useSelector((state: RootReducerType) => {
    return state.pharmacies.sortMode;
  });


  const toggleOrder = useCallback(() => {
    if (sortMode == "Proximity") {
      dispatch({ type: SET_SORT_MODE, data: "Alphabetical" })
    } else {
      dispatch({ type: SET_SORT_MODE, data: "Proximity" })
    }

  }, [sortMode])







  return (
    <ShadowAround>
      <TouchableOpacity onPress={toggleOrder}>

        <View style={{
          backgroundColor: COLOR_SCHEME.MEDIUM_ORANGE,
          alignSelf: "flex-start",
          padding: 5,
          marginRight: 5,
          borderRadius: 5,
          height: 28,
          // width: 50,
        }}>
          {/* <Text style={{ fontWeight: "500" }}>{orderMode}</Text> */}
          {
            sortMode == "Proximity"
              ? <Image source={require("../assets/distanceIcon.png")} style={{ height: 20, width: 20 }} />
              : <Image source={require("../assets/orderIcon.png")} style={{ height: 15, width: 20 }} />
          }

        </View>
      </TouchableOpacity>
    </ShadowAround>
  )
}

export default PharmacyListOrder