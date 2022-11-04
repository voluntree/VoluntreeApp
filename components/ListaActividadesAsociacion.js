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
  const [actividades, setActividades] = useState([]);

  const currentUser = {
    name: "Modepran",
    cif: "G98347432",
  };

  const q = query(collection(db, "actividades"));

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
    <View>
      <FlatList
      className="h-100 scroll-pb-28"
      data={actividades}
      keyExtractor={(item) => item.titulo}
      renderItem={({ item, index }) => (
        <ActividadAsociacion
          titulo={item.titulo}
          descripcion={item.descripcion}
          tipo={item.tipo}
          imagen={item.imagen}
        />
      )}
    />
    </View>
  );
};

export default ListaActividadesAsociacion;
