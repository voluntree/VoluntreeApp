import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Filtro from './Filtro';

const ListaFiltros = (props) => {

  const data = [
    {
      id: 1,
      imagen: require("../../images/iconoLibros.jpg"),
      texto: "Educación",
      valor: "educacion"
    },
    {
      id: 2,
      imagen: require("../../images/cultural.jpg"),
      texto: "Cultural",
      valor: "cultural"
    },
    {
      id: 3,
      imagen: require("../../images/deportes.jpg"),
      texto: "Deportivo",
      valor: "deportivo"
    },
    {
      id: 4,
      imagen: require("../../images/comunitario.jpg"),
      texto: "Comunitario",
      valor: "comunitario"
    },
    {
      id: 5,
      imagen: require("../../images/arboles.jpg"),
      texto: "Ambiental",
      valor: "ambiental"
    },
  ];

  const AddCategoria = (valor, activo) => {
    let aux = props.lista
    if(activo == true){
      if(!aux.includes(valor)){
        aux.push(valor)
        props.setCategoriasActivasLocales(aux)
      }else{
        props.setCategoriasActivasLocales(aux)
      }
    }else{
      aux = aux.filter(e => e != valor)
      props.setCategoriasActivasLocales(aux)
    }
  }

  const isActivo = (texto) => {
    return props.lista.includes(texto)
  }

  return (
    <FlatList
      data = {data}
      keyExtractor = {(item) => item.id}
      renderItem= {({item, index}) => (
        <Filtro
          imagen = {item.imagen}
          texto = {item.texto}
          value = {item.valor}
          AddCategoria = {AddCategoria}
          isActivo = {isActivo(item.valor)}
        />
      )}
     horizontal = {true}
    />
  );
}

export default ListaFiltros