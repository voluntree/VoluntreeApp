import { View, Text, ScrollView, Image } from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { articulo, uri, asociacion, uriAsociacion } = route.params;

  return (
    <SafeAreaView>
      <ScrollView className="flex h-auto px-2 py-2 w-100 bg-[white]">
      <View className="flex-row my-2 justify-around">
        <View className="flex-col">
          <View className="rounded-full border-solid border-2 border-[#333] h-auto">
            <Image
              className="rounded-full border-solid border-2 border-[#333] h-20 w-20"
              source={{ uri: uriAsociacion }}
            />
          </View>

          <Text className="font-bold">{asociacion.nombre}</Text>
        </View>
        <View className="flex-col">
          <View className="flex-col">
            <Text className="text-base font-semibold">
              Fecha de publicación
            </Text>
            <Text className="text-base ">{articulo.fecha_publicacion}</Text>
          </View>
          <View className="flex-col">
            <Text className="text-base font-semibold">Publicado por</Text>
            <Text className="text-base ">{articulo.autor}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text className="text-xl font-bold ">{articulo.titulo}</Text>
        <Text className="text-base font-semibold p-2">
          {articulo.subtitulo}
        </Text>
      </View>

      <Image className="h-44 mt-2 rounded-md" source={{ uri: uri }} />
      <View className="h-max my-6 px-2">
        <Text className="text-base mb-3">{articulo.introduccion}</Text>
        <Text className="text-base mb-3">{articulo.cuerpo}</Text>
        <Text className="text-base mb-2">{articulo.conclusion}</Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default NewsScreen;
