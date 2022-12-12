import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { storage, uploadBytes } from "../../utils/firebase";
import { ref } from "firebase/storage";
import { Button, Icon } from "react-native-elements";
import { publishArticle } from "../../service/service";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserInstance } from "../../service/LoginService";

const CreateNewArticle = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentUser,setCurrentUser] = useState(getUserInstance)

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);

  function publicarArticulo(articulo) {
    if (dataOK(articulo)) {
      articulo.fecha_publicacion = new Date().toLocaleString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      articulo.imagen =
        "articulos/" + image.substring(image.lastIndexOf("/") + 1);
      try {
        publishArticle(articulo);
        storeImage();
        Alert.alert("Exito", "Articulo publicado exitosamente");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  }

  const storeImage = async () => {
    setUploading(true);
    console.log(image);
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const path = `articulos/${filename}`;
    const storageRef = ref(storage, path);
    const img = await fetch(image);
    const bytes = await img.blob();

    try {
      await uploadBytes(storageRef, bytes).then(setUploading(false));
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
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

  const dataOK = (values) => {
    if (
      values.titulo.trim() == "" ||
      values.autor.trim() == "" ||
      values.introduccion.trim() == "" ||
      values.cuerpo.trim() == "" ||
      values.conclusion.trim() == "" ||
      values.imagen.trim() == ""
    ) {
      Alert.alert("Error", "Rellene todos los campos");
      return false;
    } else {
      if (values.introduccion.length > 700) {
        Alert.alert(
          "Error",
          "La introduccion no puede tener más de 700 caracteres"
        );
        return false;
      }
      if (values.cuerpo.length > 3000) {
        Alert.alert("Error", "El cuerpo no puede tener más de 3000 caracteres");
        return false;
      }
      if (values.conclusion.length > 1000) {
        Alert.alert(
          "Error",
          "La conclusion no puede tener más de 1000 caracteres"
        );
        return false;
      }
      return true;
    }
  };

  return (
    <SafeAreaView className="p-4 space-y-4">
      <View>
        <Text className="font-bold text-2xl">Crear nuevo artículo</Text>
      </View>
      <ScrollView>
        <Formik
          initialValues={{
            titulo: "",
            subtitulo: "",
            autor: "",
            fecha_publicacion: "",
            asociacion: currentUser.nombre,
            introduccion: "",
            cuerpo: "",
            conclusion: "",
            imagen: "",
            favoritos: [],
          }}
          onSubmit={(values) => publicarArticulo(values)}
        >
          {(props) => (
            <View className="space-y-3">
              <TouchableOpacity
                onPress={() => {
                  pickImage().then((result) => {
                    props.setFieldValue("imagen", result.uri);
                  });
                }}
                value={props.values.imagen}
              >
                <View className="w-max h-40 items-center justify-center border-[1px] border-[#086841] bg-[#dcebe4] rounded-md">
                  {props.values.imagen ? (
                    <Image
                      className="w-96 h-40 rounded-md"
                      source={{ uri: props.values.imagen }}
                    />
                  ) : (
                    <Icon
                      name="add-photo-alternate"
                      type="material"
                      size={50}
                      color="#086841"
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TextInput
                className="border-solid border-[1px] rounded-md border-[#086841] h-10 p-2"
                placeholder="Titulo"
                onChangeText={props.handleChange("titulo")}
                value={props.values.titulo}
              />
              <TextInput
                className="border-solid border-[1px] rounded-md border-[#086841] h-10 p-2"
                placeholder="Subtitulo"
                onChangeText={props.handleChange("subtitulo")}
                value={props.values.subtitulo}
              />
              <TextInput
                className="border-solid border-[1px] rounded-md border-[#086841] h-10 p-2"
                placeholder="Autor"
                onChangeText={props.handleChange("autor")}
                value={props.values.autor}
              />
              <TextInput
                className="border-solid border-[1px] rounded-md border-[#086841] p-2"
                maxLength={700}
                multiline={true}
                numberOfLines={15}
                placeholder="Introducción"
                onChangeText={props.handleChange("introduccion")}
                value={props.values.introduccion}
                style={{ textAlignVertical: "top" }}
              />
              <TextInput
                className="border-solid border-[1px] rounded-md border-[#086841] p-2"
                maxLength={3000}
                multiline={true}
                numberOfLines={25}
                placeholder="Cuerpo"
                onChangeText={props.handleChange("cuerpo")}
                value={props.values.cuerpo}
                style={{ textAlignVertical: "top" }}
              />
              <TextInput
                className="border-solid border-[1px] rounded-md border-[#086841] p-2"
                maxLength={1000}
                multiline={true}
                numberOfLines={15}
                placeholder="Conclusión"
                onChangeText={props.handleChange("conclusion")}
                value={props.values.conclusion}
                style={{ textAlignVertical: "top" }}
              />
              <View className="justify-center items-center mb-10">
                <TouchableOpacity 
                  className="bg-[#dcebe4] rounded-md w-40"
                  onPress={() => {
                    props.handleSubmit();
                  }}
                >
                  <Text className="text-center text-[#086841] font-bold py-2" >
                    Publicar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateNewArticle;
