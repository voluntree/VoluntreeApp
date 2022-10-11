import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Filtro from './Filtro';

const ListaFiltros = () => {
  return (
    <View className="w-full ml-4 mt-2">
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Filtro
          imagen={require("../images/iconoLibros.jpg")}
          texto="Educación"
        />
        <Filtro
          imagen={require("../images/iconoBotellaPlaya.jpg")}
          texto="Costas"
        />
        <Filtro
          imagen={require("../images/arboles.jpg")}
          texto="Reforestación"
        />
        <Filtro
          imagen={require("../images/cultural.jpg")}
          texto="Cultural"
        />
        <Filtro
          imagen={require("../images/deportes.jpg")}
          texto="Deportivo"
        />
        <Filtro
          imagen={require("../images/comunitario.jpg")}
          texto="Comunitario"
        />

      </ScrollView>
    </View>
  );
}

export default ListaFiltros