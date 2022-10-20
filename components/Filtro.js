import { View, Text, TouchableOpacityBase, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'

const Filtro = (props) => {
  return (
    <TouchableOpacity>
      <View className="px-4 pb-1">
        <View className="items-center w-16 h-16">
          <Image className="w-12 h-12 rounded-full" source={props.imagen} />
          <Text className="text-[10px] font-semibold">{props.texto}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Filtro