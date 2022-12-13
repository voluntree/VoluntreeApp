import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native-elements";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { useNavigation } from "@react-navigation/native";

const ActividadPerfil = (props) => {
  const navigation = useNavigation();
  const { actividad } = props;

  const [uri, setUri] = useState();
  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + actividad.asociacion + "/" + actividad.imagen
  );

  getDownloadURL(reference).then((path) => {
    setUri(path);
  });

  const openCard = () => {
    navigation.push("Activity", { actividad: actividad, uri: uri });
  };

  return (
    <TouchableOpacity
      className="m-2 w-80 h-auto flex items-center justify-center rounded-md"
      onPress={openCard}
    >
      <Image className="w-80 h-36 rounded-md" source={{ uri: uri }} />
      <View className="absolute w-80 h-36 bg-[#333] opacity-30 rounded-md"></View>
      <View className="absolute w-80 h-36 items-center justify-center rounded-md">
        <Text className="flex flex-wrap text-xl text-blanco font-semibold">
          {actividad.titulo}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActividadPerfil;
