import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native-elements';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from "../../utils/firebase";
import { useNavigation } from '@react-navigation/native';

const ActividadPerfil = (props) => {
    
  const navigation = useNavigation();
  const {actividad} = props;

    const [uri, setUri] = useState();
    const reference = ref(
        storage,
        "gs://voluntreepin.appspot.com/cardImages/" + actividad.imagen
    );

    getDownloadURL(reference).then((path) => {
        setUri(path);
    });

    const openCard = () => {
      navigation.push("Actividad", { actividad: actividad, uri: uri});
    };

  return (
    <TouchableOpacity
      className="mt-4 items-center justify-center h-32 w-80"
      onPress={openCard}
    >
      <Image className="h-32 w-80 rounded-md" source={{ uri: uri }} />
      <View className="h-32 w-full rounded-md absolute bg-[#111] opacity-40"></View>
      <Text className="z-1 absolute font-bold text-[#fff] text-center text-xl truncate">
        {actividad.titulo}
      </Text>
    </TouchableOpacity>
  );
}

export default ActividadPerfil