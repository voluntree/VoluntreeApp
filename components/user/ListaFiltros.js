import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Filtro from './Filtro';

const ListaFiltros = (props) => {

  const data = [
    {
      id: 1,
      imagen: require("../../images/iconoLibros.jpg"),
      texto: "Educación",
    },
    {
      id: 2,
      imagen: require("../../images/iconoBotellaPlaya.jpg"),
      texto: "Costas",
    },
    {
      id: 3,
      imagen: require("../../images/cultural.jpg"),
      texto: "Cultural",
    },
    {
      id: 4,
      imagen: require("../../images/deportes.jpg"),
      texto: "Deportivo",
    },
    {
      id: 5,
      imagen: require("../../images/comunitario.jpg"),
      texto: "Comunitario",
    },
    {
      id: 6,
      imagen: require("../../images/arboles.jpg"),
      texto: "Ambiental",
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
    return props.lista.includes(texto.toLowerCase())
  }

  return (
    <FlatList
      data = {data}
      keyExtractor = {(item) => item.id}
      renderItem= {({item, index}) => (
        <Filtro
          imagen = {item.imagen}
          texto = {item.texto}
          AddCategoria = {AddCategoria}
          isActivo = {isActivo(item.texto)}
        />
      )}
     horizontal = {true}
    />
  );
}

export default ListaFiltros