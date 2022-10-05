import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import foto from '../images/bosqueSoleado.jpg'

const TarjetaDeActividad = () => {
  return (
    <TouchableOpacity>
      <View className="rounded-t-[15px] rounded-b-[15px] bg-zinc-300">
        <View className="bg-amber-500 rounded-tl-[15px] rounded-br-[15px] absolute z-10 w-fit">
          <Text className = "pl-2">tipoDeVoluntariado</Text>
        </View>
        <Image
          className="rounded-t-[15px]"
          source={foto}
          style={styles.fotoTarjeta}
        />
        <Text className="m-2">TarjetaDeActividad</Text>
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