import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
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
  import { getImageDownloadURL } from "../../service/service";
  import { useRoute } from "@react-navigation/native";
  
  const EditProfile = () => {
    // const route = useRoute();
    // const { user } = route.params;


    const navigation = useNavigation();
    const [usuario, setUsuario] = useState([]);
    const [profilefoto, setProfilefoto] = useState();
  
    const[isModalOpen, setIsModalOpen] = useState(false)
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    async function getProfileImage(data) {
      setProfilefoto(
        await getImageDownloadURL(
          `gs://voluntreepin.appspot.com/${data.nombre.toLowerCase()}/logo.jpg`
        )
      );
  
    }
  
    useEffect(() => {
    }, [])
    
    
    
    return (
      <TailwindProvider>
        <SafeAreaView className="h-full w-full space-y-5 p-5">
            {/* Header */}
            <View className="flex flex-row justify-between items-center">
                <TouchableOpacity onPress={() => {console.log('Back')}}>
                    <Icon name="arrow-back" type="ionicon" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Editar perfil</Text>
                <TouchableOpacity onPress={() => {console.log('Save');}}>
                    <Icon name="checkmark" type="ionicon" />
                </TouchableOpacity>
            </View>
            {/* Contenedor Imagen y Nombre */}
            <View className="flex-row justify-between">
                {/* Foto de perfil*/}
                <View className="h-48 space-y-4">
                    <View className="rounded-full h-28 w-28 bg-[#dadada] items-center justify-center">
                        <Text className="italic">Foto perfil</Text>
                    </View>
                    <TouchableOpacity className="h-14 w-28 bg-[#dadada] rounded-xl justify-center items-center">
                        <Text className="font-bold italic text-center">Seleccionar foto de perfil</Text>
                    </TouchableOpacity>
                </View>
                {/* Nombre y apellidos */}
                <View className="h-48 space-y-5">
                    <View className="space-y-2">
                        <Text className="text-base font-bold italic">Nombre</Text>
                        <TextInput
                            className="h-12 w-52 bg-[#dadada] rounded-md p-2"    
                        />
                    </View>
                    <View className="space-y-2">
                        <Text className="text-base font-bold italic">Apellidos</Text>
                        <TextInput
                            className="h-12 w-52 bg-[#dadada] rounded-md p-2"
                        />
                    </View>
                </View>
            </View>
            {/* Contenedor de datos */}
            <View className="flex flex-col space-y-5">
                <View className="space-y-2">
                    <Text className="text-base font-bold italic">Correo electrónico</Text>
                    <TextInput
                        className="h-12 w-full bg-[#dadada] rounded-md p-2"
                    />
                </View>
                <View className="space-y-2">
                    <Text className="text-base font-bold italic">Número de teléfono</Text>
                    <TextInput
                        className="h-12 w-full bg-[#dadada] rounded-md p-2"
                    />
                </View>
            </View> 
          <ModalPerfil 
            isModalOpen = {isModalOpen}
            setIsModalOpen = {setIsModalOpen}
          />
        </SafeAreaView>
      </TailwindProvider>
    );
  };
  
  export default EditProfile;
  