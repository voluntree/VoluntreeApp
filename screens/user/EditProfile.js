import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import {doc, updateDoc} from "firebase/firestore"
import { ref } from "firebase/storage";
import { firebase, storage, uploadBytes, db, auth } from "../../utils/firebase";
import ModalPerfil from "../../components/user/ModalPerfil";
import { updateProfile } from "../../service/service";
import { getImageDownloadURL } from "../../service/service";

const EditProfile = () => {
  const route = useRoute();
  const { voluntario, userID, foto } = route.params;

  const navigation = useNavigation();

  const user = auth.currentUser;

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  if (hasGalleryPermission === false) {
    <Text>No tiene acceso a la galería</Text>;
  }

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
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      return result;
    }
  };

  const storeImage = async () => {
    setUploading(true);
    console.log(image);
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const path = `/profileImages/voluntarios/${filename}`;
    const storageRef = ref(storage, path);
    const img = await fetch(image);
    const bytes = await img.blob();

    try {
      await uploadBytes(storageRef, bytes).then(setUploading(false));
    } catch (e) {
      console.log(e);
    }
  };

  async function save(userData) {
    if (dataOK(userData)) {
      try {
        if (image != null) {
          await storeImage();
          userData.fotoPerfil = image.substring(image.lastIndexOf("/") + 1);
        } else {
          userData.fotoPerfil = voluntario.fotoPerfil;
        }
        updateProfile(userData, userID).then(() => {
          Alert.alert("Éxito", "Perfil actualizado correctamente");
          navigation.goBack();
        }) 
      } catch (e) {
        console.log(e);
        Alert.alert(
          "Error",
          "Ha ocurrido un error al actualizar el perfil. Inténtelo de nuevo más tarde"
        );
      }
    }
  }

  function dataOK(userData) {
    if (
      userData.nombre.trim() == "" ||
      userData.apellidos.trim() == "" ||
      userData.correo.trim() == "" ||
      userData.telefono.trim() == ""
    ) {
      Alert.alert("Por favor complete todos los campos obligatorios");
      return false;
    }
    if (userData.telefono.length < 9 || userData.telefono.length > 9) {
      Alert.alert("Por favor ingrese un número de teléfono válido");
      return false;
    }
    return true;
  }

  return (
    <TailwindProvider>
      <SafeAreaView className="h-full w-full space-y-5 p-5">
        <Formik
          initialValues={{
            nombre: voluntario.nombre,
            apellidos: voluntario.apellidos,
            correo: voluntario.correo,
            telefono: voluntario.telefono,
            descripcion: voluntario.descripcion,
            fotoPerfil: foto,
          }}
          onSubmit={(values) => save(values)}
        >
          {(props) => (
            <View>
              {/* Header */}
              <View className="flex flex-row justify-between items-center mb-5">
                <TouchableOpacity
                  onPress={() => {console.log(props.values.fotoPerfil)}}>
                  <Icon name="arrow-back" type="ionicon" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Editar perfil</Text>
                <TouchableOpacity onPress={props.handleSubmit}>
                  <Icon name="checkmark" type="ionicon" />
                </TouchableOpacity>
              </View>
              {/* Contenedor Imagen y Nombre */}
              <View className="flex-row justify-between">
                {/* Foto de perfil*/}
                <View className="h-48 space-y-4">
                  <View className="rounded-full h-28 w-28 bg-[#dadada] items-center justify-center">
                    {props.values.fotoPerfil ? (
                      <Image
                        source={{
                          uri: props.values.fotoPerfil,
                        }}
                        style={{ width: 100, height: 100 }}
                        className="rounded-full"
                      />
                    ) : (
                      <Text className="italic"> Foto de perfil </Text>
                    )}
                  </View>
                  <TouchableOpacity 
                    className="h-14 w-28 bg-[#dadada] rounded-xl justify-center items-center"
                    onPress={ () => {
                      pickImage().then((result) => {
                        props.setFieldValue("fotoPerfil", result.uri);
                      });
                    }}
                  >
                    <Text className="font-bold italic text-center">
                      Seleccionar foto de perfil
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Nombre y apellidos */}
                <View className="h-48 space-y-5">
                  <View className="space-y-2">
                    <Text className="text-base font-bold italic">Nombre*</Text>
                    <TextInput
                      className="h-12 w-52 bg-[#dadada] rounded-md p-2"
                      onChangeText={props.handleChange("nombre")}
                      value={props.values.nombre}
                    />
                  </View>
                  <View className="space-y-2">
                    <Text className="text-base font-bold italic">
                      Apellidos*
                    </Text>
                    <TextInput
                      className="h-12 w-52 bg-[#dadada] rounded-md p-2"
                      onChangeText={props.handleChange("apellidos")}
                      value={props.values.apellidos}
                    />
                  </View>
                </View>
              </View>
              {/* Contenedor de datos */}
              <View className="flex flex-col space-y-5">
                <View className="space-y-2">
                  <Text className="text-base font-bold italic">
                    Correo electrónico*
                  </Text>
                  <TextInput
                    editable={false}
                    className="h-12 w-full bg-[#dadada] rounded-md p-2"
                    onChangeText={props.handleChange("correo")}
                    value={props.values.correo}
                  />
                </View>
                <View className="space-y-2">
                  <Text className="text-base font-bold italic">
                    Número de teléfono*
                  </Text>
                  <TextInput
                    className="h-12 w-full bg-[#dadada] rounded-md p-2"
                    onChangeText={props.handleChange("telefono")}
                    value={props.values.telefono}
                  />
                </View>
                <View className="space-y-2">
                  <Text className="text-base font-bold italic">
                    Descripción
                  </Text>
                  <TextInput
                    className="h-auto w-full bg-[#dadada] rounded-md p-2"
                    maxLength={100}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={props.handleChange("descripcion")}
                    value={props.values.descripcion}
                    style={{ textAlignVertical: "top" }}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default EditProfile;
