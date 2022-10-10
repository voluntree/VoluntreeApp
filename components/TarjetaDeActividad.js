import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import foto from '../images/bosqueSoleado.jpg';
import {Icon} from "react-native-elements";
import { getDownloadURL, ref} from 'firebase/storage';
import { storage } from '../utils/firebase';


const TarjetaDeActividad = (props) => {
  
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
    <TouchableOpacity>
      <View className="rounded-t-[15px] rounded-b-[15px]">
        <View className="rounded-tl-[15px] rounded-br-[15px] absolute z-10 w-fit bg-pinTarjeta-reforestacion">
          <Text className="pl-2 pr-2 text-white font-semibold">
            {props.tipo}
          </Text>
        </View>
        <Image
          className="rounded-t-[15px]"
          source={{uri: uri}}
          style={styles.fotoTarjeta}
        />
        <View className="w-30 justify-end flex-row items-center pr-2 bg-[#ffffff] rounded-br-[15px] rounded-bl-[15px]">
          <Icon
            name={corazon}
            type="octicon"
            color="#517FA4"
            onPress={añadirFav}
          />
        </View>
        <View>
          <Text className="m-2 bg-[#ffffff]">{props.descripcion}</Text>
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