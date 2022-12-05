import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onSnapshot, doc } from "firebase/firestore";
import { getImageDownloadURL } from "../../service/service";
import { auth, db } from "../../utils/firebase";
import ListaActividadesPerfil from "../../components/association/ListaActividadesPerfil";
const ProfileAssociation = () => {
  const currentUser = auth.currentUser;
  const [asociacion, setAsociacion] = useState();
  const [profielPhoto, setProfilePhoto] = useState();
  const [backgroundPhoto, setBackgroundPhoto] = useState();

  useEffect(() => {
    onSnapshot(doc(db, "asociaciones", currentUser.uid), async (doc) => {
      setAsociacion(doc.data());
      setProfilePhoto(
        await getImageDownloadURL(
          "gs://voluntreepin.appspot.com/profileImages/asociaciones/" +
            doc.data().fotoPerfil
        )
      );
      setBackgroundPhoto(
        await getImageDownloadURL(
          "gs://voluntreepin.appspot.com/profileImages/asociaciones/" +
            doc.data().fondoPerfil
        )
      );
    });
  }, []);

  return (
    <View className="pb-24">
      {/* Contenedor PERFIL */}
      <View className="h-[37%] space-y-2">
        {/* Contenedor FOTO_PERFIL & NOMBRE & BOTON */}
        <View className="space-x-2 h-[55%]">
          {/* IMAGEN FONDO */}
          <View className="h-[100%] w-[100%] absolute z-10 bg-[#fff] opacity-75" />
          <Image
            source={{ uri: backgroundPhoto }}
            className="absolute w-full h-full"
          />

          <View className="flex-row z-20 mt-12 pl-2">
            {/* FOTO_PERFIL */}
            <View className="h-24 w-24 bg-[#fff] rounded-full justify-center items-center">
              <Image
                className="w-20 h-20 rounded-full"
                source={{ uri: profielPhoto }}
              />
            </View>

            {/* NOMBRE & BOTON*/}
            <View className="flex-1 p-2 justify-center space-y-2">
              {/* NOMBRE */}
              <View className="">
                <Text className="text-3xl text-[#086841] font-bold">
                  {asociacion?.nombre}
                </Text>
              </View>

              {/* BOTON */}
              <View className="">
                <TouchableOpacity
                  className="border border-[#b0dac7] bg-[#EFF8F4] rounded-lg w-1/2 h-8 justify-center items-center"
                  onPress={() => console.log(backgroundPhoto)}
                >
                  <Text className="text-[#086841] text-sm font-bold">
                    Editar perfil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Contenedor DESCRIPCION */}
        <View className="h-[45%] p-1">
          <Text className="text-[#086841] text-sm text-justify p-2">
            {asociacion?.descripcion}¡Bienvenidos a nuestro perfil! Somos un
            grupo de veterinarios agrupados en distintas ciudades españolas que
            buscan proteger y cuidar de los animales callejeros. Hola ho oasdf
            hdf asd dfdfdf sdfsd df.
          </Text>
        </View>
      </View>
      <View className="items-center">
        <View className="w-[90%] border-t-[1px] border-[#aaaaaa] justify-center" />
      </View>
      {/* Contenedor ACTIVIDADES */}
      <ScrollView
        className="h-[63%]"
        contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
      >
        <ListaActividadesPerfil />
      </ScrollView>
    </View>
  );
};

export default ProfileAssociation;
