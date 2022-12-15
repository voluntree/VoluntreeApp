import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { TailwindProvider } from "tailwindcss-react-native";
import { ref } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import { storage, db, uploadBytes } from "../../utils/firebase";
import { updateAssocProfile } from "../../service/service";

const EditProfileAssoc = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isProfile = true;

  const { association, assocID, fotoPerfil, fondoPerfil } = route.params;

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [imageBG, setImageBG] = useState(null);

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

  const pickImage = async (isProfile) => {
    let result
    if (isProfile) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [12.5, 5],
        quality: 1,
      });
    }

    if (!result.cancelled) {
      if (isProfile) {
        setImage(result.uri);
        return result;
      } else {
        setImageBG(result.uri);
        return result;
      }
    }
  };

  const storeImage = async (isProfile) => {
    let filename
    let path
    let storageRef
    let img
    let bytes
    if (isProfile) {
      filename = image.substring(image.lastIndexOf("/") + 1);
      path = `/profileImages/asociaciones/${association.nombre}/${filename}`;
      storageRef = ref(storage, path);
      img = await fetch(image);
      bytes = await img.blob();
    } else {
      filename = imageBG.substring(imageBG.lastIndexOf("/") + 1);
      path = `/profileImages/asociaciones/${association.nombre}/${filename}`;
      storageRef = ref(storage, path);
      img = await fetch(imageBG);
      bytes = await img.blob();
    }

    try {
      await uploadBytes(storageRef, bytes);
    } catch (e) {
      console.log(e);
    }
  };

  const ChooseImage = () => {
    if (imageBG == null) {
      return (
        <Image
          source={{ uri: fondoPerfil }}
          className="absolute z-10 h-full w-full rounded-xl"
        />
      )
    } else {
      return (
        <Image
          source={{ uri: imageBG }}
          className="absolute z-10 h-full w-full rounded-xl"
        />
      )
    }
  };

  async function save(userData) {
    if (dataOK(userData)) {
      try {
        if (image == null && imageBG == null) {
          userData.fotoPerfil = association.fotoPerfil;
          userData.fondoPerfil = association.fondoPerfil;
        } else {
          if (image != null) {
            await storeImage(true);
            userData.fotoPerfil = image.substring(image.lastIndexOf("/") + 1);
          } else {
            userData.fotoPerfil = association.fotoPerfil;
          }
          if (imageBG != null) {
            await storeImage(false);
            userData.fondoPerfil = imageBG.substring(imageBG.lastIndexOf("/") + 1);
          } else {
            userData.fondoPerfil = association.fondoPerfil;
          }
        }
        updateAssocProfile(userData, association.nombre).then(() => {
          Alert.alert("Éxito", "Perfil actualizado correctamente");
          navigation.goBack();
        })
      } catch (e) {
        console.error(e);
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
      userData.tipoAsociacion.trim() == "" ||
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
            nombre: association.nombre,
            descripcion: association.descripcion,
            fotoPerfil: fotoPerfil,
            fondoPerfil: fondoPerfil,
            tipoAsociacion: association.tipoAsociacion,
            telefono: association.telefono,
            correo: association.correo,
          }}
          onSubmit={(values) => {
            save(values);
          }}
        >
          {(props) => (
            <View className="h-full w-full space-y-2">
              {/* Header */}
              <View className="flex flex-row justify-between items-center mb-5">
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                  <Icon name="arrow-back" type="ionicon" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Editar perfil</Text>
                <TouchableOpacity onPress={() => {
                    props.handleSubmit();
                  }}
                >
                  <Icon name="checkmark" type="ionicon" />
                </TouchableOpacity>
              </View>
              {/* IMAGEN FONDO */}
              <View className="border rounded-xl mb-4">
                <TouchableOpacity 
                  className="h-32 items-center justify-center"
                  onPress={() => {
                    pickImage(!isProfile).then((result) => {
                      props.setFieldValue("fondoPerfil", result.uri);
                    });
                   }}
                >
                  <ChooseImage />
                </TouchableOpacity>
              </View>

              {/* IMAGEN PERFIL & NOMBRE & TIPO */}
              <View className="flex-row justify-between px-2">
                {/* IMAGEN PERFIL */}
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
                    onPress={() => {
                      pickImage(isProfile).then((result) => {
                        props.setFieldValue("fotoPerfil", result.uri);
                      });
                    }}
                  >
                    <Text className="font-bold italic text-center">
                      Seleccionar foto de perfil
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* NOMBRE & TIPO */}
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
                      Tipo de Asociacion*
                    </Text>
                    <Dropdown
                      className="w-52 h-12 bg-[#dadada] rounded-md p-2"
                      placeholderStyle={{ fontSize: 16, color: "#6b7280" }}
                      flatListProps={{ 
                        contentContainerStyle: { backgroundColor: "#fff", shadowRadius:0, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, elevation: 0 }
                      }}
                      selectedTextStyle={{ fontSize: 16 }}
                      placeholder="Categoría"
                      data={[
                        { label: "Ambiental", value: "ambiental" },
                        { label: "Comunitario", value: "comunitario" },
                        { label: "Cultural", value: "cultural" },
                        { label: "Deportivo", value: "deportivo" },
                        { label: "Educación", value: "educación" },
                      ]}
                      labelField="label"
                      valueField="value"
                      value={props.values.tipoAsociacion}
                      onChange={(item) =>
                        props.setFieldValue("tipoAsociacion", item.value)
                      }
                    />
                  </View>
                </View>
              </View>

              {/* Contenedor de datos */}
              <View className="flex flex-col space-y-5 px-2">
                {/* DESCRIPCION */}
                <View className="space-y-2">
                  <Text className="text-base font-bold italic">
                    Descripción
                  </Text>
                  <TextInput
                    className="h-auto w-full bg-[#dadada] rounded-md p-2"
                    maxLength={150}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={props.handleChange("descripcion")}
                    value={props.values.descripcion}
                    style={{ textAlignVertical: "top" }}
                  />
                </View>

                {/* TELEFONO */}
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

                {/* CORREO */}
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
              </View>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default EditProfileAssoc;
