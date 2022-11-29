import { View, Text, TouchableOpacityBase, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Image } from 'react-native-elements'
import { theme } from '../../tailwind.config';

const Filtro = (props) => {

  const [activo, setActivo] = useState(props.isActivo);

  const onPress = () => {
    setActivo(!activo)
    props.AddCategoria(props.texto.toLowerCase(), !activo)
  }
 
  function setActiveColor(){
    switch(props.texto){
      case "Educación": return theme.colors.educacion; break
      case "Ambiental": return theme.colors.ambiental; break
      case "Costas": return theme.colors.costas; break
      case "Deportivo": return theme.colors.deportivo; break
      case "Comunitario": return theme.colors.comunitario; break
      case "Cultural": return theme.colors.cultural; break
      default: return theme.colors.comunitario;
    }
  }

  function setTextColor(){
    switch(props.texto){
      case "Educación":
      case "Costas":
      case "Deportivo":
      case "Comunitario": return theme.colors.ambiental; break
      case "Cultural":
      case "Ambiental": return theme.colors.costas
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