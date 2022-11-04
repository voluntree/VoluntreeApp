import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import React, { useLayoutEffect, useState} from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import Buscador from "../components/Buscador";
import ListaDeTarjetas from "../components/ListaDeTarjetas";
import { collection, query, where, onSnapshot} from "firebase/firestore";
import { db } from "../utils/firebase";

const FavoritosScreen = () => {
  const navigation = useNavigation();
  const [SearchText, setSearchText] = useState("");

  const[distancia,setDistancia] = useState(0);
  const[sliding, setSliding] = useState('Inactive');

  const [duracion, setDuracion] = useState(0);

  const[mode, setMode] = useState('date')
  const[dateValue, setDateValue] = useState();
  const[text, setText] = useState('Vacío')
  const[show, setShow] = useState(false);

  const[isVisible, setIsVisible] = useState(false);
  const[isModalOpen, setIsModalOpen] = useState(false)

  const[categoriasActivas, setCategoriasActivas] = useState([]);

  const[order, setOrder] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  

  return (
    <TailwindProvider>
      <SafeAreaView className="h-full items-center">
        <Buscador
          valor={SearchText}
          setSearchText = {setSearchText}
          isModalOpen = {isModalOpen}
          setIsModalOpen = {setIsModalOpen}
          categoriasActivas = {categoriasActivas}
          setCategoriasActivas = {setCategoriasActivas}
          distancia = {distancia}
          setDistancia = {setDistancia}
          text = {text}
          setText = {setText}
          isVisible = {isVisible}
          duracion = {duracion}
          setDuracion = {setDuracion}
          sliding = {sliding}
          setSliding = {setSliding}
          mode = {mode}
          setMode = {setMode}
          dateValue = {dateValue}
          setDateValue = {setDateValue}
          show = {show}
          setShow = {setShow}
          setIsVisible = {setIsVisible}
          order = {order}
          setOrder = {setOrder}
        />
        <ListaDeTarjetas
          query = {query(collection(db, "actividades"), where("favoritos", "array-contains", "Catalin"))}
          searchText={SearchText}
          distancia={distancia}
          duracion={duracion}
          categoriasActivas= {categoriasActivas}
          fecha = {dateValue}
          order = {order}
        />
      </SafeAreaView>
    </TailwindProvider>
  );
};

export default FavoritosScreen;
