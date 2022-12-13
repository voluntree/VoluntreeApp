import { FlatList, Text } from "react-native";
import React, { useState, useEffect } from "react";
import TarjetaArticulo from "./TarjetaArticulo";
import { onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const ListaArticulos = (props) => {
  const data = props.articulos;
  const [articulos, setArticulos] = useState([]);
  let q = query(collection(db, "articulos"));
  useEffect(() => {
    if (props.mode != undefined && props.mode == "asociacion") q = props.query;
    onSnapshot(q, (snapshot) => {
      let art = [];
      snapshot.docs.forEach((doc) => art.push(doc.data()));
      setArticulos(art);
    });
  }, []);

  const renderEmptyContainer = () => {
    return (
      <Text className="text-center">
        No hay articulos para mostrar
      </Text>
    );
  };

  return (
    <SafeAreaView className="bg-blanco h-full w-full">
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
