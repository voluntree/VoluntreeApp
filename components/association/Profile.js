import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
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
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = (props) => {
  const navigation = useNavigation();
  const fromUser = props.fromUser;
  const userID = props.userID;

  const [asociacion, setAsociacion] = useState(props.asociacion);
  const [following, setFollow] = useState(false);
  const [profielPhoto, setProfilePhoto] = useState("");
  const [backgroundPhoto, setBackgroundPhoto] = useState("");

  useEffect(() => {
    if (fromUser) {
      getImages(asociacion);
      setFollow(asociacion.seguidores.includes(userID));
    } else {
      initDataFromAssociation().catch();
    }
  }, [profielPhoto]);

  async function initDataFromAssociation() {
    const asoc = await getAsociacionByEmail(props.correoAsociacion);
    setAsociacion(asoc);
    getImages(asoc);
  }

  const getImages = (asociacion) => {
    if (asociacion.fotoPerfil == "default.png") {
      getImageDownloadURL(
        "gs://voluntreepin.appspot.com/profileImages/asociaciones/default.png"
      ).then((fotoPerfil) => {
        setProfilePhoto(fotoPerfil);
      });
    } else {
      getImageDownloadURL(
        "gs://voluntreepin.appspot.com/profileImages/asociaciones/" +
          asociacion.nombre +
          "/" +
          asociacion.fotoPerfil
      ).then((fotoPerfil) => {
        setProfilePhoto(fotoPerfil);
      });
    }

    if (
      asociacion.fondoPerfil == "defaultBackground.jpg" ||
      asociacion.fondoPerfil == "defaultBackground.png"
    ) {
      getImageDownloadURL(
        "gs://voluntreepin.appspot.com/profileImages/asociaciones/defaultBackground.jpg"
      ).then((fotoFondo) => {
        setBackgroundPhoto(fotoFondo);
      });
    } else {
      getImageDownloadURL(
        "gs://voluntreepin.appspot.com/profileImages/asociaciones/" +
          asociacion.nombre +
          "/" +
          asociacion.fondoPerfil
      ).then((fotoFondo) => {
        setBackgroundPhoto(fotoFondo);
      });
    }
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

  const follow = () => {
    followAsociation(userID, asociacion.nombre).then(() => {
      setFollow(true);
    });
  };

  const unfollow = () => {
    unfollowAsociation(userID, asociacion.nombre).then(() => {
      setFollow(false);
    });
  };

  return (
    <SafeAreaView>
      <View className="h-full w-full">
        {asociacion != undefined && (
          <View className="h-full w-full">
            {/* Contenedor PERFIL */}
            <View className="space-y-2">
              {/* Contenedor FOTO_PERFIL & NOMBRE & BOTON */}
              <View className="">
                {/* IMAGEN FONDO */}
                <View className="h-full w-full absolute z-10 bg-[#fff] opacity-70" />
                <Image
                  source={{ uri: backgroundPhoto }}
                  className="absolute w-full h-full"
                />

                <View className="flex-row z-20 my-8 pl-4 space-x-2">
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
              <View className="p-1">
                <Text className="text-[#086841] text-[16px] text-center p-2">
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
            <View className="mt-2">
              <ListaActividadesPerfil
                asociacion={asociacion.nombre}
                fromUser={fromUser}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
