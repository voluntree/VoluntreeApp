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
import { storage, uploadBytes } from "../../utils/firebase";
import { ref } from "firebase/storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { auth } from "../../utils/firebase";
import { createActivity, getAsociationByID } from "../../service/service";

const ModalNewActivity = (props) => {
  const currentUser = auth.currentUser;
  const asociacion = props.asociacion;

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Fecha del voluntariado");

  const [ubicacion, setUbicacion] = useState({
    latitude: 39.481256,
    longitude: -0.340958,
  });

  const google_api_key = "AIzaSyACpAdm3w3zmrvsSJ5KgKtNQff7nslAbj0";
  const HERE_API_KEY = "wb6elsR3LLHIxv7GvWq834Sb5hNUbvdTYWk0PSYie44"
  

  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);

  function getAddressFromCoordinates( latitude, longitude ) {
    return new Promise((resolve) => {
      const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${HERE_API_KEY}&in=circle:${latitude},${longitude};r=100`
      fetch(url)
        .then(res => res.json())
        .then((resJson) => {
          // the response had a deeply nested structure :/
          if (resJson) {
            resolve(resJson.items[0].address)
          } else {
            resolve()
          }
        })
        .catch((e) => {
          console.log('Error in getAddressFromCoordinates', e)
          resolve()
        })
    })
  }

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
      aspect: [16,9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      return result;
    }
  };

  if (hasGalleryPermission === false) {
    <Text>No tiene acceso a la galer??a</Text>;
  }

  function getImageName(uri) {
    return uri.substring(uri.lastIndexOf("/") + 1);
  }

  const storeImage = async () => {
    setUploading(true);
    console.log(image);
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const path = `cardImages/${asociacion.nombre}/${filename}`;
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
    if (values.asociacion == "") {
      Alert.alert("Error", "Ha ocurrido un error al crear la actividad, int??ntelo de nuevo m??s tarde.");
      return false;
    }
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
          style={{ width: 300, height: 120 }}
        />
      )
    }
  };

  return (
    <Modal visible={props.isActivityModalOpen} transparent={true} animationType="slide">
      {/* Contenedor fondo transparente */}
      <Modal
        visible={props.isActivityModalOpen}
        transparent={true}
        animationType={"fade"}
      >
        <View className="h-full w-full absolute bg-[#27272a] opacity-70"></View>
      </Modal>
      <View className="border-t-2 border-l-2 border-r-2 border-[#FEBBBB] rounded-t-3xl bg-blanco p-5 mt-20 h-full">
        <Formik
          initialValues={{
            asociacion: "",
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
            ubicacion: null,
            address: null,
          }}
          onSubmit={ async (values) => {
            values.asociacion = asociacion.nombre;
            values.address = await getAddressFromCoordinates(values.ubicacion.latitude, values.ubicacion.longitude)
            if (correctData(values)) {
              values.imagen = image.substring(image.lastIndexOf("/") + 1);
              values.duracion += "h";
              values.max_participantes = Number(values.max_participantes);
              storeImage();
              await createActivity(values);
              setImage(null);
              props.setActivityModalOpen(false);
            }
          }}
        >
          {(fProps) => (
            <View className="space-y-5">
              {/* Header */}
              <View className="flex-row justify-between">
                <TextInput
                  className="text-xl text-[#086841] w-9/12 font-bold pt-1"
                  placeholder="Nueva actividad"
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
                    onPress={() => {
                      setImage(null);
                      props.setActivityModalOpen(false)
                    }}
                  />
                </TouchableOpacity>
              </View>
              {/* CONTENEDOR: Duraci??n & Categor??a */}
              <View className="flex-row justify-between px-4">
                {/* Duraci??n */}
                <View>
                  <Text className="text-base text-[#086841] pl-2">
                    Duraci??n: {fProps.values.duracion}h
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
                {/* Categor??a */}
                <View>
                  <Dropdown
                    className="w-40 h-10 border-[1px] border-[#086841] rounded-md p-1"
                    placeholderStyle={{ fontSize: 14, color: "#6b7280" }}
                    selectedTextStyle={{ fontSize: 14 }}
                    placeholder="Categor??a"
                    data={[
                      { label: "Ambiental", value: "ambiental" },
                      { label: "Comunitario", value: "comunitario" },
                      { label: "Cultural", value: "cultural" },
                      { label: "Deportivo", value: "deportivo" },
                      { label: "Educaci??n", value: "educacion" },
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
              {/* CONTENEDOR: Localizaci??n & Fecha & Imagen */}
              <View className="space-y-6 px-4">
                {/* Localizaci??n */}
                <View className="flex flex-row">
                  <Icon
                    name="place"
                    type="material"
                    size={22}
                    color="#086841"
                    style={{ marginTop: 2, marginRight: 5 }}
                  />
                  <View className="absolute z-50 w-10/12 left-6 border-b border-[#FEBBBB]" >
                    <GooglePlacesAutocomplete
                        placeholder="Localizaci??n"
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            setUbicacion({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            });
                            fProps.setFieldValue("ubicacion", {
                              latitude: details.geometry.location.lat,
                              longitude: details.geometry.location.lng,
                            });
                        }}
                        query={{
                            key: google_api_key,
                            language: 'es',
                            components: 'country:es',
                            radius: 30000,
                            location: `${ubicacion.latitude}, ${ubicacion.longitude}`,
                        }}
                        textInputProps={{
                            placeholderTextColor: "#086841",
                            style: {
                                fontSize: 14,
                                color: "#086841",
                                width: "100%",
                                height: "100%",
                            },
                        }}
                        styles={{
                            listView: {
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: '#086841',
                            },
                        }}
                    />
                  </View>
                </View>
                {/* Fecha */}
                <View className="flex flex-row">
                  <Icon
                    name="event"
                    type="material"
                    size={22}
                    color="#086841"
                    style={{ marginTop: 5, marginRight: 5 }}
                  />
                  <TouchableOpacity
                    className="justify-center w-10/12"
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
              {/* CONTENEDOR: Descripci??n & Participantes */}
              <View className="space-y-4 px-4">
                {/* Descripci??n */}
                <View>
                  <Text className="text-base text-[#086841]">Descripci??n:</Text>
                  <TextInput
                    className="text-sm text-justify text-[#086841] h-32 border-[1px] border-[#FEBBBB] rounded-md p-2"
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
                      N?? m??ximo de participantes:
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
                <View className="border-[1px] border-[#FEBBBB] h-32 rounded-lg">
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
      </View>
    </Modal>
  );
};

export default ModalNewActivity;