import { FlatList, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { getAllArticulos } from "../../service/service";
import TarjetaArticulo from "./TarjetaArticulo";

const ListaArticulos = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setArticulos(await getAllArticulos());
  };

  const renderEmptyContainer = () => {
    return (
      <Text style={{ marginTop: "90%" }}>No se han encontrado articulos</Text>
    );
  };

  return (
    <FlatList
      data={articulos}
      keyExtractor={(item) => item.titulo}
      ListEmptyComponent={renderEmptyContainer()}
      renderItem={({ item, index }) => <TarjetaArticulo articulo={item} />}
    />
  );
};

export default ListaArticulos;
