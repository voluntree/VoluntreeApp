import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon, Image } from "react-native-elements";
import { useEffect } from "react";
import { theme } from "../tailwind.config";
import { unfollowAsociation } from "../service/service";
import { getDownloadURL, ref} from "firebase/storage";
import { storage } from "../utils/firebase";

const TarjetaFollowingAssociation = (props) => {
  const [imagen, setImagen] = useState()
  
  useEffect (() => {
    getDownloadURL(ref(storage,"gs://voluntreepin.appspot.com/" + props.asociacion.fotoPerfil))
      .then((path) => {
        setImagen(path);
      });
  }, [])
  
  return (
        <View className = "bg-blanco flex-row justify-between items-center p-2 rounded-md mb-2">
          <View className = "flex-row items-center space-x-2">
            <Image className="border-solid border-2 border-[#ececec] rounded-full w-12 h-12" 
                   source={{uri: imagen}}/>
            <Text className="font-bold text-lg">{props.asociacion.nombre}</Text>
            </View>   
          <TouchableOpacity onPress={() => {unfollowAsociation(props.usuario, props.asociacion.nombre)}}>
            <View className = "bg-bottomTabs p-2 px-4 rounded-md">
              <Text className = "text-[#fff]">Siguiendo</Text>
            </View>
          </TouchableOpacity>
        </View>
  );
};

export default TarjetaFollowingAssociation;
