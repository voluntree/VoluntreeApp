import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, storage } from '../utils/firebase';
import { collection, query, where, getDocs, doc, onSnapshot, firestore, Query} from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";
import TarjetaDeActividad from "./TarjetaDeActividad"
import {getDistance} from "geolib";
import {MapView} from 'react-native-maps';

const ListaDeTarjetas = (props) => {
  
  const [actividades, setActividades] = useState([]);
  const q = query(collection(db, "actividades"))
  useEffect(() => {
    const getActividades = async () => { 
      await getDocs(q).then((actividad) => {
        let actividadData = actividad.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setActividades(actividadData)
      })
    }
    getActividades();
  }, []);
      
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
                console.log(d1, d2)
                return item
              }
            })
          }
          
          return aux
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
          actividad={item}
        />
      )}
    />
  );
}
export default ListaDeTarjetas;