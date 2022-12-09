import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { theme } from "../../tailwind.config";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker } from "react-native-maps";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "../../utils/firebase";
import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import Svg, { Path, Rect } from "react-native-svg";
import { Icon } from "react-native-elements";
import {
  EducativoIcon,
  AmbientalIcon,
  CulturalIcon,
  DeportivoIcon,
  ComunitarioIcon,
  ComunitarioItemIcon,
  AmbientalItemIcon,
  DeportivoItemIcon,
  EducativoItemIcon,
  CulturalItemIcon,
  MapIcon,
} from "../../icons/Icons";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { isEmpty } from "@firebase/util";
import { getActivityById, getActivityByTitle, getImageDownloadURL } from "../../service/service";

const MapScreen = () => {
  const categorias = [
    {
      id: 1,
      name: "Ambiental",
      icon: AmbientalItemIcon(16, 16, theme.colors.costas),
      color: theme.colors.ambiental,
      letra: theme.colors.costas,
    },
    {
      id: 2,
      color: theme.colors.deportivo,
      name: "Deportivo",
      icon: DeportivoItemIcon(16, 16, theme.colors.comunitario),
      letra: theme.colors.comunitario,
    },
    {
      id: 3,
      color: theme.colors.cultural,
      name: "Cultural",
      icon: CulturalItemIcon(16, 16, theme.colors.educacion),
      letra: theme.colors.educacion,
    },
    {
      id: 4,
      color: theme.colors.comunitario,
      name: "Comunitario",
      icon: ComunitarioItemIcon(16, 16, theme.colors.deportivo),
      letra: theme.colors.deportivo,
    },
    {
      id: 5,
      color: theme.colors.educacion,
      name: "Educativo",
      icon: EducativoItemIcon(16, 16, theme.colors.cultural),
      letra: theme.colors.cultural,
    },
    {
      id: 6,
      color: theme.colors.costas,
      name: "Todas",
      icon: MapIcon(16, 16, theme.colors.ambiental),
      letra: theme.colors.ambiental,
    },
  ];

  function actualizarMarcadores(nombreCategoria) {
    if (nombreCategoria == "Ambiental") {
      setQuery(queryAmbiental);
    }
    if (nombreCategoria == "Educativo") {
      setQuery(queryEducativo);
    }
    if (nombreCategoria == "Deportivo") {
      setQuery(queryDeportivo);
    }
    if (nombreCategoria == "Cultural") {
      setQuery(queryCultural);
    }
    if (nombreCategoria == "Comunitario") {
      setQuery(queryComunitario);
    }
    if(nombreCategoria == "Todas"){setQuery(queryIncial)}
  }

  const navigation = useNavigation();
  const [uri, setUri] = useState();

  const queryIncial = query(
    collection(db, "actividades"),
    where("fecha", ">", Timestamp.now())
  );
  const queryEducativo = query(
    collection(db, "actividades"),
    where("fecha", ">", Timestamp.now()),
    where("tipo", "==", "educativo")
  );
  const queryComunitario = query(
    collection(db, "actividades"),
    where("fecha", ">", Timestamp.now()),
    where("tipo", "==", "comunitario")
  );
  const queryDeportivo = query(
    collection(db, "actividades"),
    where("fecha", ">", Timestamp.now()),
    where("tipo", "==", "deportivo")
  );
  const queryCultural = query(
    collection(db, "actividades"),
    where("fecha", ">", Timestamp.now()),
    where("tipo", "==", "cultural")
  );
  const queryAmbiental = query(
    collection(db, "actividades"),
    where("fecha", ">", Timestamp.now()),
    where("tipo", "==", "ambiental")
  );

  const [mapFoto, setMapFoto] = useState("");
  const [q, setQuery] = useState(
    query(collection(db, "actividades"), where("fecha", ">", Timestamp.now()))
  );

  const [markers, setMarkers] = useState([]);
  const region = {
    latitude: 39.367835,
    longitude: -0.376084,
    latitudeDelta: 0.015,
    longitudeDelta: 2.2,
  };

  const openCard = (act, imagen) => {
    navigation.push("Activity", { actividad: act, uri: imagen });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      if (!isEmpty(querySnapshot)) {
        const actividades = [];
        querySnapshot.forEach((doc) => {
          actividades.push(doc.data());
        });
        setMarkers(actividades);
      }
    });
  }, [q]);

  return (
    <SafeAreaView>
      <ScrollView
        className="absolute z-10"
        horizontal={true}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={{ top: 50, paddingHorizontal: 10 }}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {categorias.map((categoria, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.chipsItem, { backgroundColor: categoria.color }]}
            onPress={() => {
              actualizarMarcadores(categoria.name);
            }}
          >
            <View className="items-center flex-row space-x-2">
              <Text style={{ color: categoria.letra }}>{categoria.name}</Text>
              {categoria.icon}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <MapView className="h-full w-full" region={region}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.ubicacion.latitude,
              longitude: marker.ubicacion.longitude,
            }}
            title={marker.titulo}
            description={marker.descripcion}
          >
            {marker.tipo === "educacion" ? EducativoIcon(40, 40) : null}
            {marker.tipo === "cultural" ? CulturalIcon(40, 40) : null}
            {marker.tipo === "deportivo" ? DeportivoIcon(40, 40) : null}
            {marker.tipo === "ambiental" ? AmbientalIcon(40, 40) : null}
            {marker.tipo === "comunitario" ? ComunitarioIcon(40, 40) : null}

            <Callout
              tooltip
              onPress={() => {
                getImageDownloadURL("cardImages/"+ marker.imagen).then(
                  (resp) => openCard(marker,resp)
                ).catch()
              }}
            >
              <View style={styles.card}>
                <Text className="font-bold">{marker.titulo}</Text>
                <Text Text className="text-xs">
                  {marker.asociacion}
                </Text>
              </View>
              <View style={styles.arrowBorder}></View>
              <View style={styles.arrow}></View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 280,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 40,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
});
