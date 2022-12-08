import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import Slider from "@react-native-community/slider";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import { storage, uploadBytes } from "../../utils/firebase";
import { ref } from "firebase/storage";
import { useNavigation, useRoute } from "@react-navigation/native";

import { updateActivity } from "../../service/service";
import { SafeAreaView } from "react-native-safe-area-context";

const EditActivity = () => {
  const route = useRoute();
  const { actividad, uri } = route.params;

  const navigation = useNavigation();

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [date, setDate] = useState(actividad.fecha.toDate());
  const [show, setShow] = useState(false);
  const [text, setText] = useState(
    "Fecha: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " y " +
    "Hora: " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  );

  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);

  const handlePicker = (datetime) => {
    setShow(false);
    setDate(datetime);
    setText(
      "Fecha: " +
        datetime.getDate() +
        "/" +
        (datetime.getMonth() + 1) +
        "/" +
        datetime.getFullYear() +
        " y " +
        "Hora: " +
        ("0" + datetime.getHours()).slice(-2) +
        ":" +
        ("0" + datetime.getMinutes()).slice(-2)
    );
  };

  const showPicker = () => {
    setShow(true);
  };

  const hidePicker = () => {
    setShow(false);
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

  function getImageName(uri) {
    return uri.substring(uri.lastIndexOf("/") + 1);
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

  const correctData = (values) => {
    if (
      values.titulo.trim().length == 0 ||
      values.tipo.trim().length == 0 ||
      values.descripcion.trim().length == 0 ||
      values.imagen.trim().length == 0 ||
      values.fecha == null
    ) {
      Alert.alert("Error", "Por favor, rellene todos los campos");
      return false;
    }
    return true;
  };

  const ChooseImage = () => {
    if (image == null) {
        return (
            <Image source={{ uri: uri }} style={{ width: 100, height: 100 }} />
        );
    } else {
        return (
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        );
    }
  };

  return (
    <SafeAreaView className = "bg-blanco w-full h-full">
      <Formik
        initialValues={{
          asociacion: "Green Peace",
          titulo: actividad.titulo,
          tipo: actividad.tipo,
          num_participantes: actividad.num_participantes,
          max_participantes: actividad.max_participantes,
          participantes: actividad.participantes,
          duracion: (actividad.duracion).substring(0, 1),
          descripcion: actividad.descripcion,
          imagen: uri,
          fecha: actividad.fecha,
          ubicacion: actividad.ubicacion,
          address: actividad.address
        }}
        onSubmit={(values) => {
          if (correctData(values)) {
            values.duracion.length == 1
              ? (values.duracion = values.duracion + "h")
              : values.duracion;
            values.max_participantes = Number(values.max_participantes);
            if (image != null) {
              values.imagen = image.substring(image.lastIndexOf("/") + 1);
              storeImage();
            } else {
              values.imagen = actividad.imagen;
            }
            updateActivity(values);
          }
        }}
      >
        {(props) => (
          <View className="space-y-5 mt-5 mx-2">
            {/* Header */}
            <View className="flex-row justify-between">
              <TextInput
                className="text-xl text-ambiental h-10 w-auto font-bold pt-1"
                placeholder="Título"
                placeholderTextColor={"#086841"}
                onChangeText={props.handleChange("titulo")}
                value={props.values.titulo}
                editable={false}
              />
              <TouchableOpacity>
                <Icon
                  name="x"
                  type="octicon"
                  size={30}
                  color="#086841"
                  onPress={() => {
                    navigation.navigate("AssociationActivityDetails", { actividad: actividad, uri: uri });
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* CONTENEDOR: Duración & Categoría */}
            <View className="flex-row justify-between px-4">
              {/* Duración */}
              <View>
                <Text className="text-base text-ambiental pl-2">
                  Duración: {props.values.duracion}h
                </Text>
                <Slider
                  style={{ width: 160, height: 30 }}
                  minimumValue={1}
                  maximumValue={8}
                  step={1}
                  minimumTrackTintColor="#086841"
                  maximumTrackTintColor="#FEBBBB"
                  thumbTintColor="#086841"
                  onValueChange={(value) => {
                    if (!sliding) {
                      let hours = value.toString();
                      props.setFieldValue("duracion", hours);
                    }
                  }}
                  onSlidingStart={() => {
                    setSliding(true);
                  }}
                  onSlidingComplete={() => {
                    setSliding(false);
                  }}
                  value={parseInt(props.values.duracion)}
                />
              </View>
              {/* Categoría */}
              <View>
                <Dropdown
                  className="w-40 h-10 border-2 border-[#086841] rounded-md p-1"
                  placeholderStyle={{ fontSize: 14, color: "#6b7280" }}
                  selectedTextStyle={{ fontSize: 14 }}
                  placeholder="Categoría"
                  data={[
                    { label: "Ambiental", value: "ambiental" },
                    { label: "Comunitario", value: "comunitario" },
                    { label: "Educación", value: "educación" },
                  ]}
                  labelField="label"
                  valueField="value"
                  value={props.values.tipo}
                  onChange={(item) => props.setFieldValue("tipo", item.value)}
                />
              </View>
            </View>
            {/* Linea divisoria */}

            {/* CONTENEDOR: Localización & Fecha & Imagen */}
            <View className="space-y-4 px-4">
              {/* Localización */}
              <View className="flex flex-row">
                <Icon
                  name="location"
                  type="ionicon"
                  size={22}
                  color="#086841"
                  style={{ marginTop: 8, marginRight: 5 }}
                />
                <TextInput
                  className="border-b border-[#FEBBBB] text-sm text-ambiental h-8 w-8/12 pt-2"
                  placeholder="Localización"
                  placeholderTextColor={"#086841"}
                />
              </View>
              {/* Fecha */}
              <View className="flex flex-row">
                <Icon
                  name="calendar"
                  type="ionicon"
                  size={22}
                  color="#086841"
                  style={{ marginTop: 5, marginRight: 5 }}
                />
                <TouchableOpacity
                  className="justify-center w-8/12"
                  onPress={() => {
                    showPicker();
                  }}
                >
                  <Text className="border-b border-[#FEBBBB] text-sm text-ambiental h-8 w-full pt-2">
                    {text}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={show}
                  onConfirm={(value) => {
                    handlePicker(value);
                    props.setFieldValue("fecha", value);
                  }}
                  onCancel={hidePicker}
                  mode="datetime"
                  is24Hour={true}
                />
              </View>
              {/* Imagen */}
            </View>
            {/* Linea divisoria */}

            {/* CONTENEDOR: Descripción & Participantes */}
            <View className="space-y-4 px-4">
              {/* Descripción */}
              <View>
                <Text className="text-base text-ambiental">Descripción:</Text>
                <TextInput
                  className="text-sm text-justify text-ambiental h-32 border-2 border-[#FEBBBB] rounded-md p-2"
                  multiline={true}
                  numberOfLines={6}
                  maxLength={200}
                  style={{ textAlignVertical: "top" }}
                  onChangeText={props.handleChange("descripcion")}
                  value={props.values.descripcion}
                />
              </View>
              {/* Participantes */}
              <View>
                <View className="flex flex-row space-x-2 items-center justify-start">
                  <Text className="text-base text-ambiental">
                    Nº máximo de participantes:
                  </Text>
                  <TextInput
                    className="text-base text-ambiental"
                    maxLength={3}
                    value={props.values.max_participantes}
                    onChangeText={(value) => {
                      if (!isNaN(value)) {
                        if (value < 6) {
                          props.setFieldValue("max_participantes", 6);
                        } else if (value > 100) {
                          props.setFieldValue("max_participantes", 100);
                        } else {
                          props.setFieldValue("max_participantes", value);
                        }
                      }
                    }}
                    autoCorrect={false}
                    keyboardType="numeric"
                  />
                </View>
                <Slider
                  style={{ height: 30 }}
                  minimumValue={6}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#086841"
                  maximumTrackTintColor="#FEBBBB"
                  thumbTintColor="#086841"
                  onValueChange={(value) => {
                    if (!sliding) {
                      let participants = value.toString();
                      props.setFieldValue("max_participantes", participants);
                    }
                  }}
                  value={parseInt(props.values.max_participantes)}
                  onSlidingStart={() => {
                    setSliding(true);
                  }}
                  onSlidingComplete={() => {
                    setSliding(false);
                  }}
                />
              </View>
              <View className="border-2 border-[#FEBBBB] h-32 rounded-lg">
                <TouchableOpacity
                  className="w-full h-full justify-center items-center"
                  onPress={() => {
                    pickImage().then((result) => {
                      props.setFieldValue("imagen", getImageName(result.uri));
                    });
                  }}
                >
                  <ChooseImage />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              className="items-center"
              onPress={() => {
                // props.handleSubmit();
                console.log(uri);
              }}
            >
              <View className="h-10 w-40 bg-costas rounded-md justify-center items-center">
                <Text className="text-base text-ambiental">Guardar cambios</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EditActivity;
