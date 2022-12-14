import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import {
  getImageDownloadURL,
  followAsociation,
  unfollowAsociation,
  getAsociacionByEmail,
  deleteUserData,
  deleteAssocData,
} from "../../service/service";
import ListaActividadesPerfil from "../../components/association/ListaActividadesPerfil";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import ModalPerfil from "../../components/user/ModalPerfil";

const Profile = (props) => {
  const navigation = useNavigation();
  const fromUser = props.fromUser;
  const userID = props.userID;
  const [user, setUser] = useState();

  const [asociacion, setAsociacion] = useState(props.asociacion);
  const [following, setFollow] = useState(false);
  const [profielPhoto, setProfilePhoto] = useState("default.png");
  const [backgroundPhoto, setBackgroundPhoto] = useState(
    "defaultBackground.jpg"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (fromUser) {
      getImages(asociacion);
      setFollow(asociacion.seguidores.includes(userID));
    } else {
      
      initDataFromAssociation().catch();
    }
  }, [profielPhoto, backgroundPhoto]);

  const onCerrarSesion = () => {
    Alert.alert(
      "Cerrar Sesión",
      "Se cerrara la sesión\n¿Seguro que quieres cerrar sesión?",
      [
        { text: "Sí", onPress: () => navigation.navigate("Login") },
        { text: "Cancelar", onPress: () => {} },
      ],
      { cancelable: false }
    );
  };

  const onBorrarCuenta = () => {
    Alert.alert(
      "Borrar Cuenta",
      "Se borrará la cuenta\n¿Seguro que quieres borra la cuenta?\nEsta acción no se puede deshacer",
      [
        {
          text: "Sí",
          onPress: () => {
            try {
              user.delete().then(() => {
                deleteAssocData(asociacion).then(
                  Alert.alert(
                    "Cuenta borrada",
                    "La cuenta se ha borrado correctamente"
                  ),
                  navigation.navigate("Login")
                );
              });
            } catch (error) {
              Alert.alert(
                "Error",
                "Ha ocurrido un error al borrar la cuenta. Inténtelo de nuevo más tarde"
              );
            }
          },
        },
        { text: "Cancelar", onPress: () => {} },
      ],
      { cancelable: false }
    );
  };

  async function initDataFromAssociation() {
    setUser(auth.currentUser);
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
        <View className="mt-2 w-11/12">
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
        <View className="mt-2 w-11/12">
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

  const Opciones = () => {
    if (!fromUser) {
      return (
        <TouchableOpacity 
          className="absolute right-0 mt-2 mr-24"
          onPress={() => setIsModalOpen(!isModalOpen)}
        >
          <View
            className="rounded-lg justify-center items-center h-8 w-8 bg-[#EFF8F4]"
          >
            <Icon
              name="triangle-down"
              type="octicon"
              color={theme.colors.ambiental}
              size={24}
              onPress={() => setIsModalOpen(!isModalOpen)}
            />
          </View>
        </TouchableOpacity>
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

                  {/* NOMBRE & OPCIONES & BOTON*/}
                  <View className="flex-1 px-2 justify-center mb-2">
                    {/* NOMBRE */}
                    <View className="">
                      <Text className="text-3xl text-[#086841] font-bold">
                        {asociacion?.nombre}
                      </Text>
                    </View>
                    <View className="flex-row">
                      {/* BOTON */}
                      <EditOrFollow />
                      {/*Opciones*/}
                      <Opciones />
                    </View>
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
      <ModalPerfil
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onCerrarSesion={onCerrarSesion}
          onBorrarCuenta={onBorrarCuenta}
        />
    </SafeAreaView>
  );
};

export default Profile;
