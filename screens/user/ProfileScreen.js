import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon } from "react-native-elements";
import { theme } from "../../tailwind.config";
import UserProfileTab from "../../components/user/UserProfileTab";
import { auth, db } from "../../utils/firebase";
import { doc, getDocs, collection, where, query, getDoc,} from "firebase/firestore";
import ModalPerfil from "../../components/user/ModalPerfil";
import { Image } from "react-native-elements";
import { deleteAccount, deleteUserData, getImageDownloadURL, getVoluntarioByID } from "../../service/service";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { deleteUser } from "firebase/auth";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const [usuario, setUsuario] = useState([]);
  const [profilefoto, setProfilefoto] = useState();
  const[isModalOpen, setIsModalOpen] = useState(false)
  const q = query(collection(db, "voluntarios"), where("email", "==", user.email));
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

 

  useEffect(() => {
    getVoluntarioByID(user.uid).then((data) => {
      setUsuario(data);
      getDownloadURL(ref(storage,"gs://voluntreepin.appspot.com/profileImages/voluntarios/" + data.fotoPerfil))
      .then((path) => {
        setProfilefoto(path);
      });
    });
  }, [])
  
  const onCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      'Se cerrara la sesión\n¿Seguro que quieres cerrar sesión?',
      [
        {text: 'Sí', onPress: () =>  navigation.navigate('Login')},
        {text: 'Cancelar', onPress: () =>{}},
      ],
      {cancelable: false},
    );
  }

  const onBorrarCuenta = () => {
    Alert.alert(
      'Borrar Cuenta',
      'Se borrará la cuenta\n¿Seguro que quieres borra la cuenta?\nEsta acción no se puede deshacer',
      [
        {text: 'Sí', 
        onPress: () =>  {
          try {
            user.delete().then(() => {
              deleteUserData(user.uid).then(
              Alert.alert("Cuenta borrada", "La cuenta se ha borrado correctamente"),
              navigation.navigate('Login'));
            })
          } catch (error) {
            Alert.alert("Error", "Ha ocurrido un error al borrar la cuenta. Inténtelo de nuevo más tarde");
          }
        }},
        {text: 'Cancelar', onPress: () =>{}},
      ],
      {cancelable: false},
    );
  }
  
  return (
    <TailwindProvider>
      <SafeAreaView className="h-full w-full items-center">
        {/* Contenedor principal*/}
        <View className="flex-row w-full max-w-full h-24 bg-blanco p-2 space-x-2 items-center">
          {/* Avatar*/}
          <View className="mt-2 items-center justify-center">
            <Image
              className="h-16 w-16 rounded-full"
              source={{ uri: profilefoto }}
            />
          </View>
          {/* Contenedor Info Usuario*/}
          <View className="flex flex-grow space-y-2">
            {/* Contenedor Nombre, Nivel, Experiencia*/}
            <View className="flex-row justify-between">
              {/* Nombre */}
              <View className="justify-center">
                <Text className="text-lg font-bold">{usuario.nombre}  {usuario.apellidos}</Text>
              </View>
              {/* Nivel 
              <View className="flex justify-center items-center">
                <Text>Nivel</Text>
                <View className="bg-bottomTabs w-[30px] h-[30px] justify-center items-center rounded-full">
                  <Text>99</Text>
                </View>
              </View>*/}
              {/* Experiencia
              <View className="flex w-28 justify-center items-center">
                <Text>Experiencia</Text>
                <Text className="text-right w-full text-xs">
                  5000/10000 XP
                </Text>
                <Progress.Bar
                  className="w-full"
                  progress={0.5}
                  width={null}
                  style={{
                    backgroundColor: theme.colors.bottomTabs,
                    borderWidth: 0,
                    height: 10,
                  }}
                  color={theme.colors.focusBottomTabs}
                  height={10}
                />
              </View>*/}
            </View>
            {/* Contenedor Editar Perfil y Siguiendo */}
            <View className="flex-row space-x-2">
              {/* Botón Editar Perfil*/}
              <View className="flex-grow bg-bottomTabs h-8 rounded-lg justify-center items-center">
                <TouchableOpacity onPress={() => navigation.push("EditProfile", { voluntario: usuario, userID: user.uid, foto: profilefoto })}>
                  <Text>Editar Perfil</Text>
                </TouchableOpacity>
              </View>
              {/*Botón Siguiendo*/}
              <View className="flex-grow bg-bottomTabs h-8 rounded-lg justify-center items-center">
                <TouchableOpacity onPress={() => navigation.push("Following",{ voluntario: usuario})}>
                  <Text>Siguiendo</Text>
                </TouchableOpacity>
              </View>
              {/*Botón Opciones*/}
              <TouchableOpacity className = "flex-grow" onPress={() => setIsModalOpen(!isModalOpen)}>
                <View className=" bg-bottomTabs h-8 rounded-lg justify-center items-center">
                  <Icon 
                    name="triangle-down"
                    type="octicon"
                    color={theme.colors.blanco}
                    size={24}
                    onPress={() => setIsModalOpen(!isModalOpen)}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Lista Chats")}><Text>chats</Text></TouchableOpacity>
        <View className="flex w-full bg-blanco p-2">
          {
              usuario.descripcion != null && usuario.descripcion != undefined ?
                (<Text className="">{usuario.descripcion}</Text>)
              :
                (<Text className="">Sin descripción</Text>)
              
          } 
        </View>
        <View style = {{ width: "100%", height: "100%", paddingBottom: "30%"}}>
          <UserProfileTab />
        </View>
        <ModalPerfil 
          isModalOpen = {isModalOpen}
          setIsModalOpen = {setIsModalOpen}
          onCerrarSesion = {onCerrarSesion}
          onBorrarCuenta = {onBorrarCuenta}
        >
        </ModalPerfil>
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default ProfileScreen;
