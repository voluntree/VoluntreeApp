import { TailwindProvider } from "tailwindcss-react-native";
import { TouchableOpacity, View, SafeAreaView } from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { Button, Icon, ListItem } from "react-native-elements";

function ActivityScreen(props) {
  const actividad = props;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = actividad.fecha.toDate().toLocaleString("es-ES", options);
  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/cardImages/" + props.imagen
  );
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });
  return (
    <TailwindProvider>
      <SafeAreaView className="h-full items-center">
        <View className="mx-3 ">
          <Image source={{ uri: uri }} />

          <View>
            <TouchableOpacity>
              <Icon name="arrow-left" color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="star" color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center">
            <Icon name="location" />
            <Text>{actividad.ubicacion}</Text>
          </View>

          <View className="flex-row items-center">
            <Icon name="location" />
            <Text>{date}</Text>
          </View>

          <View className="flex-row items-center">
            <Icon name="location" />
            <Text>{actividad.descripcion}</Text>
          </View>

          <Button title="Participa" />
        </View>
      </SafeAreaView>
    </TailwindProvider>
  );
}

export default ActivityScreen;
