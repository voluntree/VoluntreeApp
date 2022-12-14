import { View, Text, TouchableOpacityBase, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Image } from 'react-native-elements'
import { theme } from '../../tailwind.config';

const Filtro = (props) => {

  const [activo, setActivo] = useState(props.isActivo);

  const onPress = () => {
    setActivo(!activo)
    props.AddCategoria(props.value, !activo)
  }
 
  function setActiveColor(){
    switch(props.value){
      case "educacion": return theme.colors.educacion; break
      case "ambiental": return theme.colors.ambiental; break
      case "costas": return theme.colors.costas; break
      case "deportivo": return theme.colors.deportivo; break
      case "comunitario": return theme.colors.comunitario; break
      case "cultural": return theme.colors.cultural; break
      default: return theme.colors.comunitario;
    }
  }

  function setTextColor(){
    switch(props.value){
      case "educacion":
      case "costas":
      case "deportivo":
      case "comunitario": return theme.colors.ambiental; break
      case "cultural":
      case "ambiental": return theme.colors.costas
    }
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="rounded-md h-10 justify-center items-center border-deportivo mr-2" 
            style={{backgroundColor: activo ? setActiveColor() : null,
                    borderWidth: activo ? null : 2}}>
          <Text className="text-sm font-normal px-2"
                style = {{color: activo ? setTextColor() : theme.colors.ambiental}}>{props.texto}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Filtro