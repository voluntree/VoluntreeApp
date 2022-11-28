import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Modal, TouchableOpacity, TextInput, Button, Image, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import Slider from "@react-native-community/slider";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";

const ModalNewActivity = (props) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Fecha del voluntariado");

  const api_key = "pk.b1f2572cbfd397249713a6dadc0b962f";
  const base_url = "https://eu1.locationiq.com";
  const [region, setRegion] = useState({
    latitude: 41.3851,
    longitude: 2.1734,
    latitudeDelta: 0.006,
    longitudeDelta: 0.00021,
  });
  const [ubicacion, setUbicacion] = useState();
  const [resultados, setResultados] = useState([]);

  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);

  const SearchAddress = async () => {
    let response = await fetch(
      `${base_url}/v1/search?key=${api_key}&q=${ubicacion}&format=json&accept-language=es&limit=4`
    );
    let data = await response.json();
    setResultados(data);
  };

  const handlePicker = (datetime) => {
    setShow(false);
    setDate(datetime);
    setText(
      "Fecha: " + datetime.getDate() + "/" + (datetime.getMonth() + 1) + "/" + datetime.getFullYear() + " y " +
      "Hora: " + ("0" + datetime.getHours()).slice(-2) + ":" + ("0" + datetime.getMinutes()).slice(-2)
    );
  };

  const showPicker = () => { setShow(true) };

  const hidePicker = () => { setShow(false) };

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
      values.max_participantes.trim().length == 0 ||
      values.duracion.trim().length == 0 ||
      values.descripcion.trim().length == 0 ||
      values.imagen.trim().length == 0 ||
      values.fecha == null
    ) {
      Alert.alert("Error", "Por favor, rellene todos los campos");
      return false;
    }
    if (isNaN(values.max_participantes)) {
      Alert.alert(
        "Error",
        "El número de participantes debe ser un número entre 6 y 100"
      );
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

  const DivLine = () => {
    return (<View className='border border-[#000000] mt-4' />)
  };

  const ChooseImage = () => {
    if (image == null) {
      return (
        <Icon 
          name='add'
          type='ionicon'
          color='#086841'
          size={40}
        />
      )
    } else {
      return (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100 }}
        />
      )
    }
  };

  return (
    <Modal visible={props.isModalOpen} transparent={true} animationType="slide">
      {/* Contenedor fondo transparente */}
      <Modal
        visible={props.isModalOpen}
        transparent={true}
        animationType={"fade"}
      >
        <View className="h-full w-full absolute bg-[#27272a] opacity-70"></View>
      </Modal>
      <ScrollView className="border-t-2 border-l-2 border-r-2 border-[#000000] rounded-t-3xl bg-blanco p-5 mt-20">
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
            reclamados: [],
            duracion: "",
            descripcion: "",
            imagen: "",
            fecha: "",
            ubicacion: "",
          }}
          onSubmit={(values) => {
            values.fecha = date;

            if (correctData(values)) {
              values.imagen = image.substring(image.lastIndexOf("/") + 1);
              values.duracion += "h";
              values.max_participantes = Number(values.max_participantes);
              storeImage();
              createActivity(values);
            }
          }}
        >
          {(fProps) => (
            <View className="space-y-5">
              {/* Header */}
              <View className="flex-row justify-between">
                <TextInput
                  className="text-xl text-[#086841] w-56 font-bold"
                  placeholder="Título"
                  placeholderTextColor={"#086841"}
                  onChangeText={fProps.handleChange("titulo")}
                  value={fProps.values.titulo}
                />
                <TouchableOpacity>
                  <Icon
                    name="x"
                    type="octicon"
                    size={30}
                    color="#086841"
                    onPress={() => props.setIsModalOpen(false)}
                  />
                </TouchableOpacity>
              </View>
              {/* CONTENEDOR: Duración & Categoría */}
              <View className="flex-row justify-between px-4">
                {/* Duración */}
                <View>
                  <Text className="text-base text-[#086841] pl-2">
                    Duración: {fProps.values.duracion}h
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
                        fProps.setFieldValue("duracion", hours);
                      }
                    }}
                    onSlidingStart={() => {
                      setSliding(true);
                    }}
                    onSlidingComplete={() => {
                      setSliding(false);
                    }}
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
                    value={fProps.values.tipo}
                    onChange={(item) =>
                      fProps.setFieldValue("tipo", item.value)
                    }
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
                    className="border-b border-[#FEBBBB] text-sm text-[#086841] h-8 w-8/12 pt-2"
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
                    <Text className="border-b border-[#FEBBBB] text-sm text-[#086841] h-8 w-full pt-2">
                      {text}
                    </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={show}
                    onConfirm={(value) => {
                      handlePicker(value);
                      fProps.setFieldValue("fecha", value);
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
                  <Text className="text-base text-[#086841]">Descripción:</Text>
                  <TextInput
                    className="text-sm text-justify text-[#086841] h-32 border-2 border-[#FEBBBB] rounded-md p-2"
                    multiline={true}
                    numberOfLines={6}
                    maxLength={200}
                    style={{ textAlignVertical: "top" }}
                    onChangeText={fProps.handleChange("descripcion")}
                  />
                </View>
                {/* Participantes */}
                <View>
                  <View className="flex flex-row space-x-2 items-center justify-start">
                    <Text className="text-base text-[#086841]">
                      Participantes:
                    </Text>
                    <TextInput
                      className="text-base text-[#086841]"
                      maxLength={3}
                      value={fProps.values.max_participantes}
                      onChangeText={(value) => {
                        if (!isNaN(value)) {
                          if (value < 6) {
                            fProps.setFieldValue("max_participantes", 6);
                          } else if (value > 100) {
                            fProps.setFieldValue("max_participantes", 100);
                          } else {
                            fProps.setFieldValue("max_participantes", value);
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
                        fProps.setFieldValue("max_participantes", participants);
                      }
                    }}
                    value={parseInt(fProps.values.max_participantes)}
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
                        fProps.setFieldValue(
                          "imagen",
                          getImageName(result.uri)
                        );
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
                  fProps.handleSubmit();
                }}
              >
                <View className="h-10 w-28 bg-[#EFF8F4] rounded-md justify-center items-center">
                  <Text className="text-base text-[#086841]">Publicar</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Modal>
  );
};

export default ModalNewActivity;
