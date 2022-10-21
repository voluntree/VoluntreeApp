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

const ListaMisActividades = (props) => {
  const [actividades, setActividades] = useState([]);

  const currentUser = "Catalin";

  useEffect(() => {
    const getActividades = async (userID) => {
      const colRef = collection(db, `voluntarios/${userID}/actividades`);
      const resp = await getDocs(colRef);
      let actividadesArray = [];
      resp.forEach((doc) => actividadesArray.push(doc.data()));
      setActividades(actividadesArray);
    };
    getActividades(currentUser);
  }, []);

  const listaResultados = () => {
    if (actividades.length != 0) {
      return actividades.filter((item) => {
        return item.titulo.toLowerCase().includes(props.valor.toLowerCase());
      });
    } else {
      return [];
    }
  };

  const renderEmptyContainer = () => {
    return (
      <Text style={{ marginTop: "90%" }}>No se han encontrado actividades</Text>
    );
  };

  return (
    <FlatList
      data={listaResultados()}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={renderEmptyContainer()}
      renderItem={({ item, index }) => <TarjetaDeActividad actividad={item} />}
    />
  );
};

export default ListaMisActividades;
