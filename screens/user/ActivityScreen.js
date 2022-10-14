import { TailwindProvider } from "tailwindcss-react-native";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image,
} from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { Button, Icon, ListItem } from "react-native-elements";
import { storage } from "../../utils/firebase";
import { useState, useEffect } from "react";

const ActivityScreen = (props) => {
  const [actividad, setActividad] = useState({
    id: "",
    ubicacion: "",
    descripcion: "",
    fecha: "",
    tipo: "",
    imagen: "",
    titulo: "",
  });

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // const date = actividad.fecha.toDate().toLocaleString("es-ES", options);
  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + props.imagen
  );
  const [uri, setUri] = useState();
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });
  return (
    <TailwindProvider>
      <SafeAreaView className="h-full items-center">
        <View className="h-100 w-100">
          <Image source={{ uri: uri }} />

          <View className="flex-row bg-fondo w-100">
            <View>
              <TouchableOpacity>
                <Icon name="arrow-left" type="octicon" color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Icon name="star" type="octicon" color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center">
            <Icon name="location" type="octicon" color="black" />
            <Text>{props.ubicacion}</Text>
          </View>

          <View className="flex-row items-center">
            <Icon name="location" type="octicon" color="black" />
            {/* <Text>{date}</Text> */}
          </View>

          <View className="flex-row items-center">
            <Icon name="location" type="octicon" color="black" />
            <Text>{props.descripcion}</Text>
          </View>

          <Button title="Participa" />
        </View>
      </SafeAreaView>
    </TailwindProvider>
  );
};
export default ActivityScreen;
