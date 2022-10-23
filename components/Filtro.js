import { View, Text, TouchableOpacityBase, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Image } from 'react-native-elements'

const Filtro = (props) => {

  const [activo, setActivo] = useState(props.isActivo);

  const onPress = () => {
    setActivo(!activo)
    props.AddCategoria(props.texto.toLowerCase(), !activo)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="px-4 pb-1 rounded-md m-[0.5px]" style={{backgroundColor: activo ? "#00BFA5" : null}}>
        <View className="items-center w-16 h-16">
          <Image className="w-12 h-12 rounded-full" source={props.imagen} />
          <Text className="text-[10px] font-semibold">{props.texto}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Filtro