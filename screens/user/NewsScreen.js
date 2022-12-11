import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserInstance } from "../../service/LoginService";
import { deleteArticle } from "../../service/service";
import { Alert } from "react-native";

const NewsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { articulo, uri, asociacion, uriAsociacion } = route.params;
  const [user, setUser] = useState(getUserInstance());

  useEffect(() => {},[]);

  const openToModify = () => {
    navigation.navigate("Modify Article", { articulo: articulo, uri: uri });
  };

  const deleteNews = async () => {
    try {
      await deleteArticle(articulo)
      Alert.alert("Borrado exitoso","El borrado se realizó correctamente")
      navigation.navigate("News")
    } catch (error) {
      Alert.alert("Error",error.message)
    }
  }

  const ModifyButton = () => {
    return (
      <View className="py-2">
        {user.nombre == asociacion.nombre && (
          <TouchableOpacity
            className="w-auto p-3 items-center justify-center rounded-md bg-costas"
            onPress={openToModify}
          >
            <Text className="text-base text-ambiental">Modificar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const DeleteButton = () => {
    return (
      <View className="py-2">
        {user.nombre == asociacion.nombre && (
          <TouchableOpacity className="w-auto p-3 items-center justify-center rounded-md bg-rojo"
          onPress={deleteNews}
          >
            <Text className="text-base text-blanco">Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView className="flex h-full px-3 py-2 w-100 bg-blanco">
        <View className="flex-row my-2 justify-start space-x-4">
          <View className="flex-col items-center">
            <Image
              className="rounded-full h-12 w-12"
              source={{ uri: uriAsociacion }}
            />

            <Text className="font-bold text-ambiental">
              {asociacion.nombre}
            </Text>
          </View>
          <View className="flex-row space-x-2 items-baseline">
            <View className="flex-col">
              <Text className="text-sm font-bold text-ambiental">
                Fecha de publicación
              </Text>
              <Text className="text-sm text-ambiental">
                {articulo.fecha_publicacion}
              </Text>
            </View>
            <View className="flex-col">
              <Text className="text-small font-bold text-ambiental">
                Publicado por
              </Text>
              <Text className="text-small text-ambiental ">
                {articulo.autor}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text className="text-lg font-bold text-ambiental">
            {articulo.titulo}
          </Text>
          <Image className="h-44 mt-2 rounded-md" source={{ uri: uri }} />
          <Text className="text-base font-semibold  text-ambiental">
            {articulo.subtitulo}
          </Text>
          <View className="h-max">
            <Text className="text-sm mb-3 text-ambiental text-justify">
              {articulo.introduccion}
            </Text>
            <Text className="text-sm mb-3 text-ambiental text-justify">
              {articulo.cuerpo}
            </Text>
            <Text className="text-sm mb-2 text-ambiental text-justify">
              {articulo.conclusion}
            </Text>
            <ModifyButton />
            <DeleteButton/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsScreen;
