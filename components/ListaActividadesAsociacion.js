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

import ActividadAsociacion from "./ActividadAsociacion";
import { db, storage } from "../utils/firebase";
import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { getActivityById } from "../service/service";



const ListaActividadesAsociacion = () => {

  const[actividades, setActividades] = useState([]);

  const currentUser = {
    name : "Green Peace",
    cif : "G98347432",
  }

  const q =query(collection(db, "actividades"))

  useEffect(() => {
    const getActividades = async () => { 
      await getDocs(q).then((actividad) => {
        let actividadData = actividad.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setActividades(actividadData)
      })
    }
    getActividades();
  }, [])

  

  return (
    <FlatList
      data={actividades}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <ActividadAsociacion
          titulo={item.titulo}
          descripcion={item.descripcion}
          tipo={item.tipo}
          imagen={item.imagen}
        />
      )}
    />
  );
};

export default ListaActividadesAsociacion;
