import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Formik } from "formik";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../utils/firebase";
import { storage, uploadBytes } from "../../utils/firebase";
import { ref } from "firebase/storage";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  createActivity,
  getActivityByName,
  pickImage,
  saveActivity,
  storeImage,
} from "../../service/service";

const CrearOferta = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [textD, setTextD] = useState("Fecha");
  const [textT, setTextT] = useState("Hora");

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Horas: ' + tempDate.getHours() + ' | Minutos :' + tempDate.getMinutes();
    setText(fDate + ' - ' + fTime);
    console.log(fDate + ' (' + fTime + ')');
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      return result;
    }
  };

  if (hasGalleryPermission === false) {
    <Text>No tiene acceso a la galería</Text>;
  }

  const storeImage = async () => {
    setUploading(true);
    console.log(image);
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const path = `cardImages/${filename}`;
    const storageRef = ref(storage, path);
    const img = await fetch(image);
    const bytes = await img.blob();

    try {
      await uploadBytes(storageRef, bytes).then(setUploading(false));
    } catch (e) {
      console.log(e);
    }
  };

  // function to check values
  const correctData = (values) => {
    if (
      values.titulo.trim().length == 0 ||
      values.tipo.trim().length == 0 ||
      values.max_participantes.trim().length == 0 ||
      values.duracion.trim().length == 0 ||
      values.descripcion.trim().length == 0 ||
      values.imagen.trim().length == 0
    ) {
      Alert.alert("Error", "Por favor, rellene todos los campos");
      return false;
    }
    if (isNaN(values.max_participantes)) {
      Alert.alert("Error", "El número de participantes debe ser un número entre 6 y 100");
      return false;
    }
    if (values.max_participantes < 6 || values.max_participantes > 100) {
      Alert.alert(
        "Error",
        "El número de participantes debe estar entre 6 y 100"
      );
      return false;
    }
    if (isNaN(values.duracion)) {
      Alert.alert("Error", "La duración debe ser un número entre 1 y 8");
      return false;
    }
    if (values.duracion < 1 || values.duracion > 8) {
      Alert.alert("Error", "La duración debe estar entre 1 y 8 horas");
      return false;
    }
    if (values.descripcion.length > 600) {
      Alert.alert(
        "Error",
        "La descripción no puede tener más de 600 caracteres"
      );
      return false;
    }
    return true;
  };

  return (
    <ScrollView className="p-5 pt-20">
      <Formik
        initialValues={{
          asociacion: "Green Peace",
          titulo: "",
          tipo: "",
          favoritos: [],
          num_participantes: 0,
          max_participantes: 0,
          participantes: [],
          confirmados: [],
          duracion: "",
          descripcion: "",
          imagen: "",
          fecha: "",
          ubicacion: "",
        }}
        onSubmit={(values) => {
          values.fecha = new Date();
          values.imagen = image.substring(image.lastIndexOf("/") + 1);

          if (correctData(values)) {
            values.duracion += "h";
            values.max_participantes = Number(values.max_participantes);
            storeImage();
            createActivity(values);
          }
        }}
      >
        {(props) => (
          <View>
            <View className="flex-row">
              <View className="mr-2 space-y-5">
                <TextInput
                  className="text-xs w-44 h-10 border border-[#6b7280] rounded-md p-2"
                  placeholder="Título"
                  onChangeText={props.handleChange("titulo")}
                  value={props.values.titulo}
                />
                <TextInput
                  className="text-xs w-44 h-10 border border-[#6b7280] rounded-md p-2"
                  placeholder="Tipo"
                  onChangeText={props.handleChange("tipo")}
                  value={props.values.tipo}
                />
                <View className="flex-row">
                  <TextInput
                    className="text-xs w-20 h-10 border border-[#6b7280] rounded-md p-2"
                    keyboardType="numeric"
                    placeholder="Participantes"
                    onChangeText={props.handleChange("max_participantes")}
                    value={props.values.max_participantes}
                  />
                  <TextInput
                    className="text-xs w-20 h-10 border border-[#6b7280] rounded-md p-2 ml-4"
                    keyboardType="numeric"
                    placeholder="Duración (horas)"
                    onChangeText={props.handleChange("duracion")}
                    value={props.values.duracion}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    pickImage().then((result) => {
                      props.setFieldValue("imagen", result.uri);
                    });
                  }}
                  value={props.values.imagen}
                >
                  <View className="w-32 max-w-max h-40 items-center justify-center border-2 border-[#d1d5db] bg-[#e5e7eb] rounded-md ml-2">
                    {props.values.imagen ? (
                      <Image
                        className="w-40 h-28"
                        source={{ uri: props.values.imagen }}
                      />
                    ) : (
                      <Text className="text-4xl text-center text-[#ffffff]">
                        +
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row space-x-4">
            <TouchableOpacity onPress={() => {showMode('date')}}>
              <View className="w-24 h-10 border border-[#6b7280] rounded-md justify-center p-2 mt-5">
                <Text className="text-xs text-[#979797]">{textD}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {showMode('time')}}>
              <View className="w-16 h-10 border border-[#6b7280] rounded-md justify-center p-2 mt-5">
                <Text className="text-xs text-[#979797]">{textT}</Text>
              </View>
            </TouchableOpacity>
            </View>
            <TextInput
              className="text-xs text-justify w-auto h-auto border border-[#6b7280] rounded-md p-2 mt-4 "
              multiline={true}
              numberOfLines={10}
              placeholder="Descripción"
              onChangeText={props.handleChange("descripcion")}
              value={props.values.descripcion}
              style={{ textAlignVertical: "top" }}
            />
            <View className="w-100 h-20 py-2">
              <Button
                title="Crear"
                color="#00BFA5"
                onPress={props.handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CrearOferta;
