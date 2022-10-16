import { TailwindProvider } from "tailwindcss-react-native";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { Button, Icon } from "react-native-elements";
import { storage, db } from "../utils/firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot, docs, doc } from "firebase/firestore";

const ActivityScreen = () => {
  const [actividad, setActividad] = useState({});
  const [fecha, setFecha] = useState();
  const [uri, setUri] = useState();
  const [ubicacion, setUbicacion] = useState();

  useEffect(() => {
    const refr = collection(db, "actividades");
    onSnapshot(refr, async (snapshot) => {
      const act = snapshot.docs[0].data();
      setActividad(act);
      setFecha(act.fecha.toDate().toLocaleString("es-ES", options));
      const reference = ref(
        storage,
        `gs://voluntreepin.appspot.com/cardImages/${act.imagen}`
      );
      await getDownloadURL(reference)
        .then((x) => setUri(x))
        .catch(console.error);
      const api_key = "pk.b1f2572cbfd397249713a6dadc0b962f";
      const base_url = "https://eu1.locationiq.com/v1/reverse";
      const getAddress = async (lat, lng) => {
        console.log({ lat, lng });
        let response = await fetch(
          `${base_url}?key=${api_key}&lat=${lat}&lon=${lng}&format=json&accept-language=es`
        );
        let data = await response.json();
        setUbicacion(data.display_name);
      };

      getAddress(act.ubicacion.latitude, act.ubicacion.longitude).catch(
        console.error
      );
    });
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <TailwindProvider>
      <View className="flex-col h-max w-100">
        <View className="flex-row bg-[#3333332d] float w-100 h-10 items-center justify-between">
          <View className="ml-2">
            <TouchableOpacity>
              <Icon name="arrow-left" type="octicon" color="white" />
            </TouchableOpacity>
          </View>
          <View className="mr-2">
            <TouchableOpacity>
              <Icon name="star" type="octicon" color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Image className="w-100" source={{ uri }} />

        <View className="mx-3 pt-5">
          <View className="flex-row space-x-1 items-center pb-5">
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
            <Text>{ubicacion}</Text>
          </View>

          <Button title="Participa" />
        </View>
      </View>
    </TailwindProvider>
  );
};
export default ActivityScreen;
