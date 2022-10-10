import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import TarjetaDeActividad from "./TarjetaDeActividad"

const ListaDeTarjetas = () => {

  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    async function getActividades(){
      const querySnapshot = await getDocs(collection(db,'actividades'))
      setActividades(querySnapshot.docs);
      querySnapshot.forEach((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
      
    }
    getActividades();
  }, [])
  

  return (
    
    <FlatList
      data = {actividades}
      keyExtractor = {(actividad) => actividad.titulo}
      renderItem = {(actividad) => <TarjetaDeActividad tarjeta = {actividad}/>}
    />
      
    
    
  )
}

export default ListaDeTarjetas