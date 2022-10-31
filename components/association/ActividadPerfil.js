import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native-elements';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from "../../utils/firebase";
import { useNavigation } from '@react-navigation/native';

const ActividadPerfil = (props) => {
    
  const navigation = useNavigation();

    const [uri, setUri] = useState();
    const reference = ref(
        storage,
        "gs://voluntreepin.appspot.com/cardImages/" + props.imagen
    );

    getDownloadURL(reference).then((path) => {
        setUri(path);
    });

  return (
    <TouchableOpacity className = "mt-4">
        <Image className="h-32 w-80 rounded-md" source={{ uri: uri }} />
    </TouchableOpacity>
  );
}

export default ActividadPerfil