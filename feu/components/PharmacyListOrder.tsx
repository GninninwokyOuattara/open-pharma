import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLOR_SCHEME } from '../constants/colorSchemes'
import { UserLocationContext } from '../contexts/UserLocationContext'
import { changePharmacyDisplayOrder } from '../stores/pharmaciesActions'
import { RootReducerType } from '../types/dataTypes'
import ShadowAround from './utility-components/ShadowAround'

type OrderType = "A proximité" | "Ascendant" | "Descendant"

const PharmacyListOrder = () => {

  const [orderMode, setOrderMode] = useState<OrderType>("A proximité")
  const { location } = useContext(UserLocationContext)
  const dispatch = useDispatch();
  const pharmaciesDatas = useSelector((state: RootReducerType) => {
    return state.pharmacies.toDisplayInBottomSheet;
  });



  const toggleOrder = () => {
    let newOrder: OrderType
    if (orderMode === "A proximité") {
      newOrder = "Ascendant"
    } else if (orderMode === "Ascendant") {
      newOrder = "Descendant"
    } else {
      newOrder = "A proximité"
    }

    setOrderMode(newOrder)
  }

  useEffect(() => {

    if (orderMode === "A proximité") {
      console.log("Ordering by proximity")
      // dispatch(changePharmacyDisplayOrder(pharmaciesDatas, orderMode))
    } else if (orderMode === "Ascendant") {
      console.log("Ordering by Ascendancy")
      dispatch(changePharmacyDisplayOrder(pharmaciesDatas, orderMode))

    } else if (orderMode === "Descendant") {
      console.log("Ordering by Descendancy")
      dispatch(changePharmacyDisplayOrder(pharmaciesDatas, orderMode))


    }

  }, [orderMode])
  return (
    <ShadowAround>
      <TouchableOpacity onPress={toggleOrder}>

        <View style={{
          // borderWidth: 1,
          // borderColor: "black",
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