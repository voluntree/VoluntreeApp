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
    getDownloadURL(ref(storage,"gs://voluntreepin.appspot.com/profileImages/asociaciones/" + props.asociacion.fotoPerfil))
      .then((path) => {
        setImagen(path);
      });
  }, [])
  
  return (
        <View className = "bg-educacion flex-row justify-between items-center p-2 rounded-md mb-2 w-full">
          <View className = "flex-row items-center space-x-2 w-[60%]">
            <Image className="border-solid rounded-full w-12 h-12" 
                   source={{uri: imagen}}/>
            <Text className=" text-ambiental font-bold text-base">{props.asociacion.nombre}</Text>
            </View>   
          <TouchableOpacity onPress={() => {unfollowAsociation(props.usuario, props.asociacion.nombre)}}>
            <View className = "bg-costas p-2 px-4 rounded-md">
              <Text className = "text-ambiental">Siguiendo</Text>
            </View>
          </TouchableOpacity>
        </View>
  );
};

export default TarjetaFollowingAssociation;
