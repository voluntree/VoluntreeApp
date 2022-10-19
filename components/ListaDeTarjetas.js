import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../utils/firebase';
import { collection, query, where, getDocs, doc, onSnapshot, firestore} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import TarjetaDeActividad from "./TarjetaDeActividad"

const ListaDeTarjetas = (props) => {
  
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    (onSnapshot(collection(db, "actividades"), (snapshot) => ({
       id: snapshot.id, 
      },setActividades(snapshot.docs.map(doc => doc.data())))))});
      
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
      keyExtractor={(item) => item.titulo}
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
}
export default ListaDeTarjetas;