import { Text, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import TarjetaDeActividad from "./TarjetaDeActividad";
import {
  compareAlfabeticamenteAscendente,
  compareAlfabeticamenteDescendente,
  compareFechaMasAntigua,
  compareFechaMasReciente,
} from "../service/functions";

const ListaDeTarjetas = (props) => {
  const [actividades, setActividades] = useState([]);
  const q = props.query;
  useEffect(() => {
    onSnapshot(
      q,
      (snapshot) => (
        {
          id: snapshot.id,
        },
        setActividades(snapshot.docs.map((doc) => doc.data()))
      )
    );
  }, []);

  const listaResultados = () => {
    let aux = actividades;
    if (actividades.length != 0) {
      aux = actividades.filter((item) => {
        return item.titulo
          .toLowerCase()
          .includes(props.searchText.toLowerCase());
      });
      if (props.categoriasActivas.length > 0) {
        aux = aux.filter((item) => {
          if (props.categoriasActivas.includes(item.tipo.toLowerCase()))
            return item;
        });
      }
      if (props.duracion != 0) {
        aux = aux.filter((item) => {
          if (parseInt(item.duracion) <= props.duracion) return item;
        });
      }
      if (props.distancia != 0) {
        aux = aux.filter((item) => {
          return item;
        });
      }
      if (props.fecha != undefined) {
        aux = aux.filter((item) => {
          let d1 = new Date(props.fecha).toDateString();
          let d2 = item.fecha.toDate().toDateString();
          if (d1 == d2) {
            return item;
          }
        });
      }
      if (props.order != 0) {
        switch (props.order) {
          case 1:
            aux = aux.sort(compareFechaMasReciente);
            break;
          case 2:
            aux = aux.sort(compareFechaMasAntigua);
            break;
          case 3:
            aux = aux.sort(compareAlfabeticamenteAscendente);
            break;
          case 4:
            aux = aux.sort(compareAlfabeticamenteDescendente);
            break;
        }
      }
      return aux;
    } else {
      return [];
    }
  };

  const renderEmptyContainer = () => {
    return (
      <View className="flex flex-grow h-96 w-full items-center justify-center">
        <Text>No se han encontrado actividades</Text>
      </View>
    );
  };

  return (
    <FlatList
      className="w-full px-3"
      data={listaResultados()}
      keyExtractor={(item) => item.titulo}
      ListEmptyComponent={renderEmptyContainer()}
      renderItem={({ item, index }) => <TarjetaDeActividad actividad={item} />}
    />
  );
};
export default ListaDeTarjetas;
