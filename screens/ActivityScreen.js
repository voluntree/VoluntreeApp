import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { TouchableOpacity, View, SafeAreaView } from "react-native";
import { getDownloadURL, ref} from 'firebase/storage';
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
    setUri(path)
  })
  return (
    <TailwindProvider>
      <SafeAreaView className="h-full items-center">
        <View className="mx-3 ">
          <Image source={{ uri: uri }} />

          <View>
            <TouchableOpacity>
              <Icon name="arrow-left" color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="star" color="black" />
            </TouchableOpacity>
          </View>

          <ListItem icon>
            <Left>
              <Icon name="location" />
            </Left>
            <Body style={{ borderBottomColor: "transparent" }}>
              <Text>{actividad.ubicacion}</Text>
            </Body>
          </ListItem>

          <ListItem icon>
            <Left>
              <Icon name="location" />
            </Left>
            <Body style={{ borderBottomColor: "transparent" }}>
              <Text>{date}</Text>
            </Body>
          </ListItem>

          <ListItem icon>
            <Left>
              <Icon name="location" />
            </Left>
            <Body style={{ borderBottomColor: "transparent" }}>
              <Text>{actividad.descripcion}</Text>
            </Body>
          </ListItem>

          <Button title="Participa" />
        </View>
      </SafeAreaView>
    </TailwindProvider>
  );
}

export default ActivityScreen;
