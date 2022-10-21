import { TailwindProvider } from "tailwindcss-react-native";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { Button, Icon } from "react-native-elements";
import { storage, db } from "../../utils/firebase";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  collection,
  onSnapshot,
  docs,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { useNavigation, useRoute } from "@react-navigation/native";
import { desapuntarseDeActividad, estaInscrito, inscribirUsuarioEnActividad } from "../../service/service";

const ActivityScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { actividad, uri } = route.params;
  const [fecha, setFecha] = useState();

  const [ubicacion, setUbicacion] = useState();
  const api_key = "pk.b1f2572cbfd397249713a6dadc0b962f";
  const base_url = "https://eu1.locationiq.com";
  const [region, setRegion] = useState({});

  useEffect(() => {
    setFecha(actividad.fecha.toDate().toLocaleString("es-ES", options));

    const getAddress = async (lat, lng) => {
      let response = await fetch(
        `${base_url}/v1/reverse?key=${api_key}&lat=${lat}&lon=${lng}&format=json&accept-language=es`
      );
      let data = await response.json();
      setUbicacion(data.display_name);
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.006,
        longitudeDelta: 0.00021,
      });
    };

    getAddress(
      actividad.ubicacion.latitude,
      actividad.ubicacion.longitude
    ).catch(console.error);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const usuarioInscrito = () => {
    estaInscrito("Catalin", actividad.titulo);
  };

  const despuntarUsuario = () => {
    desapuntarseDeActividad(actividad.titulo, "Catalin");
  };

  const inscribirUsuario = () => {
    inscribirUsuarioEnActividad(actividad, "Catalin").then(() =>
      Alert.alert(
        "Inscripción existosa",
        "Se ha inscrito correctamente a la actividad " + actividad.titulo,
        [{ text: "OK" }]
      )
    );
    //desapuntarseDeActividad(actividad.titulo, "Catalin").then(()=>console.log("exito")).catch(e =>console.log("e"))
  };
  const goBack = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <TailwindProvider>
      <ScrollView className="flex-col h-max w-100 bg-[white]">
        <View className="flex-row bg-transparent mt-0 absolute w-full z-10 top-0 h-14 items-center justify-between">
          <View className="ml-2">
            <TouchableOpacity onPress={goBack} className="w-10 h-10">
              <Icon name="arrow-left" type="octicon" color="white" />
            </TouchableOpacity>
          </View>
          <View className="mr-2">
            <TouchableOpacity className="w-10 h-10">
              <Icon name="star" type="octicon" color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Image className="w-100 h-52 px-1 relative" source={{ uri: uri }} />

        <View className="mx-3 pt-5 relative">
          <Text className="font-extrabold text-2xl ">{actividad.titulo}</Text>
          <View className="flex-row space-x-1 items-center py-5">
            <Icon name="calendar" type="octicon" color="black" />
            <Text>Fecha:</Text>
            <Text>{fecha}</Text>
          </View>

          <View className="flex-col items-start pb-5">
            <View className="flex-row space-x-1">
              <Icon name="book" type="octicon" color="black" />
              <Text>Descripción:</Text>
            </View>
            <Text>{actividad.descripcion}</Text>
          </View>

          <View className="flex-col items-start pb-5 space-x-1">
            <View className="flex-row space-x-1">
              <Icon name="location" type="octicon" color="black" />
              <Text>Ubicacion:</Text>
            </View>
            <Text className="text-[black]">{ubicacion}</Text>
          </View>

          {region.latitude != undefined ? (
            <MapView className="w-100 h-44 pb-5" initialRegion={region}>
              <Marker coordinate={region} />
            </MapView>
          ) : (
            <Text>Loading map...</Text>
          )}

          {usuarioInscrito ? (
            <View className="my-5">
              <Button title="Participa" onPress={inscribirUsuario} />
            </View>
          ) : (
            <View className="my-5">
              <Button
                title="Desapuntarse"
                className="bg-rojo-600"
                onPress={despuntarUsuario}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </TailwindProvider>
  );
};
export default ActivityScreen;
