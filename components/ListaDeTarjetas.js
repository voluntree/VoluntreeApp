import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../utils/firebase';
import { collection, query, where, getDocs, doc, onSnapshot, firestore} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import TarjetaDeActividad from "./TarjetaDeActividad"

const ListaDeTarjetas = (props) => {
  const [actividades, setActividades] = useState([]);

  const currentUser = "Catalin";

  const q = query(collection(db, "actividades"));

  useEffect(() => {
    const getActividades = async () => {
      await getDocs(q).then((actividad) => {
        let actividadData = actividad.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })).filter(act => !act.participantes.includes(currentUser));
        setActividades(actividadData);
      });
    };
    getActividades();
  }, [q]);

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
      <></>
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
export default ListaDeTarjetas;