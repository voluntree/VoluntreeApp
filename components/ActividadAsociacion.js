import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../utils/firebase";
import { theme } from "../tailwind.config";
import { deleteActivity, getActivityById } from "../service/service";
import { useNavigation } from "@react-navigation/native";

const ActividadAsociacion = (props) => {
  const [actividad, setActividad] = useState();
  const [uri, setUri] = useState();
  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + props.imagen
  );

  useEffect(() => {
    getActivityById(props.titulo).then((res) => {
      setActividad(res);
    });
  }, []);
  
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });
  const borrarActividad = () => {
    deleteActivity(props.titulo);
  }

  const navigation = useNavigation();

  async function openDetails () {
    navigation.push("Details", { actividad: actividad });
  };

  return (
    <TouchableOpacity className="px-4 py-1.5" onPress={openDetails}>
      <View className="relative shadow-2xl rounded-xl overflow-hidden">
        <Image className="h-32 w-full" source={{ uri: uri }} />
        <View className="h-32 w-full absolute bg-[#27272a] opacity-60"></View>

        <View className="absolute w-full">
          <Text className="text-2xl mt-1 text-center font-bold text-[#fffff1]">
            {props.titulo}
          </Text>
        </View>
        <View className="absolute ml-72 right-0 bottom-0 m-2">
          <TouchableOpacity onPress={borrarActividad} className="bg-[#e62344] w-10 h-10 rounded-lg">
            <Icon
              className="pt-1"
              name="delete"
              type="material"
              color="#ffffff"
              size={28}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActividadAsociacion;
