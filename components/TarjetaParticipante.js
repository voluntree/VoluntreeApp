import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon, Image } from "react-native-elements";
import { useEffect } from "react";
import { confirmAssistence, unconfirmAssistence } from "../service/service";
import { theme } from '../tailwind.config';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../utils/firebase";

const TarjetaParticipante = (props) => {
  useEffect(() => {}, [confirmado]);
  const [confirmado, setConfirmado] = useState(
    props.actividad.confirmados.includes(props.item.nombre)
  );
  const [uri, setUri] = useState()

  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/profileImages/voluntarios/" + props.item.uid + "/" + props.item.fotoPerfil
  );
  useEffect(() => {
    getDownloadURL(reference).then((path) => {
      setUri(path);
    });
  }, [])
  
  function changeAssistance() {
    setConfirmado(!confirmado);
    try{if (!confirmado)
      confirmAssistence(props.item.nombre, props.actividad.titulo);
    else unconfirmAssistence(props.item.nombre, props.actividad.titulo);}catch(e){console.log(e);}
  }

  return (
    <View className="h-16 w-fit my-2 mx-3 rounded-md">
      <TouchableOpacity className="flex-row justify-center items-center h-full">
        <View className="w-1/5 p-2 flex items-center">
          <Image source={{uri: uri}} className="border-solid rounded-full w-12 h-12 "></Image>
        </View>
        <View className="w-3/5 flex">
          <Text className="text-ambiental font-bold text-lg">{props.item.nombre} {props.item.apellidos}</Text>
          <Text className="text-ambiental text-sm">DNI: {props.item.dni}</Text>
        </View>

        {confirmado ? (
          <TouchableOpacity onPress={changeAssistance} className="flex w-1/5 h-full items-center justify-center rounded-r-md">
            <Icon name="check-circle-fill" type="octicon" color={theme.colors.ambiental} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={changeAssistance} className="flex w-1/5 h-full items-center justify-center rounded-r-md">
            <Icon name="x-circle-fill" type="octicon" color={theme.colors.rojo} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TarjetaParticipante;
