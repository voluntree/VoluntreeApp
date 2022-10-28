import { View, Text, Image } from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { getAssociationById, getImageDonwloadURL } from "../../service/service";
import { ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";

const TarjetaArticulo = (props) => {
  const { articulo } = props;
  const [asoc, setAsociacion] = useState();
  const [uri, setUri] = useState({});
  const [uri2, setUri2] = useState({});

  const reference = ref(
    storage,
    "gs://voluntreepin.appspot.com/" + props.imagen
  );
  getDownloadURL(reference).then((path) => {
    setUri(path);
  });

  /*getAssociationById(articulo.asociacion).then((asoc) => {
    setAsociacion(asoc);
    getImageDonwloadURL(articulo.imagen).then((im1) => setUri(im1));
    getImageDonwloadURL(asociacion.imagen).then((im2) => setUri2(im2));
  });*/

  return (
    <TouchableOpacity>
      <View className="bg-[#afffce] rounded-sm flex-col w-max">
        <Image className="h-40 w-96 rounded-sm p-2" source={{ uri: uri }} />
        <Text>{articulo.titulo}</Text>
        <Text>{articulo.subtitulo}</Text>
        <View className="flex-row">
          {
            (asoc = !undefined ? (
              <Image className="rounded-full h-10" source={{ uri: uri2 }} />
            ) : (
              <></>
            ))
          }
          <View className="flex-col">
            {
              (asoc = !undefined ? (
                <Text>{asoc.nombre}</Text>
              ) : (
                <></>
              ))
            }
            <Text>{articulo.fecha_publicacion}</Text>
          </View>
          <Text>{articulo.favoritos.length}</Text>
          <TouchableOpacity className="ml-2 right-1">
            <Icon
              name={corazon}
              type="octicon"
              onPress={añadirFav}
              size={28}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TarjetaArticulo;
