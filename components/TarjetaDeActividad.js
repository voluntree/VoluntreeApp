import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import foto from '../images/bosqueSoleado.jpg';
import {Icon} from "react-native-elements";
import { getDownloadURL, ref} from 'firebase/storage';
import { storage } from '../utils/firebase';
import { theme } from '../tailwind.config';
import { Timestamp as time } from 'firebase/firestore';


const TarjetaDeActividad = (props) => {
  
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = props.fecha.toDate().toLocaleString("es-ES", options);
  const[corazon, setEstado] = useState("heart");
  const[uri, setUri] = useState();

  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + props.imagen
  );
  getDownloadURL(reference).then((path) => {
    setUri(path)
  
  /*setUrl(path)).catch((error) => {
    switch (error.code) {
      case "storage/object-not-found":
        // File doesn't exist
        break;
      case "storage/unauthorized":
        // User doesn't have permission to access the object
        break;
      case "storage/canceled":
        // User canceled the upload
        break;

      case "storage/unknown":
        // Unknown error occurred, inspect the server response
        break;
    }*/
  })

  const añadirFav = ()=> {
    setEstado("heart-fill")
  }

  return (
    <TouchableOpacity className="rounded-t-[15px] rounded-b-[15px] w-96 py-4">
      <Image className="rounded-t-[15px] h-48 w-82 " source={{ uri: uri }} />
      <View className="justify-between w-full pr-2 bg-[#ffffff] rounded-br-[15px] rounded-bl-[15px]">
        <Text className="ml-3 text-xl font-bold">{props.titulo}</Text>
        <Text className="ml-3 bg-[#ffffff] w-screen">{props.descripcion}</Text>

        <View className="justify-between pb-2 pr-2 pt-2 flex-row relative">
          <View className="items-center flex-row space-x-2">
            <View className="bg-slate-400 relative">
              <Text className="pl-3 text-slate-300">{date} ·</Text>
            </View>
            <View>
              <Text className="text-slate-300">{props.duracion}</Text>
            </View>
          </View>
          <Icon
            name={corazon}
            type="octicon"
            color={theme.colors.bottomTabs}
            onPress={añadirFav}
            size={28}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    fotoTarjeta: {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 350,
        height: 180
    }
})

export default TarjetaDeActividad