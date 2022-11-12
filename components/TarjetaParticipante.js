import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { useEffect } from "react";
import { confirmAssistence, unconfirmAssistence } from "../service/service";

const TarjetaParticipante = (props) => {
  useEffect(() => {}, [confirmado]);
  const [confirmado, setConfirmado] = useState(
    props.actividad.confirmados.includes(props.item.nombre)
  );

  function changeAssistance() {
    setConfirmado(!confirmado);
    try{if (!confirmado)
      confirmAssistence(props.item.nombre, props.actividad.titulo);
    else unconfirmAssistence(props.item.nombre, props.actividad.titulo);}catch(e){console.log(e);}
  }

  return (
    <View className="h-16 w-fit bg-blanco my-2 mx-3 rounded-md">
      <TouchableOpacity className="flex-row justify-center items-center h-full">
        <View className="w-1/5 p-2 flex items-center">
          <View className="border-solid rounded-full bg-bottomTabs w-12 h-12 "></View>
          <View className="border-solid border-2 rounded-full flex bg-blanco w-6 h-6 absolute right-1 bottom-1 items-center justify-start">
            <Text>0</Text>
          </View>
        </View>
        <View className="w-3/5 flex-row flex-wrap">
          <Text className="font-bold text-lg">{props.item.nombre} </Text>
          <Text className="font-bold text-lg">{props.item.apellidos}</Text>
          <Text className="font-bold text-sm text-[#333]">DNI: {props.item.ID}</Text>
        </View>

        {confirmado ? (
          <TouchableOpacity onPress={changeAssistance} className="flex bg-bottomTabs w-1/5 h-full items-center justify-center rounded-r-md">
            <Icon name="check-circle-fill" type="octicon" color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={changeAssistance} className="flex bg-[#cf0f0f] w-1/5 h-full items-center justify-center rounded-r-md">
            <Icon name="x-circle-fill" type="octicon" color="#fff" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TarjetaParticipante;
