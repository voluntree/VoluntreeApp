import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../utils/firebase";
import { theme } from "../tailwind.config";

const ActividadAsociacion = (props) => {
  const [uri, setUri] = useState();
  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + props.imagen,
  );
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });

  return (
    <TouchableOpacity className="px-4 py-1.5">
      <View className="relative shadow-2xl rounded-xl overflow-hidden">
        <Image className="h-32 w-full" source={{ uri: uri }} />
        <View className="h-32 w-full absolute bg-[#27272a] opacity-60"></View>

        <View className="absolute w-full">
          <Text className="text-2xl mt-1 text-center font-bold text-[#fffff1]">
            {props.titulo}
          </Text>
        </View>

        <View className="absolute ml-72 pl-10 mt-20">
          <TouchableOpacity className="bg-[#e62344] w-10 h-10 rounded-lg">
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
