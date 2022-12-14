import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { theme } from "../../tailwind.config";
import { deleteActivity, getActivityById } from "../../service/service";
import { useNavigation } from "@react-navigation/native";
import { getUserInstance } from "../../service/LoginService"
import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')

const ActividadAsociacion = (props) => {
  const [uri, setUri] = useState();
  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + getUserInstance().nombre + "/" + props.imagen
  );
  
  getDownloadURL(reference).then((path) => {
    setUri(path);
  })
  
  const borrarActividad = () => {
    deleteActivity(props.titulo);
  }

  const navigation = useNavigation();

  const openActivityDetails = () => {
    getActivityById(props.titulo).then((activity) => {
      navigation.push("AssociationActivityDetails", { actividad: activity, uri: uri });
    });
  };

  return (
    <TouchableOpacity onPress={openActivityDetails} className = "mb-4">
      {/* Contenedor principal */}
      <View className=" rounded-xl p-4 w-full bg-costas">
        {/* Contenedor contenido */}
        <View className="flex justify-between space-y-2">
          {/* Titulo */}
          <View className = "flex-row w-full justify-between items-baseline">
            <Text className="text-xl font-bold w-[80%] text-ambiental">{props.titulo}</Text>
            <TouchableOpacity className = "bg-educacion absolute top-0 right-0 px-4 mb-0.5 rounded-full justify-center items-center"

            onPress = {()=> borrarActividad()}>
            <Icon  
                className = "my-1"
                name= "recycle"
                type="font-awesome"
                color={theme.colors.cultural}
                size={24}/>
              </TouchableOpacity>
          </View>
          <View className="w-full">
            <Image
              className="rounded-md h-36 w-fit object-scale-down"
              source={{ uri: uri }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActividadAsociacion;
