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
  const documentos = [];

  useEffect(() => {
    onSnapshot(
      collection(db, "asociaciones", "Green Peace", "actividades"),
      (snapshot) => (
        {
          id: snapshot.id,
        },
        setActividades(snapshot.docs.map((doc) => doc.data()))
        
      )
    );
      actividades.forEach(async (actividad) => {
        const docRef = doc(db, "actividades", actividad.nombre);
        const docSnap = await getDoc(docRef);
        documentos.push(docSnap.data());
      });
    
  }, [])

  const renderItems = (item) => (
    <ActividadAsociacion
      titulo={item.titulo}
      descripcion={item.descripcion}
      tipo={item.tipo}
      fecha={item.fecha}
      duracion={item.duracion}
      imagen={item.imagen}
    />
  );

  return (
    <FlatList
      data={documentos}
      keyExtractor={(item) => item.id}
      renderItem={renderItems}
    />
  );
};

export default ListaActividadesAsociacion;
