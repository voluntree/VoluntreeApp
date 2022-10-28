import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { getAsociationByID, getImageDownloadURL } from "../../service/service";

const TarjetaArticulo = (props) => {
  const { articulo } = props;
  const [asociacion, setAsociacion] = useState();
  const [uri, setUri] = useState();
  const [uri2, setUri2] = useState();

  useEffect(() => {
    console.log("articulo");
    getData();
  }, []);

  async function getData() {
    setUri(await getImageDownloadURL(articulo.imagen));
    let asoc = await getAsociationByID(articulo.asociacion);
    setAsociacion(asoc);
    setUri2(await getImageDownloadURL(asoc.fotoPerfil));
  }

  return (
    <TouchableOpacity className="bg-[#ffffff] rounded-lg flex-col m-2">
      <View>
        <Image className="h-40 w-max rounded-t-lg m-1" source={{ uri: uri }} />
      </View>
      <View className="px-3 pb-2">
        <Text className="text-xl font-bold">{articulo.titulo}</Text>
        <Text className="text-base">{articulo.introduccion}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row">
            {asociacion != undefined ? (
              <Image
                className="rounded-sm h-10 w-10 mr-2"
                source={{ uri: uri2 }}
              />
            ) : (
              <></>
            )}
            <View className="flex-col">
              {asociacion != undefined ? (
                <Text>{asociacion.nombre}</Text>
              ) : (
                <></>
              )}
              <Text>{articulo.fecha_publicacion}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Text>{articulo.favoritos.length}</Text>
            <TouchableOpacity className="ml-2">
              <Icon name="heart" type="octicon" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TarjetaArticulo;
