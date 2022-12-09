import { TailwindProvider } from "tailwindcss-react-native";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useState, useEffect, useLayoutEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  desapuntarseDeActividad,
  inscribirUsuarioEnActividad,
} from "../../service/service";
import { getActivityById } from "../../service/service";
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from "../../tailwind.config";
import { doc, getDoc } from "firebase/firestore";
import { db, ref, storage } from "../../utils/firebase";
import { getDownloadURL } from "firebase/storage";


const AssociationActivityDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { actividad, uri } = route.params;
  const [region, setRegion] = useState({});
  const [imagen, setImagen] = useState();

  const date = () => {
    var fecha = actividad.fecha.toDate();
    return String(fecha.getHours()).padStart(2, '0') + ":" + String(fecha.getMinutes()).padStart(2, '0') + " " + String(fecha.getDate()).padStart(2, '0') + "/" 
    + String(fecha.getMonth() + 1).padStart(2, '0') + "/"
    + String(fecha.getFullYear())
  }

  useEffect(() => {
    const getAddress = async (lat, lng) => {
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.006,
        longitudeDelta: 0.00021,
      });
    };
    getAddress(
      actividad.ubicacion.latitude,
      actividad.ubicacion.longitude
    ).catch(console.error);
    getDoc(doc(db, "asociaciones/" + actividad.asociacion)).then(
    (value) => {
    getDownloadURL(ref(storage,"gs://voluntreepin.appspot.com/profileImages/asociaciones/" + value.data().fotoPerfil))
      .then((path) => {
        setImagen(path);
      })});
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const goBack = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };

  const openDetails = () => {
    getActivityById(actividad.titulo).then((activity) => {
      navigation.push("Edit", { actividad: activity, uri: uri });
    });
  };

  const openQR = () =>{
    navigation.push("QRgenerator", {actividad: actividad})
  }

  const openParticipantsList = () => {
    getActivityById(actividad.titulo).then((activity) => {
      navigation.push("ParticipantsList", { actividad: activity, uri: uri });
    });
  };

  function setTextColor(){
    switch(actividad.tipo){
      case "educación":
      case "costas":
      case "deportivo":
      case "comunitario": return theme.colors.ambiental; break
      case "cultural":
      case "ambiental": return theme.colors.ambiental; break;
    }
  }

  function setActiveColor(){
    switch(actividad.tipo){
      case "educación": return theme.colors.educacion; break
      case "ambiental": return theme.colors.ambiental; break
      case "costas": return theme.colors.costas; break
      case "deportivo": return theme.colors.deportivo; break
      case "comunitario": return theme.colors.comunitario; break
      case "cultural": return theme.colors.cultural; break
      default: return theme.colors.comunitario;
    }
  }

  return (
    <SafeAreaView>
      <ScrollView className="flex bg-blanco h-full w-full px-2 space-y-2 pb-5">
        {/* Boton atras y favoritos */}
        <View className="flex-row w-full h-14 items-center justify-between">
          <View className="">
            <TouchableOpacity onPress={goBack} className="">
              <Icon name="arrow-left" type="octicon" color={theme.colors.ambiental} />
            </TouchableOpacity>
          </View>
            <TouchableOpacity
              onPress={openDetails}
              className="flex-row rounded-md px-4 space-x-2 items-center justify-center bg-costas w-fit h-10"
            >
              <Text className="text-sm text-ambiental">Editar</Text>
              <Icon name="pencil" type="octicon" color={theme.colors.ambiental} size={18}/>
            </TouchableOpacity>
          </View>

        {/* Titulo y color categoria */}
        <View className = "flex-row w-full justify-between items-baseline">
          <Text className="text-xl font-bold w-[80%]"
                  style = {{color: setTextColor()}}>{actividad.titulo}
          </Text>
          <View className = "h-3 w-6 rounded-sm"
                style = {{backgroundColor: setActiveColor()}}></View>
        </View>

        {/* Container imagen */}
        <View className = "">
          <Image className="h-52 rounded-2xl" source={{ uri: uri }} />
        </View>
        
        {/* Container asociacion y participantes */}
        <View className = "">
          <View className = "flex-row w-full h-fit items-center space-x-2">
            <TouchableOpacity 
              className="w-[70%] flex-row items-center space-x-2 py-1"
              onPress={() => {goToAssocProfile()}}
            >
              <Image className = "h-12 w-12 rounded-full" source={{ uri: imagen }}/>
              <Text className = "text-base text-ambiental">{actividad.asociacion}</Text>
            </TouchableOpacity>
            <View className = "h-full w-0.5 bg-ambiental"></View>
            <View className = "items-center grow flex-row justify-center space-x-1">
              <Icon name="person" type="octicon" color={theme.colors.ambiental} />
              <Text className = "text-base text-ambiental">{actividad.num_participantes}/{actividad.max_participantes}</Text>
            </View>
          </View>
          {/* Separador */}
          <View className = "h-0.5 w-full bg-ambiental"></View>
        </View>

        {/* Container descripcion */}
        <View className="flex items-start">
          <Text className = "text-sm text-ambiental ">{actividad.descripcion}</Text>
        </View>

        <View className = "h-0.5 w-full bg-ambiental"></View>
       {/* Container fecha */}
       <View className="flex-row space-x-1 items-baseline">
          <Icon name="calendar" type="octicon" color={theme.colors.ambiental} size = {18}/>
          <Text className = "text-sm text-ambiental">{date()}</Text>
        </View>

        <View className="flex-row items-start space-x-1">
          <Icon name="clock" type="octicon" color={theme.colors.ambiental} size = {18}/>
          <Text className="text-sm text-ambiental">{actividad.duracion}</Text>
        </View>

        <View className="flex-row items-start space-x-1">
          <Icon name="location" type="octicon" color={theme.colors.ambiental} size = {18}/>
          <Text className="text-sm text-ambiental">{actividad.address.label}</Text>
        </View>

          {region.latitude != undefined ? (
              <View className = "rounded-3xl overflow-hidden">
                <MapView className="w-100 h-44 pb-5 " initialRegion={region}>
                  <Marker coordinate={region} />
                </MapView>
              </View>
            ) : (
              <Text>No disponible</Text>
            )}
        

        <View className = "items-center justify-center h-fit">
          <TouchableOpacity
            onPress={openParticipantsList}
            className="flex-row rounded-md px-4 items-center space-x-2 justify-center w-fit bg-costas h-10"
          >
            <Text className="text-ambiental text-sm">
              Lista de participantes {actividad.participantes.length}/
              {actividad.max_participantes}
            </Text>
            <Icon name="paste" type="octicon" color={theme.colors.ambiental} size={18}/>
          </TouchableOpacity>
        </View>
        
        <View className="items-center justify-center h-fit mb-4">
          <TouchableOpacity onPress={openQR} className="flex-row rounded-md px-4 items-center space-x-2 justify-center w-fit bg-educacion h-10">
            <Text className="text-ambiental text-sm">
              Código QR de asistencia
            </Text>
            <Icon name="qrcode" type="font-awesome" color={theme.colors.ambiental} size={18}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssociationActivityDetails;
