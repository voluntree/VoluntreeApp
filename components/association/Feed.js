import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon, Image } from 'react-native-elements';
import { getAsociacionByID } from '../../service/service';
import ListaActividadesAsociacion from '../ListaActividadesAsociacion';

const Feed = () => {

    const[datosAsoc, setDatosAsoc] = useState([])
    getAsociacionByID("Modepran").then((datos) => {
        setDatosAsoc(datos);
    })
    const[hidden, setHidden] = useState(false)


  return (
    <TailwindProvider>
      <ScrollView>
        <View>
          <View className="items-center">
            <View className="h-60 w-full">
              <Image
                className="h-48 w-fit opacity"
                source={require("./protectoraAnimales.jpg")}
              />
            </View>
            <View className="absolute z-10 mt-36 flex-row items-center space-x-10">
              <TouchableOpacity>
                <View className="bg-[#fff] rounded-full h-14 w-14 justify-center">
                  <Icon name="mail" type="material" color="#00BFA5" size={36} />
                </View>
              </TouchableOpacity>
              <Image
                className="h-24 w-24 rounded-lg"
                source={require("./logoModepran.jpg")}
              />
              <TouchableOpacity>
                <View className="bg-[#fff] rounded-full h-14 w-14 justify-center">
                  <Icon
                    name="notifications"
                    type="material"
                    color="#00BFA5"
                    size={36}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View className="mt-1">
              <Text className="font-bold text-center text-lg">
                {datosAsoc.nombre}
              </Text>
              <Text className="text-center">{datosAsoc.tipoAsociacion}</Text>
            </View>
            <TouchableOpacity className="">
              ?
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TailwindProvider>
  );
}

export default Feed