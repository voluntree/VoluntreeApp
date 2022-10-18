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
    "gs://voluntreepin.appspot.com/cardImages/" + props.imagen
  );
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });

  return <Text>HOOOOLAAAA</Text>;
};

export default ActividadAsociacion;
