import { FlatList, Text } from "react-native";
import React, { useState, useEffect } from "react";
import TarjetaArticulo from "./TarjetaArticulo";
import { onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const ListaArticulos = () => {
  const [articulos, setArticulos] = useState([]);
  const q = query(collection(db, "articulos"));
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    onSnapshot(
      q,
      (snapshot) => (
        {
          id: snapshot.id,
        },
        setArticulos(snapshot.docs.map((doc) => doc.data()))
      )
    );
  };

  const renderEmptyContainer = () => {
    return (
      <Text style={{ marginTop: "90%" }}>No se han encontrado articulos</Text>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
      data={articulos}
      keyExtractor={(item) => item.titulo}
      ListEmptyComponent={renderEmptyContainer()}
      renderItem={({ item, index }) => <TarjetaArticulo articulo={item} />}
    />
    </SafeAreaView>
  );
};

export default ListaArticulos;
