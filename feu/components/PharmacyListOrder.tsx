import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR_SCHEME } from '../constants/colorSchemes'
import { UserLocationContext } from '../contexts/UserLocationContext'
import { changePharmacyDisplayOrder } from '../stores/pharmaciesActions'
import { RootReducerType } from '../types/dataTypes'
import ShadowAround from './utility-components/ShadowAround'

export type OrderType = OrderWIthoutUserLocation | OrderWithUserLocation

type OrderWithUserLocation = "A proximité" | "Ascendant" | "Descendant"
type OrderWIthoutUserLocation = "Ascendant" | "Descendant"
interface Props {
  setIsProximityMode: React.Dispatch<React.SetStateAction<boolean>>

}

const PharmacyListOrder: React.FC<Props> = ({ setIsProximityMode }) => {

  const { location } = useContext(UserLocationContext)
  const [orderMode, setOrderMode] = useState<OrderType>(() => {
    if (location) {
      return "A proximité"
    }
    return "Ascendant"
  })

  const dispatch = useDispatch();
  const pharmaciesDatas = useSelector((state: RootReducerType) => {
    return state.pharmacies.toDisplayInBottomSheet;
  });


  const toggleOrder = () => {
    let newOrder: OrderType
    if (location) {
      if (orderMode === "A proximité") {
        newOrder = "Ascendant"
      } else if (orderMode === "Ascendant") {
        newOrder = "Descendant"
      } else {
        newOrder = "A proximité"
      }

    } else {
      if (orderMode === "Ascendant") {
        newOrder = "Descendant"
      } else {
        newOrder = "Ascendant"
      }
    }

    setOrderMode(newOrder)
  }


  useEffect(() => {


    if (orderMode === "A proximité") {
      dispatch(changePharmacyDisplayOrder(pharmaciesDatas, orderMode))
      setIsProximityMode(true)

    } else {
      if (orderMode === "Ascendant") {
        dispatch(changePharmacyDisplayOrder(pharmaciesDatas, orderMode))

      } else if (orderMode === "Descendant") {
        dispatch(changePharmacyDisplayOrder(pharmaciesDatas, orderMode))
      }
      setIsProximityMode(false)
    }




  }, [orderMode])


  return (
    <ShadowAround>
      <TouchableOpacity onPress={toggleOrder}>

        <View style={{
          backgroundColor: COLOR_SCHEME.MEDIUM_ORANGE,
          alignSelf: "flex-start",
          padding: 5,
          marginRight: 5,
          borderRadius: 5
        }}>
          <Text style={{ fontWeight: "500" }}>Ordre : {orderMode}</Text>
        </View>
      </TouchableOpacity>
    </ShadowAround>
  )
}

export default PharmacyListOrder