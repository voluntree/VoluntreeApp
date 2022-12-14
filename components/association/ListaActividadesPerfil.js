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
import TarjetaDeActividad from "../TarjetaDeActividad"
import ActividadAsociacion from "./ActividadAsociacion";

const ListaActividadesPerfil = (props) => {
  const [actividades, setActividades] = useState([]);

  const q = query(
    collection(db, "actividades"), where("asociacion", "==", props.asociacion)
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

  const renderEmptyContainer = () => {
    return (
      <Text className="pt-9 px-5 text-center">
        No hay ninguna actividad activa en estos momentos
      </Text>
    );
  };

  return (
      <FlatList
        className="h-full w-full px-4 "
        data={actividades}
        keyExtractor={(item) => item.titulo}
        ListEmptyComponent={renderEmptyContainer()}
        renderItem={({ item, index }) => (
          props.fromUser ?
          <TarjetaDeActividad actividad = {item}/>
          :
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

export default ListaActividadesPerfil;
