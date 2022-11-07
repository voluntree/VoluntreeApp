import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon, Image } from "react-native-elements";
import {
  followAsociation,
  unfollowAsociation, 
  getAsociationByID,
  getFotoBGAsociacion,
  getFotoPerfilAsociacion,
  getImageDownloadURL,
} from "../../service/service";
import ListaActividadesPerfil from "./ListaActividadesPerfil";
import { SafeAreaView } from "react-native-safe-area-context";

const Feed = () => {
  const [bgfoto, setBgfoto] = useState();
  const [profilefoto, setProfilefoto] = useState();
  const [datosAsoc, setDatosAsoc] = useState([]);
  const [following, setFollow] = useState(false);

  const nombreAsoc = "Modepran";

  const currentUser = {
    nombre: "Zhehao",
    apellidos: "Xie Qiu",
  };

  async function getData() {
    setBgfoto(
      await getImageDownloadURL(
        `gs://voluntreepin.appspot.com/${nombreAsoc.toLowerCase()}/perfil/backgroundPerfil.jpg`
      )
    );
    setProfilefoto(
      await getImageDownloadURL(
        `gs://voluntreepin.appspot.com/${nombreAsoc.toLowerCase()}/perfil/logo.jpg`
      )
    );

    let asociacion = await getAsociationByID(nombreAsoc);
    setDatosAsoc(asociacion);
  }

  getAsociationByID(nombreAsoc).then((asociacion) => {
    setFollow(asociacion.seguidores.includes(currentUser.nombre + " " + currentUser.apellidos));
  });

  useEffect(() => {
    getData();
  });

  const follow = () => {
    followAsociation(currentUser, nombreAsoc);
    setFollow(true);
  }

  const unfollow = () => {
    unfollowAsociation(currentUser, nombreAsoc);
    setFollow(false);
  }

  return (
    <SafeAreaView className = "">
    <TailwindProvider>
      <ScrollView>
        <View>
          <View className="items-center">
            <View className="h-60 w-full">
              <Image className="h-48 w-fit opacity" source={{ uri: bgfoto }} />
            </View>
            <View className="absolute z-10 mt-36 flex-row items-center space-x-10">
              <TouchableOpacity>
                <View className="bg-[#fff] rounded-full h-14 w-14 justify-center">
                  <Icon name="mail" type="material" color="#00BFA5" size={36} />
                </View>
              </TouchableOpacity>
              <Image
                className="h-24 w-24 rounded-lg"
                source={{ uri: profilefoto }}
              />
              <TouchableOpacity>
                <View className="bg-[#fff] rounded-full h-14 w-14 justify-center">
                  <Icon
                    name="notifications"
                    type="material"
                    color="#00BFA5"
                    size={36}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View className="mt-1">
              <Text className="font-bold text-center text-lg">
                {datosAsoc.nombre}
              </Text>
              <Text className="text-center">{datosAsoc.tipoAsociacion}</Text>
            </View>
            <TouchableOpacity className="pt-2" onPress={!following ? follow : unfollow}>
              <View className="bg-[#00BFA5] justify-center items-center w-64 h-8 rounded-xl">
                { currentUser.nombre==nombreAsoc ? (
                  <Text className="font-semibold text-base text-[#eee]">Editar perfil</Text>
                  ) : (
                    !following ? (
                      <Text className="font-semibold text-base text-[#eee]">Seguir</Text>
                    ) : (
                      <Text className="font-semibold text-base text-[#eee]">Siguiendo</Text>
                    )
                  )
                }
              </View>
            </TouchableOpacity>
            <ListaActividadesPerfil />
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full h-[30px]"></View>
    </TailwindProvider>
    </SafeAreaView>
  );
};

export default Feed;
