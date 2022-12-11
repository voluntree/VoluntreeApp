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
import { Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { storage, uploadBytes } from "../../utils/firebase";
import { ref } from "firebase/storage";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImageDownloadURL, updateArticle } from "../../service/service";
import { useNavigation, useRoute } from "@react-navigation/native";

const ModifyArticle = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const articuloAntes = route.params.articulo;
  const articulo = { ...route.params.articulo };
  const uri = route.params.uri;
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [image,setImage] = useState(uri)
  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);

  const storeImage = async () => {
    setUploading(true);
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
    return path
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      return result;
    }
  };

  if (hasGalleryPermission === false) {
    <Text>No tiene acceso a la galería</Text>;
  }

  const dataOK = (articulo) => {
    if (
      articulo.titulo.trim() == "" ||
      articulo.autor.trim() == "" ||
      articulo.introduccion.trim() == "" ||
      articulo.cuerpo.trim() == "" ||
      articulo.conclusion.trim() == "" ||
      articulo.imagen.trim() == ""
    ) {
      Alert.alert("Error", "Rellene todos los campos");
      return false;
    } else {
      if (articulo.introduccion.length > 700) {
        Alert.alert(
          "Error",
          "La introduccion no puede tener más de 700 caracteres"
        );
        return false;
      }
      if (articulo.cuerpo.length > 3000) {
        Alert.alert("Error", "El cuerpo no puede tener más de 3000 caracteres");
        return false;
      }
      if (articulo.conclusion.length > 1000) {
        Alert.alert(
          "Error",
          "La conclusion no puede tener más de 1000 caracteres"
        );
        return false;
      }
      return true;
    }
  };

  const handleSubmit = async () => {
    if (dataOK(articulo)) {
      if (image != articuloAntes.imagen) {
        articulo.imagen = await storeImage();
      }
      updateArticle(articulo, articuloAntes).then(() => {
        Alert.alert(
          "Modificación exitosa",
          "Los cambios se han guardado exitosamente."
        );
        navigation.navigate("News")
      });
    }
  };

  return (
    <SafeAreaView className="">
      <ScrollView className="h-full w-full p-3 space-y-3 mb-5">
        <TouchableOpacity
          className="w-auto h-auto rounded-md"
          onPress={() => {
            pickImage().then((result) => {
              try {
                articulo.imagen = result.uri;
                setImage(result.uri)
              } catch (error) {}
            });
          }}
        >
          <View className="w-max h-40 items-center justify-center border-[1px] border-[#086841] bg-[#dcebe4] rounded-md">
            {image ? (
              <Image className="w-96 h-40 rounded-md" source={{ uri: image }} />
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
          defaultValue={articulo.titulo}
          onChangeText={(text) => (articulo.titulo = text)}
        />
        <TextInput
          className="border-solid border-[1px] rounded-md border-[#086841] h-10 p-2"
          placeholder="Subtitulo"
          defaultValue={articulo.subtitulo}
          onChangeText={(text) => (articulo.subtitulo = text)}
        />
        <TextInput
          className="border-solid border-[1px] rounded-md border-[#086841] h-10 p-2"
          placeholder="Autor"
          defaultValue={articulo.autor}
          onChangeText={(text) => (articulo.autor = text)}
        />
        <TextInput
          className="border-solid border-[1px] rounded-md border-[#086841] p-2"
          maxLength={700}
          multiline={true}
          numberOfLines={15}
          placeholder="Introducción"
          defaultValue={articulo.introduccion}
          onChangeText={(text) => (articulo.introduccion = text)}
          style={{ textAlignVertical: "top" }}
        />
        <TextInput
          className="border-solid border-[1px] rounded-md border-[#086841] p-2"
          maxLength={3000}
          multiline={true}
          numberOfLines={25}
          placeholder="Cuerpo"
          defaultValue={articulo.cuerpo}
          onChangeText={(text) => (articulo.cuerpo = text)}
          style={{ textAlignVertical: "top" }}
        />
        <TextInput
          className="border-solid border-[1px] rounded-md border-[#086841] p-2"
          maxLength={1000}
          multiline={true}
          numberOfLines={15}
          defaultValue={articulo.conclusion}
          onChangeText={(text) => (articulo.conclusion = text)}
          style={{ textAlignVertical: "top" }}
        />
        <View className="my-7 items-center">
          <TouchableOpacity
            className="h-12 w-auto p-2 bg-costas rounded-md items-center justify-center"
            onPress={handleSubmit}
          >
            <Text className="text-ambiental text-lg">Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModifyArticle;
