import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../utils/firebase";
import { theme } from "../tailwind.config";
import { useNavigation } from "@react-navigation/native";
import { updateDoc } from "firebase/firestore";
import { addLike, removeLike } from "../service/service";
import { MapIcon } from "../icons/Icons";
import { useLayoutEffect } from "react";


const TarjetaDeActividad = (props) => {
  const { actividad } = props;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const user = auth.currentUser
  const date = actividad.fecha.toDate().toLocaleString("es-ES", options);
  const [like, setLike] = useState(actividad.favoritos.includes(user))
  const [corazon, setEstado] = useState(like ? "heart-fill" : "heart");
  const [uri, setUri] = useState();
  const [ubicacion, setUbicacion] = useState();

  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + actividad.imagen
  );
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });

  const añadirFav = () => {
    if(like == true){
      removeLike(actividad.titulo, user.uid)
      setEstado("heart")
      setLike(false)
    }else{
      addLike(actividad.titulo, user.uid)
      setEstado("heart-fill")
      setLike(true)
    }
    
  };

  useEffect(() => {
    getAddress(actividad.ubicacion.latitude, actividad.ubicacion.longitude)
  },[])

  const navigation = useNavigation();
  const api_key = "pk.b1f2572cbfd397249713a6dadc0b962f";
  const base_url = "https://eu1.locationiq.com";

  const openCard = () => {
    navigation.push("Actividad", { actividad: actividad, uri: uri});
  };

  function setActiveColor(){
    switch(actividad.tipo){
      case "educación": return theme.colors.educacion; break
      case "ambiental": return theme.colors.costas; break
      case "costas": return theme.colors.costas; break
      case "deportivo": return theme.colors.deportivo; break
      case "comunitario": return theme.colors.comunitario; break
      case "cultural": return theme.colors.cultural; break
      default: return theme.colors.comunitario;
    }
  }

  function setTextColor(){
    switch(actividad.tipo){
      case "educación":
      case "costas":
      case "deportivo":
      case "comunitario": return theme.colors.ambiental; break
      case "cultural":
      case "ambiental": return theme.colors.ambiental; break;
    }
  }

  const getAddress = async (lat, lng) => {
    let response = await fetch(
      `${base_url}/v1/reverse?key=${api_key}&lat=${lat}&lon=${lng}&format=json&accept-language=es`
    );
    let data = await response.json();
    setUbicacion(data.display_name);
  }

  return (
    <TouchableOpacity onPress={openCard}>
      {/* Contenedor principal */}
      <View className="rounded-xl p-4 w-full"
            style = {{backgroundColor: setActiveColor()}}>
        {/* Contenedor contenido */}
        <View className="flex justify-between">
          {/* Titulo */}
          <Text className="text-xl font-bold"
                style = {{color: setTextColor()}}>{actividad.titulo}</Text>
          <View className="w-full">
            <Image
              className="rounded-md h-36 w-fit object-scale-down"
              source={{ uri: uri }}
            />
          </View>
          
          {/* Duracion */}
          <View className = "flex-row justify-end">
            <Text className = "text-base"
                  style = {{color: setTextColor()}}>{actividad.duracion}
            </Text>
          </View>
          {/* Separador vertical */}
          <View className = "w-full h-0.5 bg-costas"
                style = {{backgroundColor: setTextColor()}}></View>
          {/* Contenedor ubicacion, fecha y favoritos */}
          <View className="flex flex-row justify-around items-center">
            {/* Contenedor ubicacion y fecha */}
            <View className = "flex space-y-4  p-2">
              {/* Contenedor ubicación */}
              <View className = "flex-row justify-start items-center space-x-4">
                {MapIcon(20,30,setTextColor())}
                <Text className = "text-normal"
                      style = {{color: setTextColor()}}>Valencia</Text>
              </View>
              <View className = "flex-row justify-start items-center space-x-4">
                <Icon name="calendar"
                      type="octicon"
                      color={setTextColor()}
                      size={18}/>
                <Text className = "text-normal"
                      style = {{color: setTextColor()}}>{actividad.fecha.toDate().toLocaleString("es-ES", options)}</Text>
              </View>
            </View>
            <View className = "h-full w-0.5"
                style = {{backgroundColor: setTextColor()}}></View>
            <View className = "flex items-center bg-cultural">
              <Icon 
                name={corazon}
                type="octicon"
                color={setTextColor()}
                onPress={añadirFav}
                size={28}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TarjetaDeActividad;
