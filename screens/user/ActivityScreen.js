import { TailwindProvider } from "tailwindcss-react-native";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { auth, db, storage } from "../../utils/firebase";
import { Button, Icon, ThemeConsumer } from "react-native-elements";
import { useState, useEffect, useLayoutEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  addLike,
  desapuntarseDeActividad,
  getAssociationByName,
  getPoints,
  inscribirUsuarioEnActividad,
  removeLike,
} from "../../service/service";
import { theme } from "../../tailwind.config";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

const ActivityScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { actividad, uri } = route.params;
  const [imagen, setImagen] = useState();
  const [fecha, setFecha] = useState();
  const [ubicacion, setUbicacion] = useState([]);
  const [region, setRegion] = useState({});
  const currentUser = auth.currentUser;
  const [inscrito, setInscrito] = useState(false);
  const [confirmado, setConfirmado] = useState(
    actividad.confirmados.includes(currentUser.uid)
  );
  const [like, setLike] = useState(actividad.favoritos.includes(currentUser.uid))
  const [corazon, setEstado] = useState(like ? "heart-fill" : "heart");
  const [finalizado, setFinalizado] = useState(
    actividad.fecha.toDate() < new Date()
  );
  const [reclamado, setReclamado] = useState(
    actividad.reclamados.includes(currentUser.uid)
  );
  const HERE_API_KEY = "xsVV1uwmlrIw2ZBMOi3Mb40lDrRO-SWYSkznK1yhrrs"

  function getAddressFromCoordinates( latitude, longitude ) {
    return new Promise((resolve) => {
      const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${HERE_API_KEY}&in=circle:${latitude},${longitude};r=100`
      fetch(url)
        .then(res => res.json())
        .then((resJson) => {
          // the response had a deeply nested structure :/
          if (resJson) {
            resolve(resJson.items[0].address)
          } else {
            resolve()
          }
        })
        .catch((e) => {
          console.log('Error in getAddressFromCoordinates', e)
          resolve()
        })
    })
  }

  useEffect(() => {
    setFecha(actividad.fecha.toDate().toLocaleTimeString());
    const getAddress = async (lat, lng) => {
      setInscrito(actividad.participantes.includes(currentUser.uid));
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
    getAddressFromCoordinates(actividad.ubicacion.latitude, actividad.ubicacion.longitude)
    .then((value) => setUbicacion(value))
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
  }, [inscrito]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const goToAssocProfile = () => {
    getAssociationByName(actividad.asociacion).then((value) => {
      navigation.navigate("Association", {
        asociacion: value,
      });
    });
  }

  const obtenerPuntos = async () => {
    await getPoints(currentUser.uid, actividad);
    setReclamado(true);
    Alert.alert(
      "Puntos reclamados!",
      "Se han añadido " + actividad.puntos + " puntos a su cuenta!"
    );
  };

  const desapuntarUsuario = () => {
    desapuntarseDeActividad(actividad.titulo, currentUser.uid).then(() => {
      Alert.alert(
        "Desinscripción existosa",
        "Se ha desinscrito correctamente de la actividad " + actividad.titulo,
        [{ text: "OK" }]
      );
      setInscrito(false);
      goBack();
    });
  };

  const inscribirUsuario = () => {
    inscribirUsuarioEnActividad(actividad.titulo, currentUser.uid).then(() => {
      actividad.participantes.push(currentUser.uid);
      Alert.alert(
        "Inscripción existosa",
        "Se ha inscrito correctamente a la actividad " + actividad.titulo,
        [{ text: "OK" }]
      );
      setInscrito(true);
    });
  };
  const goBack = () => {
    try {
      navigation.goBack();
    } catch (error) {}
  };

  const openScanner = () => {
    try {
      navigation.navigate("QRscanner", { actividad: actividad });
    } catch (error) {}
  };

  const BotonParticipa = () => {
    if (!inscrito) {
      return (<TouchableOpacity onPress={inscribirUsuario}>
                <View className = "bg-costas justify-center items-center rounded-md px-4 py-2">
                  <Text className = "text-ambiental text-sm">Inscribirse</Text>
                </View>
              </TouchableOpacity>)
    } else if (!finalizado) {
      return (<TouchableOpacity onPress={desapuntarUsuario}>
                <View className = "bg-costas justify-center items-center rounded-md px-4 py-2">
                  <Text className = "text-ambiental text-sm">Inscrito</Text>
                </View>
              </TouchableOpacity>)
    } else if (confirmado && !reclamado) {
      return (<TouchableOpacity onPress={obtenerPuntos}>
                <View className = "bg-costas justify-center items-center rounded-md px-4 py-2">
                  <Text className = "text-ambiental text-sm">Canjear puntos</Text>
                </View>
              </TouchableOpacity>);
    } else {
      if (confirmado && reclamado)
        return (<TouchableOpacity>
                  <View className = "justify-center items-center rounded-md px-4 py-2">
                    <Text className = "text-ambiental text-sm">Ya has canjeado tus puntos</Text>
                  </View>
                </TouchableOpacity>)
    }
  };
  
  const BotonConfirmado = () => {
    if (inscrito && !confirmado) {
      return (<TouchableOpacity onPress={openScanner}>
                <View className = "bg-educacion justify-center items-center rounded-md px-4 py-2 mb-4">
                  <Text className = "text-ambiental text-sm">Confirmar asistencia</Text>
                </View>
              </TouchableOpacity>);
    }
  };

  const añadirFav = () => {
    if(like == true){
      removeLike(actividad.titulo, currentUser.uid)
      setEstado("heart")
      setLike(false)
    }else{
      addLike(actividad.titulo, currentUser.uid)
      setEstado("heart-fill")
      setLike(true)
    }
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
          <View className="">
            <TouchableOpacity className="">
              <Icon name={corazon} type="octicon" color={theme.colors.ambiental} onPress = {añadirFav}/>
            </TouchableOpacity>
          </View>
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
          <Text className = "text-sm text-ambiental">{fecha} {actividad.fecha.toDate().toLocaleDateString()}</Text>
        </View>

        <View className="flex-row items-start space-x-1">
          <Icon name="clock" type="octicon" color={theme.colors.ambiental} size = {18}/>
          <Text className="text-sm text-ambiental">{actividad.duracion}</Text>
        </View>

        <View className="flex-row items-start space-x-1">
          <Icon name="location" type="octicon" color={theme.colors.ambiental} size = {18}/>
          <Text className="text-sm text-ambiental">{ubicacion.label}</Text>
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
          <BotonParticipa />
        </View>
        
        <View className="items-center justify-center h-fit">
          <BotonConfirmado />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ActivityScreen;
