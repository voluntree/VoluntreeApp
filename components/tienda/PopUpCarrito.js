import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectProductosCarrito, selectTotalCarrito } from '../../features/carritoSlice'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'


const PopUpCarrito = () => {

    const productos = useSelector(selectProductosCarrito);
    const navigation = useNavigation();
    const totalCarrito = useSelector(selectTotalCarrito);


  return (
    <View className="absolute bottom-6 w-full z-50">
      <TouchableOpacity className="mx-5 p-4 bg-educacion rounded-lg flex-row items-center space-x-1">
        <Text className="text-lg text-ambiental rounded-lg px-2 bg-[#d6b86d] font-extrabold">
          {productos.length}
        </Text>
        <Text className="flex-1 text-center font-extrabold text-ambiental text-lg">
          view carrito
        </Text>
        <Text className="text-lg text-ambiental font-extrabold">
          {totalCarrito} pts.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default PopUpCarrito