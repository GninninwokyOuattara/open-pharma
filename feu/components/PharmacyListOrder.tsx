import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLOR_SCHEME } from '../constants/colorSchemes'
import ShadowAround from './utility-components/ShadowAround'

type OrderType = "A proximité" | "Ascendant" | "Descendant"

const PharmacyListOrder = () => {

  const [orderMode, setOrderMode] = useState<OrderType>("A proximité")

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
          <Text style={{ fontWeight: "bold" }}>{orderMode}</Text>
        </View>
      </TouchableOpacity>
    </ShadowAround>
  )
}

export default PharmacyListOrder