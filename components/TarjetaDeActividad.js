import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../utils/firebase";
import { theme } from "../tailwind.config";
import { useNavigation } from "@react-navigation/native";
import { updateDoc } from "firebase/firestore";
import { addLike, removeLike } from "../service/service";


const TarjetaDeActividad = (props) => {
  const { actividad } = props;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const user = "Catalin"
  const date = actividad.fecha.toDate().toLocaleString("es-ES", options);
  const [like, setLike] = useState(actividad.favoritos.includes(user))
  const [corazon, setEstado] = useState(like ? "heart-fill" : "heart");
  const [uri, setUri] = useState();

  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + actividad.imagen
  );
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });

  const añadirFav = () => {
    if(like == true){
      removeLike(actividad.titulo, user)
      setEstado("heart")
      setLike(false)
    }else{
      addLike(actividad.titulo, user)
      setEstado("heart-fill")
      setLike(true)
    }
    
  };

  const navigation = useNavigation();

  const openCard = () => {
    navigation.push("Actividad", { actividad: actividad, uri: uri});
  };

  return (
    <TouchableOpacity onPress={openCard}>
      <View className="rounded-t-[15px] rounded-b-[15px] w-fit mx-2 py-4">
        <View className="w-full">
          <Image
            className="rounded-t-[15px] h-48 w-82 object-scale-down"
            source={{ uri: uri }}
          />
        </View>
        <View className="justify-between px-2 bg-[#ffffff] rounded-br-[15px] rounded-bl-[15px]">
          <Text className="text-xl pl-1.5 font-bold">{actividad.titulo}</Text>
          <Text className=" bg-[#ffffff] pl-1.5">{actividad.descripcion}</Text>

          <View className="justify-between pb-2 pr-2 pt-2 flex-row relative">
            <View className="items-center flex-row ml-1">
              <View className="bg-[#00bf9f83]  rounded-full">
                <Text className="text-slate-300 mx-1.5">{date}</Text>
              </View>
              <Text> · </Text>
              <View className="bg-[#aaaaaa] rounded-full">
                <Text className="mx-3">{actividad.duracion}</Text>
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
      </View>
    </TouchableOpacity>
  );
};

export default TarjetaDeActividad;
