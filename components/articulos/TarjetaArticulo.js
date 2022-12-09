import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { getAsociationByID, getAssociationByName, getImageDownloadURL } from "../../service/service";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../tailwind.config";

const TarjetaArticulo = (props) => {
  const { articulo } = props;
  const [asociacion, setAsociacion] = useState();
  const [uri, setUri] = useState();
  const [uri2, setUri2] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);

  function readArticle() {
    navigation.push("Articulo", {
      articulo: articulo,
      uri: uri,
      asociacion: asociacion,
      uriAsociacion: uri2,
    });
  }

  async function getData() {
    setUri(await getImageDownloadURL(articulo.imagen));
    let asoc = await getAssociationByName(articulo.asociacion);
    setAsociacion(asoc);
    setUri2(await getImageDownloadURL("profileImages/asociaciones/" + asoc.fotoPerfil));
  }

  return (
    <TouchableOpacity
      onPress={readArticle}
      className="mx-2"
    >
      <View className = "absolute h-full w-0.5 bg-ambiental top-0 left-7"></View>
      <View className = "flex p-2">
        {/* Asociacion y fecha publicación */}
        
        <View className = "flex-row justify-between items-center">
        <View className="flex-row justify-between items-center">
          <View className="flex-row">
            {asociacion != undefined ? (
              <Image
                className="rounded-full h-10 w-10 mr-2"
                source={{ uri: uri2 }}
              />
            ) : (
              <></>
            )}
            <View className="flex-col">
              {asociacion != undefined ? (
                <Text className = "text-ambiental font-bold">{asociacion.nombre}</Text>
              ) : (
                <></>
              )}
              <Text className = "text-ambiental">{articulo.fecha_publicacion}</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center justify-start">
              <Text className = "text-ambiental">{articulo.favoritos.length}</Text>
              <TouchableOpacity className="ml-2">
                <Icon name="heart" type="octicon" size={18} color={theme.colors.ambiental}/>
              </TouchableOpacity>
            </View>
        </View>
        <View className = "flex  justify-center items-center">
          <View className = "w-full pl-12">
            <Image className="h-40 w-full rounded-md" source={{ uri: uri }} />
            <Text className="text-base text-ambiental font-bold">{articulo.titulo}</Text>
            <Text className="text-sm text-ambiental">{articulo.introduccion}</Text>
          </View>
        </View>
      </View>
      
    </TouchableOpacity>
  );
};

export default TarjetaArticulo;
