import {
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  firestore,
  getDoc,
} from "firebase/firestore";

import TarjetaDeActividad from "./TarjetaDeActividad";
import { db, storage } from "../utils/firebase";
import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { getActivityById } from "../service/service";



const ListaActividadesAsociacion = (props) => {

  const[actividades, setActividades] = useState([]);

  const currentUser = "Catalin"

  const q =query(collection(db, "actividades"), where("participantes", "array-contains", currentUser))

  useEffect(() => {
    const getActividades = async () => { 
      await getDocs(q).then((actividad) => {
        let actividadData = actividad.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setActividades(actividadData)
      })
    }
    getActividades();
  }, [])

  const listaResultados = () => {
    if(actividades.length != 0){
      return actividades.filter((item) => {
      return item.titulo.toLowerCase().includes(props.valor.toLowerCase())})
    }else{
      return []
    }
    

  }

  return (
    <FlatList
      data={listaResultados()}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <TarjetaDeActividad
          tipo={item.tipo}
          descripcion={item.descripcion}
          titulo={item.titulo}
          fecha={item.fecha}
          duracion={item.duracion}
          imagen={item.imagen}
        />
      )}
    />
  );
};

export default ListaActividadesAsociacion;
