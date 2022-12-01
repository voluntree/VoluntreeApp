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
    day: "numeric"
  };
  const user = auth.currentUser
  const date = actividad.fecha.toDate().toDateString("es-ES", options);
  const [like, setLike] = useState(actividad.favoritos.includes(user))
  const [corazon, setEstado] = useState(like ? "heart-fill" : "heart");
  const [uri, setUri] = useState();
  const [ubicacion, setUbicacion] = useState([]);

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
      getAddressFromCoordinates(actividad.ubicacion.latitude, actividad.ubicacion.longitude).then((value) => setUbicacion(value))
  },[])

  const navigation = useNavigation();
  const HERE_API_KEY = "xsVV1uwmlrIw2ZBMOi3Mb40lDrRO-SWYSkznK1yhrrs"

  const openCard = () => {
    navigation.push("Actividad", { actividad: actividad, uri: uri});
  };

  function setActiveColor(){
    switch(actividad.tipo){
      case "educación": return theme.colors.educacion; break
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
      case "educación":
      case "costas":
      case "deportivo":
      case "comunitario": return theme.colors.ambiental; break
      case "cultural":
      case "ambiental": return theme.colors.ambiental; break;
    }
  }

  function getAddressFromCoordinates( latitude, longitude ) {
    return new Promise((resolve) => {
      const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${HERE_API_KEY}&in=circle:${latitude},${longitude};r=100`
      fetch(url)
        .then(res => res.json())
        .then((resJson) => {
          // the response had a deeply nested structure :/
          if (resJson) {
            resolve(resJson.items[0].address)
          } else {
            resolve()
          }
        })
        .catch((e) => {
          console.log('Error in getAddressFromCoordinates', e)
          resolve()
        })
    })
  }

  return (
    <TouchableOpacity onPress={openCard} className = "mb-4">
      {/* Contenedor principal */}
      <View className="rounded-xl p-4 w-full bg-costas">
        {/* Contenedor contenido */}
        <View className="flex justify-between">
          {/* Titulo */}
          <View className = "flex-row w-full justify-between">
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
          <View className = "w-full h-0.5 bg-costas"
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
                      style = {{color: setTextColor()}}>{ubicacion.city},{ubicacion.county}</Text>
              </View>
              <View className = "flex-row justify-start items-center space-x-4">
                <Icon name="today"
                      type="material-icons"
                      color={setTextColor()}
                      size={24}/>
                <Text className = "text-normal"
                      style = {{color: setTextColor()}}>{actividad.fecha.toDate().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}, {actividad.fecha.toDate().toLocaleDateString("es-ES", options)}</Text>
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
