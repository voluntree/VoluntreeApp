import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../utils/firebase";
import { theme } from "../tailwind.config";
import { useNavigation } from "@react-navigation/native";
import { updateDoc } from "firebase/firestore";
import { addLike, getAssociationByName, removeLike, updateActivity } from "../service/service";
import { MapIcon } from "../icons/Icons";
import { useLayoutEffect } from "react";


const TarjetaDeActividad = (props) => {
  const { actividad } = props;
  const options = {
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric"
  };
  const user = auth.currentUser
  const [like, setLike] = useState(actividad.favoritos.includes(user.uid))
  const [corazon, setEstado] = useState(like ? "heart-fill" : "heart");
  const [uri, setUri] = useState();
  const [ubicacion, setUbicacion] = useState(actividad.address);

  const date = () => {
    var fecha = actividad.fecha.toDate();
    return String(fecha.getHours()).padStart(2, '0') + ":" + String(fecha.getMinutes()).padStart(2, '0') + " " + String(fecha.getDate()).padStart(2, '0') + "/" 
    + String(fecha.getMonth() + 1).padStart(2, '0') + "/"
    + String(fecha.getFullYear())
  }

  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + actividad.asociacion + "/" + actividad.imagen
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


  const navigation = useNavigation();

  const openCard = () => {
    navigation.push("Activity", { actividad: actividad, uri: uri});
  };

  function setActiveColor(){
    switch(actividad.tipo){
      case "educacion": return theme.colors.educacion; break
      case "ambiental": return theme.colors.ambiental; break
      case "costas": return theme.colors.costas; break
      case "deportivo": return theme.colors.deportivo; break
      case "comunitario": return theme.colors.comunitario; break
      case "cultural": return theme.colors.cultural; break
      default: return theme.colors.comunitario;
    }
  }

  function setTextColor(){
    switch(actividad.tipo){
      case "educacion":
      case "costas":
      case "deportivo":
      case "comunitario": return theme.colors.ambiental; break
      case "cultural":
      case "ambiental": return theme.colors.ambiental; break;
    }
  }

  return (
    <TouchableOpacity onPress={openCard} className = "mb-4">
      {/* Contenedor principal */}
      <View className="rounded-xl p-4 w-full bg-blanco ">
        {/* Contenedor contenido */}
        <View className="flex justify-between">
          {/* Titulo */}
          <View className = "flex-row w-full justify-between items-baseline">
            <Text className="text-xl font-bold w-[80%]"
                  style = {{color: setTextColor()}}>{actividad.titulo}
            </Text>
            <View className = "h-3 w-6 rounded-sm"
                  style = {{backgroundColor: setActiveColor()}}></View>
          </View>
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
          <View className = "w-full h-0.5"
                style = {{backgroundColor: setTextColor()}}></View>
          {/* Contenedor ubicacion, fecha y favoritos */}
          <View className="flex flex-row justify-between items-center h-20">
            {/* Contenedor ubicacion y fecha */}
            <View className = "flex w-[70%] space-y-4  p-2">
              {/* Contenedor ubicación */}
              <View className = "flex-row justify-start items-center space-x-4 overflow-scroll">
                <Icon 
                  name="place"
                  type="material-icons"
                  color={setTextColor()}
                  onPress={añadirFav}
                  size={28}
                />
                <Text className = "text-normal "
                      style = {{color: setTextColor()}}>{ubicacion.city},{ubicacion.county}
                </Text>
              </View>
              <View className = "flex-row justify-start items-center space-x-4">
                <Icon name="today"
                      type="material-icons"
                      color={setTextColor()}
                      size={24}/>
                <Text className = "text-normal"
                      style = {{color: setTextColor()}}>{date()}</Text>
              </View>
            </View>
            <View className = "flex items-center grow border-l-2 h-full mx-2 justify-center"
                  style = {{borderColor: setTextColor()}}>
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
