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

 
  const q =query(collection(db, "actividades"), where("participantes", "array-contains", currentUser))

  useEffect(() => {
    const getActividades = async () => { 
      onSnapshot(q, (snapshot)=>({
        id: snapshot.id,
      }, setActividades(snapshot.docs.map(doc=> doc.data()))))
    }
    getActividades();
  }, [])

  const listaResultados = () => {
    let aux = actividades
    if(actividades.length != 0){
      aux = actividades.filter((item) => {
      return item.titulo.toLowerCase().includes(props.searchText.toLowerCase())})
      if(props.categoriasActivas.length > 0){
        aux = aux.filter((item) => {
          if(props.categoriasActivas.includes(item.tipo.toLowerCase())) return item
        })
      }
      if(props.duracion != 0){
        aux = aux.filter((item) => {
          if(item.duracion <= props.duracion) return item
        })
      }
      if(props.distancia != 0){
        aux = aux.filter((item) => {
          return item
        })
      }
      if(props.fecha != undefined){
        aux = aux.filter((item) => {
          let d1 = new Date(props.fecha).toDateString()
          let d2 = item.fecha.toDate().toDateString()
          if(d1 == d2) {
            return item
          }
        })
      }
      
      return aux
    }else{
      return []
    }
  }

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
