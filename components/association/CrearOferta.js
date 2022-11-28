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
  FlatList,
} from "react-native";
import { Formik } from "formik";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../utils/firebase";
import { storage, uploadBytes } from "../../utils/firebase";
import { ref } from "firebase/storage";
import DateTimePicker from "react-native-modal-datetime-picker";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import {
  createActivity,
  getActivityByName,
  pickImage,
  saveActivity,
  storeImage,
} from "../../service/service";
import { async } from "@firebase/util";
import { Dropdown } from "react-native-element-dropdown";

const CrearOferta = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Fecha: DD/MM/AAAA\nHora: HH:MM");

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
  }

  const handlePicker = (datetime) => {
    setShow(false);
    setDate(datetime);
    setText("Fecha: " + datetime.getDate() +"/"+ (datetime.getMonth()+1) +"/"+ datetime.getFullYear() + "\n" +
            "Hora: " + datetime.getHours() + ":" + datetime.getMinutes());
  };

  const showPicker = () => {
    setShow(true);
    console.log("show");
  };

  const hidePicker = () => {
    setShow(false);
  };

  const Fecha = () => {
    if (date == null) {
      return <Text className="text-xs text-[#9c9c9c]">{text}</Text>;
    } else {
      return <Text className="text-xs">{text}</Text>
    }
  }


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
      values.imagen.trim().length == 0 ||
      values.fecha == null
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
    <ScrollView className="border p-5 pt-20">
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
                <Dropdown 
                  className="w-44 h-10 border border-[#6b7280] rounded-md p-2"
                  placeholderStyle={{fontSize: 12, color: "#6b7280"}}
                  selectedTextStyle={{fontSize: 12}}
                  placeholder="Tipo"
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
              <TouchableOpacity onPress={() => {showPicker()}}>
                <View className="w-44 h-14 border border-[#6b7280] rounded-md p-2 mt-5">
                  <Fecha />
                </View>
              </TouchableOpacity>
            
              <DateTimePicker
                isVisible={show}
                onConfirm={handlePicker}
                onCancel={hidePicker}
                mode="datetime"
                is24Hour={true}
                />
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
            <View>
              <View className="flex-row space-x-4">
                <TextInput 
                  className="text-xs w-64 h-10 border border-[#6b7280] rounded-md p-2 mt-4"
                  placeholder="Ubicación de la actividad"
                  onChangeText={(ubi) => setUbicacion(ubi)}
                />
                <TouchableOpacity
                  className="w-20 h-10 border border-[#6b7280] justify-center rounded-md p-2 mt-4"
                  onPress={SearchAddress}>
                  <Text>Buscar</Text>
                </TouchableOpacity>
              </View>
              {/* <FlatList
                scrollEnabled={false}
                className="h-100 scroll-pb-28"
                data={resultados}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity 
                    onPress={
                      setRegion({
                        latitude: item.lat,
                        longitude: item.lon,
                        latitudeDelta: 0.006,
                        longitudeDelta: 0.00021,
                      })
                    }>
                    <Text>{item.display_name}</Text>
                  </TouchableOpacity>
                )}/> */}
              <MapView className="w-100 h-44 pb-5" initialRegion={region}>
                <Marker coordinate={region} />
              </MapView>
            </View>
            <View className="w-100 h-20 py-2">
              <Button
                title="Crear"
                color="#00BFA5"
                onPress={() => {//props.handleSubmit()
                console.log(props.values)}}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CrearOferta;
