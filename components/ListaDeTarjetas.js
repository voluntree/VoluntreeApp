import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { collection, query, where, getDocs, doc, onSnapshot} from "firebase/firestore";
import TarjetaDeActividad from "./TarjetaDeActividad"

const ListaDeTarjetas = () => {

  const [actividades, setActividades] = useState([]);

  useEffect(() => {

      async function getActividades(){
        const querySnapshot = await getDocs(collection(db, "actividades"));
        setActividades(querySnapshot.docs);
      }
      getActividades();
      
    })
  return (
    
    <FlatList
      data = {actividades}
      keyExtractor = {(actividad) => actividad.id}
      renderItem = {(actividad) => <TarjetaDeActividad actividad = {actividad}/>}
      ItemSeparatorComponent = {() => <View className = "mt-5"></View>}
    />
      
    
    
  )
}

export default ListaDeTarjetas