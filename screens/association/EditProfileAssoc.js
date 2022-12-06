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
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { TailwindProvider } from "tailwindcss-react-native";

const EditProfileAssoc = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { association, assocID, fotoPerfil, fondoPerfil } = route.params;

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
      if (image != null) {
        try {
          storeImage().then(() => {
            const docRef = doc(db, "voluntarios", user.uid);
            updateDoc(docRef, {
              fotoPerfil: image.substring(image.lastIndexOf("/") + 1),
            }).then(
              Alert.alert("Éxito", "Perfil actualizado correctamente"),
              navigation.navigate("Perfil")
            );
          });
        } catch (e) {
          console.log(e);
          Alert.alert(
            "Error",
            "Ha ocurrido un error al actualizar el perfil. Inténtelo de nuevo más tarde"
          );
        }
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
            nombre: association.nombre,
            descripcion: association.descripcion,
            fotoPerfil: fotoPerfil,
            fondoPerfil: fondoPerfil,
            tipoAsociacion: "",
            telefono: association.telefono,
            correo: association.correo,
          }}
          onSubmit={(values) => save(values)}
        >
          {(props) => (
            <View className="h-full w-full space-y-2">
              {/* Header */}
              <View className="flex flex-row justify-between items-center mb-5">
                <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
                  <Icon name="arrow-back" type="ionicon" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Editar perfil</Text>
                <TouchableOpacity onPress={props.handleSubmit}>
                  <Icon name="checkmark" type="ionicon" />
                </TouchableOpacity>
              </View>
              {/* IMAGEN FONDO */}
              <View className="border rounded-xl mb-4">
                <TouchableOpacity className="h-32 items-center justify-center">
                  <Icon name="image" type="material" color="#000" size={30} />
                  <Image
                    source={{ uri: fondoPerfil }}
                    className="absolute z-10 h-full w-full rounded-xl opacity-40"
                  />
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
                    <TextInput
                      className="h-12 w-52 bg-[#dadada] rounded-md p-2"
                      onChangeText={props.handleChange("apellidos")}
                      value={props.values.tipoAsociacion}
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
                    maxLength={100}
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
