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
  Input
} from "react-native";
import { Formik } from "formik";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { ref } from "firebase/storage";
import { useRoute } from "@react-navigation/native";

import { firebase } from "../../utils/firebase";
import { storage, uploadBytes } from "../../utils/firebase";

import {
  getActivityById,
  pickImage,
  storeImage,
  updateActivity,
} from "../../service/service";

const Detalles = () => {
  const route = useRoute();
  const { actividad, uri } = route.params;

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

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
      values.titulo == "" ||
      values.tipo == "" ||
      values.max_participantes == 0 ||
      values.duracion == "" ||
      values.descripcion == "" ||
      values.imagen == ""
    ) {
      Alert.alert("Error", "Por favor, rellene todos los campos");
      return false;
    }
    if (values.max_participantes < 6 || values.max_participantes > 100) {
      Alert.alert(
        "Error",
        "El número de participantes debe estar entre 6 y 100"
      );
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
    <ScrollView className="p-5 pt-18">
      <Formik
        // Valores iniciales. Se hace uso de Green Peace como asociación por defecto hasta que se implemente el login.
        initialValues={{
          asociacion: "Green Peace",
          titulo: actividad.titulo,
          tipo: actividad.tipo,
          num_participantes: actividad.num_participantes,
          max_participantes: actividad.max_participantes,
          participantes: actividad.participantes,
          duracion: actividad.duracion,
          descripcion: actividad.descripcion,
          imagen: uri,
          fecha: actividad.fecha,
          ubicacion: actividad.ubicacion,
        }}
        onSubmit={(values) => {
          values.fecha = new Date();
          
          if (correctData(values)) {
            values.duracion.length == 1 ? (values.duracion = values.duracion + 'h') : values.duracion;
            values.max_participantes = Number(values.max_participantes);
            if (image != null) {
              values.imagen = image.substring(image.lastIndexOf("/") + 1);
              storeImage()
            } else {
              values.imagen = actividad.imagen;
            }
            updateActivity(values);
          }
        }}
      >
        {(props) => (
          <View>
            <View className="flex-row">
              <View className="mr-2 space-y-5">
                <TextInput
                  className="text-xs w-44 h-10 border border-[#6b7280] rounded-md p-2"
                  editable={false}
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
                    placeholder="Máx. participantes"
                    onChangeText={props.handleChange("max_participantes")}
                    value={(props.values.max_participantes).toString()}
                  />
                  <TextInput
                    className="text-xs w-20 h-10 border border-[#6b7280] rounded-md p-2 ml-4"
                    keyboardType="numeric"
                    placeholder="Duración"
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
                  <View className="w-40 h-40 items-center justify-center border-2 border-[#d1d5db] bg-[#e5e7eb] rounded-md ml-2">
                    <Image className="w-40 h-28" source={{uri: props.values.imagen}} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              className="text-xs text-justify w-auto h-auto border border-[#6b7280] rounded-md p-2 mt-4 mb-64"
              multiline={true}
              numberOfLines={10}
              placeholder="Descripción"
              onChangeText={props.handleChange("descripcion")}
              value={props.values.descripcion}
              style={{ textAlignVertical: "top" }}
            />
            <Button
              title="Guardar cambios"
              color="#00BFA5"
              onPress={props.handleSubmit}
            />
            <Button
              title="Cancelar"
              color="#00BFA5"
              onPress={() => console.log(actividad.imagen)}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Detalles;
