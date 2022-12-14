import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";

import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import UserProfileTab from "../../components/user/UserProfileTab";
import { auth, db } from "../../utils/firebase";
import { collection, where, query, onSnapshot, doc } from "firebase/firestore";
import ModalPerfil from "../../components/user/ModalPerfil";
import { Image } from "react-native-elements";
import {
  deleteUserData,
  getVoluntarioByID,
  getImageDownloadURL,
} from "../../service/service";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { ArbolesPlantados, CartIcon } from "../../icons/Icons";
import { truncateText } from "../../service/functions";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [usuario, setUsuario] = useState([]);
  const [profilefoto, setProfilefoto] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [siguiendo, setSiguiendo] = useState();

  const q = query(
    collection(db, "voluntarios"),
    where("correo", "==", user.email)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, "voluntarios", user.uid), async (doc) => {
      setUsuario(doc.data());
      setProfilefoto(
        await getImageDownloadURL(
          "gs://voluntreepin.appspot.com/profileImages/voluntarios/"  + 
            doc.data().fotoPerfil
        )
      );
      setSiguiendo((doc.data().siguiendo.length));
    });
  }, []);

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
                deleteUserData(user.uid).then(
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

  return (
    <TailwindProvider>
      <SafeAreaView className="h-full w-full items-center bg-blanco">
        <View className="w-full pl-6 py-2">
          <Text
            className="grow-0 text-xl font-bold"
            style={{ color: theme.colors.ambiental }}
          >
            {usuario.nombre + " " + usuario.apellidos}
          </Text>
        </View>
        {/* Contenedor principal*/}
        <View className="flex-row h-24 w-full items-center justify-around">
          {/* Avatar*/}
          <View className="rounded-full ">
            <Image
              className=" h-20 w-20 rounded-full"
              source={{ uri: profilefoto }}
            />
          </View>

          {/* Contenedor Info Usuario*/}
          <View className="w-7/12 space-y-2">
            {/*Nombre*/}
            <View
              className={
                "flex-row w-max space-x-2 items-center justify-between"
              }
            >
              <TouchableOpacity
                className="flex-row w-32 h-8 border-[1px] border-[#086841] rounded-lg justify-evenly items-center"
                //style={{ backgroundColor: theme.colors.costas }}
                onPress={() =>
                  navigation.push("Following", { voluntario: usuario })
                }
              >
                <Text className="font-bold" style={{ color: theme.colors.ambiental }}>{siguiendo}</Text>
                <Text className="font-bold" style={{ color: theme.colors.ambiental }}>Siguiendo</Text>
              </TouchableOpacity>
              {/*Tienda*/}
              <View className="flex-row space-x-2">
                <TouchableOpacity onPress={() => navigation.navigate("Tienda")}>
                  <View
                    className="rounded-lg justify-center items-center h-8 w-8"
                    style={{ backgroundColor: theme.colors.costas }}
                  >
                    {CartIcon(16, 16)}
                  </View>
                </TouchableOpacity>

                {/*Opciones*/}
                <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
                  <View
                    className="rounded-lg justify-center items-center h-8 w-8"
                    style={{ backgroundColor: theme.colors.costas }}
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
              </View>
            </View>
            {/* Contenedor Editar Perfil y Siguiendo */}
            <View className="flex-row space-x-2">
              {/* Botón Editar Perfil*/}
              <View
                className="flex-grow h-8 rounded-lg"
                style={{ backgroundColor: theme.colors.costas }}
              >
                <TouchableOpacity
                  className="w-full h-full justify-center items-center"
                  onPress={() => {
                    navigation.push("EditProfileVol", {
                      voluntario: usuario,
                      userID: user.uid,
                      foto: profilefoto,
                    });
                  }}
                >
                  <Text style={{ color: theme.colors.ambiental }}>
                    Editar Perfil
                  </Text>
                </TouchableOpacity>
              </View>

              {/*Botón Siguiendo*/}
              <View
                className="flex-grow h-8 rounded-lg"
                style={{ backgroundColor: theme.colors.deportivo }}
              >
                <TouchableOpacity
                  className="w-full h-full justify-center items-center"
                  onPress={() => {
                    navigation.push("HistorialActividades", {
                      voluntario: usuario,
                      userID: user.uid,
                      foto: profilefoto,
                    });
                  }}
                >
                  <Text style={{ color: theme.colors.ambiental }}>
                    Historial
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/*Arboles plantados*/}
        <View className="py-2 bg-blanco items-center justify-center space-y-2">
          {/*Icono arbol*/}
          <View>{ArbolesPlantados(32, 48, theme.colors.cultural)}</View>
          {/*Numero arboles plantados*/}
          <Text style={{ color: theme.colors.ambiental }}>
            árboles plantados
          </Text>
          <Text className="font-bold" style={{ color: theme.colors.ambiental }}>
            {usuario.puntos}
          </Text>
        </View>
        {/*Actividades Favoritos*/}
        <View className="w-full bg-blanco" style={{ height: "72%" }}>
          <UserProfileTab />
        </View>
        <ModalPerfil
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onCerrarSesion={onCerrarSesion}
          onBorrarCuenta={onBorrarCuenta}
        ></ModalPerfil>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default ProfileScreen;
