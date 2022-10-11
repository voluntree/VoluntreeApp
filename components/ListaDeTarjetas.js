import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../utils/firebase';
import { collection, query, where, getDocs, doc, onSnapshot, firestore} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import TarjetaDeActividad from "./TarjetaDeActividad"
import { colors } from 'react-native-elements';

const ListaDeTarjetas = () => {

  const[url, setUrl] = useState();
  const [actividades, setActividades] = useState([]);
  useEffect(() => {
      (onSnapshot(collection(db, "actividades"), (snapshot) => ({
       id: snapshot.id, 
      },setActividades(snapshot.docs.map(doc => doc.data())))))
    })

  

  return (
    <FlatList className = "z-0"
      data={actividades}
      keyExtractor={(item) => item.id}
      renderItem={ ({item, index}) => 
        <TarjetaDeActividad
          tipo = {item.tipo}
          descripcion={item.descripcion}
          titulo={item.titulo}
          fecha={item.fecha}
          duracion={item.duracion}
          imagen = {item.imagen}
        />
      }
    />
  );
}

export default ListaDeTarjetas