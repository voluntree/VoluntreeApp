import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { Icon, Image } from "react-native-elements";
import { getAsociationByID, getFotoBGAsociacion, getFotoPerfilAsociacion } from "../../service/service";
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref} from "firebase/storage";

const Feed = () => {

  const nombre = "Modepran"
  const [datosAsoc, setDatosAsoc] = useState([]);
  getAsociationByID("Modepran").then((datos) => {
    setDatosAsoc(datos);
  });

  const[bgfoto, setBgfoto] = useState()
  const[profilefoto, setProfilefoto] = useState()

  const referenciaFotoPerfil = ref(
    storage,
    `gs://voluntreepin.appspot.com/${nombre.toLowerCase()}/perfil/logo.jpg`
  );
  const referenciaFotoBg = ref(
    storage,
    `gs://voluntreepin.appspot.com/${nombre.toLowerCase()}/perfil/backgroundPerfil.jpg`
  );
  
  getDownloadURL(referenciaFotoBg).then((path) =>{setBgfoto(path)})
  getDownloadURL(referenciaFotoPerfil).then((path) => {setProfilefoto(path)});


  return (
    <TailwindProvider>
      <ScrollView>
        <View>
          <View className="items-center">
            <View className="h-60 w-full">
              <Image
                className="h-48 w-fit opacity"
                source={{ uri: bgfoto}}
              />
            </View>
            <View className="absolute z-10 mt-36 flex-row items-center space-x-10">
              <TouchableOpacity>
                <View className="bg-[#fff] rounded-full h-14 w-14 justify-center">
                  <Icon name="mail" type="material" color="#00BFA5" size={36} />
                </View>
              </TouchableOpacity>
              <Image
                className="h-24 w-24 rounded-lg"
                source={{ uri: profilefoto}}
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
            <TouchableOpacity className="">
              <View>
                <Text>Seguir</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TailwindProvider>
  );
};

export default Feed;
