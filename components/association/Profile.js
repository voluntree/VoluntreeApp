import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import {
  getImageDownloadURL,
  followAsociation,
  unfollowAsociation,
  getAsociacionByEmail,
} from "../../service/service";
import ListaActividadesPerfil from "../../components/association/ListaActividadesPerfil";

const Profile = (props) => {
  const navigation = useNavigation();
  const [asociacion, setAsociacion] = useState(props.asociacion);
  const fromUser = props.fromUser;
  const userID = props.userID;
  const [following, setFollow] = useState(false);
  const [profielPhoto, setProfilePhoto] = useState("");
  const [backgroundPhoto, setBackgroundPhoto] = useState("");

  useEffect(() => {
    if (fromUser) {
      getImages(asociacion).catch(console.error);
      setFollow(asociacion.seguidores.includes(userID));
    } else {
      initDataFromAssociation().catch();
    }
  }, []);

  async function initDataFromAssociation() {
    const asoc = await getAsociacionByEmail(props.correoAsociacion);
    setAsociacion(asoc);
    getImages(asoc);
  }

  const getImages = async (asociacion) => {
    let fotoPerfil = await getImageDownloadURL(
      "profileImages/asociaciones/" + asociacion.fotoPerfil
    );
    if (fotoPerfil == null) fotoPerfil = "";
    setProfilePhoto(fotoPerfil);

    let fotoFondo = await getImageDownloadURL(
      "profileImages/asociaciones/" + asociacion.fondoPerfil
    );
    if (fotoFondo == null) fotoFondo = "";
    setBackgroundPhoto(fotoFondo);
  };

  const EditOrFollow = () => {
    if (!fromUser) {
      return (
        <View className="">
          <TouchableOpacity
            className="border border-[#b0dac7] bg-[#EFF8F4] rounded-lg w-1/2 h-8 justify-center items-center"
            onPress={() => {
              navigation.push("EditProfileAssoc", {
                association: asociacion,
                assocID: userID,
                fotoPerfil: profielPhoto,
                fondoPerfil: backgroundPhoto,
              });
            }}
          >
            <Text className="text-[#086841] text-sm font-bold">
              Editar perfil
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View className="">
          <TouchableOpacity
            className="border border-[#b0dac7] bg-[#EFF8F4] rounded-lg w-1/2 h-8 justify-center items-center"
            onPress={() => {
              following ? unfollow() : follow();
            }}
          >
            {following ? (
              <Text className="text-[#086841] text-sm font-bold">
                Siguiendo
              </Text>
            ) : (
              <Text className="text-[#086841] text-sm font-bold">Seguir</Text>
            )}
          </TouchableOpacity>
        </View>
      );
    }
  };

  const follow = async () => {
    await followAsociation(userID, asociacion.nombre);
    setFollow(true);
  };

  const unfollow = () => {
    unfollowAsociation(userID, asociacion.nombre);
    setFollow(false);
  };

  return (
    <View>
      {asociacion != undefined && (
        <View className="pb-24">
          {/* Contenedor PERFIL */}
          <View className="h-[38%] space-y-2">
            {/* Contenedor FOTO_PERFIL & NOMBRE & BOTON */}
            <View className="h-[65%]">
              {/* IMAGEN FONDO */}
              <View className="h-[100%] w-[100%] absolute z-10 bg-[#fff] opacity-70" />
              <Image
                source={{ uri: backgroundPhoto }}
                className="absolute w-full h-full"
              />

              <View className="flex-row z-20 mt-12 pl-4 space-x-2">
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
                  <EditOrFollow />
                </View>
              </View>
            </View>

            {/* Contenedor DESCRIPCION */}
            <View className="h-[35%] p-1">
              <Text className="text-[#086841] text-sm text-justify p-2">
                {asociacion?.descripcion
                  ? asociacion.descripcion
                  : "*Sin descripción*"}
              </Text>
            </View>
          </View>
          <View className="items-center">
            <View className="w-[90%] border-t-[1px] border-[#aaaaaa] justify-center" />
          </View>
          {/* Contenedor ACTIVIDADES */}
          <ScrollView
            className="h-[62%]"
            contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
          >
            <ListaActividadesPerfil asociacion = {asociacion.nombre}/>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Profile;
