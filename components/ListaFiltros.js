import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Filtro from './Filtro';

const ListaFiltros = () => {

  const data = [
    {
      id: 1,
      imagen: require("../images/iconoLibros.jpg"),
      texto: "Educación",
    },
    {
      id: 2,
      imagen: require("../images/iconoBotellaPlaya.jpg"),
      texto: "Costas",
    },
    {
      id: 3,
      imagen: require("../images/cultural.jpg"),
      texto: "Cultural",
    },
    {
      id: 4,
      imagen: require("../images/deportes.jpg"),
      texto: "Deportivo",
    },
    {
      id: 5,
      imagen: require("../images/comunitario.jpg"),
      texto: "Comunitario",
    },
    {
      id: 6,
      imagen: require("../images/arboles.jpg"),
      texto: "Ambiental",
    },
  ];

  return (
    <FlatList
      data = {data}
      keyExtractor = {(item) => item.id}
      renderItem= {({item, index}) => (
        <Filtro
          imagen = {item.imagen}
          texto = {item.texto}
        />
      )}
      numColumns = {3}
    />
  );
}

export default ListaFiltros