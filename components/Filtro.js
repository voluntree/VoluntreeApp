import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'

const Filtro = (props) => {
  return (
    <View className = "items-center px-2.5">
        <Image className = "w-12 h-12 rounded-full" source = {props.imagen} />
        <Text className = "text-[12px] font-medium">{props.texto}</Text>
    </View>
  )
}

export default Filtro