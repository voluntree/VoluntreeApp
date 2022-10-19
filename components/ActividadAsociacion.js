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
    <TouchableOpacity className="px-2">
      <View className="flex-row m-1.5 items-center space-x-2 h-24 rounded-r-[15px] rounded-l-[15px] bg-[#aaa]">
        <View>
          <Image className="h-24 w-24 rounded-l-[15px]" source={{ uri: uri }} />
        </View>
        <View className="h-20 w-64">
          <Text className="text-sm">{props.titulo}</Text>
          <Text
            className="text-xs"
            adjustsFontSizeToFit={true}
            
          >
            {props.descripcion}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActividadAsociacion;
