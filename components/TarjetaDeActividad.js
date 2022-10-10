import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import foto from '../images/bosqueSoleado.jpg';
import {Icon} from "react-native-elements";


const TarjetaDeActividad = (tarjeta) => {

  
  const[corazon, setEstado] = useState("heart");

  const añadirFav = ()=> {
    setEstado("heart-fill")
  }

  return (
    <TouchableOpacity>
      <View
        
        className="rounded-t-[15px] rounded-b-[15px]"
      >
        <View className="rounded-tl-[15px] rounded-br-[15px] absolute z-10 w-fit bg-pinTarjeta-reforestacion">
          <Text className="pl-2 pr-2 text-white font-semibold">
            Reforestacion
          </Text>
        </View>
        <Image
          className="rounded-t-[15px]"
          source={foto}
          style={styles.fotoTarjeta}
        />
        <View className="justify-between flex-row items-center pr-2 bg-[#ffffff] rounded-br-[15px] rounded-bl-[15px]">
          <Text className="m-2">{tarjeta.descripcion}</Text>
          <Icon
            name={corazon}
            type="octicon"
            color="#517FA4"
            onPress={añadirFav}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    fotoTarjeta: {
        width: 350,
        height: 180,
    }
})

export default TarjetaDeActividad