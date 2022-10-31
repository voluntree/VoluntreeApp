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

import { db, storage } from "../../utils/firebase";
import { View, Text, FlatList, Animated } from "react-native";
import React, { useState, useEffect} from "react";
import ActividadPerfil from "./ActividadPerfil";

const ListaActividadesPerfil = () => {
  const [actividades, setActividades] = useState([]);

  const currentUser = {
    name: "Modepran",
    cif: "G98347432",
  };

  const q = query(
    collection(db, "actividades")
  );

  useEffect(() => {
    const getActividades = async () => {
      onSnapshot(
        q,
        (snapshot) => (
          {
            id: snapshot.id,
          },
          setActividades(snapshot.docs.map((doc) => doc.data()))
        )
      );
    };
    getActividades();
  }, []);

  return (
    <View className = "pb-32">
      {actividades.map((actividad) => {
        return (
          <ActividadPerfil
            titulo={actividad.titulo}
            descripcion={actividad.descripcion}
            tipo={actividad.tipo}
            imagen={actividad.imagen}
          />
        );
      })}
    </View>
  );
};

export default ListaActividadesPerfil;
