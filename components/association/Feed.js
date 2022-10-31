import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon, Image } from "react-native-elements";
import {
  getAsociationByID,
  getFotoBGAsociacion,
  getFotoPerfilAsociacion,
  getImageDownloadURL,
} from "../../service/service";
import ListaActividadesPerfil from "./ListaActividadesPerfil";

const Feed = () => {
  const [bgfoto, setBgfoto] = useState();
  const [profilefoto, setProfilefoto] = useState();

  const nombre = "Modepran";

  const [datosAsoc, setDatosAsoc] = useState([]);

  async function getData() {
    setBgfoto(
      await getImageDownloadURL(
        `gs://voluntreepin.appspot.com/${nombre.toLowerCase()}/perfil/backgroundPerfil.jpg`
      )
    );
    setProfilefoto(
      await getImageDownloadURL(
        `gs://voluntreepin.appspot.com/${nombre.toLowerCase()}/perfil/logo.jpg`
      )
    );

    let asociacion = await getAsociationByID(nombre);
    setDatosAsoc(asociacion);
  }

  useEffect(() => {
    getData();
  });

  return (
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
            <TouchableOpacity className="pt-2">
              <View className="bg-[#00BFA5] justify-center items-center w-64 h-8 rounded-xl">
                <Text className="font-semibold text-base text-[#eee]">
                  Seguir
                </Text>
              </View>
            </TouchableOpacity>
            <ListaActividadesPerfil className="" />
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 bg-[#eee] w-full h-[30px]"></View>
    </TailwindProvider>
  );
};

export default Feed;
