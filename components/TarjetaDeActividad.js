import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import foto from '../images/bosqueSoleado.jpg';

const TarjetaDeActividad = () => {

  return (
    <TouchableOpacity>
      <View className="rounded-t-[15px] rounded-b-[15px] bg-zinc-300">
        <View className="rounded-tl-[15px] rounded-br-[15px] absolute z-10 w-fit bg-lime-700">
          <Text className="pl-2 pr-2 text-white font-semibold">
            Reforestacion
          </Text>
        </View>
        <Image
          className="rounded-t-[15px]"
          source={foto}
          style={styles.fotoTarjeta}
        />
        <View className="justify-between flex-row items-center pr-2">
          <Text className="m-2">TarjetaDeActividad</Text>
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