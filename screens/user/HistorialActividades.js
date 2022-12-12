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
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import {doc, updateDoc} from "firebase/firestore"
import { ref } from "firebase/storage";
import { firebase, storage, uploadBytes, db, auth } from "../../utils/firebase";
import ModalPerfil from "../../components/user/ModalPerfil";
import { updateProfile } from "../../service/service";
import { getImageDownloadURL } from "../../service/service";
import ListaDeTarjetas from "../../components/ListaDeTarjetas";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const HistorialActividades = () => {
  const route = useRoute();
  const { voluntario, userID, foto } = route.params;

  const navigation = useNavigation();

  const user = auth.currentUser;

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const SearchText = "";
  const distancia = 0;
  const duracion = 0;
  const categoriasActivas = {};
  const dateValue =undefined;
  const order=0;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  if (hasGalleryPermission === false) {
    <Text>No tiene acceso a la galería</Text>;
  }

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);


  return (

   
    <TailwindProvider>
    <SafeAreaView className="h-full w-full space-y-5 p-5">
    <View>
              {/* Header */}
              <View className="flex flex-row items-center mb-5">
                <TouchableOpacity
                  onPress={() => {navigation.goBack()}}>
                  <Icon name="arrow-back" type="ionicon" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">  Historial Actividades</Text>
                
              </View>
              
                </View>
                <ListaDeTarjetas
          query={query(
            collection(db, "actividades"),
            where("confirmados", "array-contains", user.uid)
          )}
          searchText={SearchText}
          distancia={distancia}
          duracion={duracion}
          categoriasActivas={categoriasActivas}
          fecha={dateValue}
          order={order}
        />
    </SafeAreaView>
  </TailwindProvider>
            
          )
  
};


export default HistorialActividades;
