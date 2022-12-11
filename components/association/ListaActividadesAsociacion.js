import {
  collection,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  firestore,
  getDoc,
} from "firebase/firestore";

import ActividadAsociacion from "./ActividadAsociacion";
import { auth, db, storage } from "../../utils/firebase";
import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { getActivityById, getAssocByEmail } from "../../service/service";

const ListaActividadesAsociacion = () => {
  const [actividades, setActividades] = useState([]);
  const [asociacion, setAsociacion] = useState([])
  
  useEffect(() => {
    const getActividades = async () => {
      getAssocByEmail(auth.currentUser.email).then((value) => {setAsociacion(value.data())
      const q = query(collection(db, "actividades"), where("asociacion", "==", value.data().nombre));
      onSnapshot(
        q,
        (snapshot) => (
          {
            id: snapshot.id,
          },
          setActividades(snapshot.docs.map((doc) => doc.data()))
        )
      )});
    };
    getActividades();
  }, []);

  return (
    <View>
      <FlatList
      className="h-full scroll-pb-28 mb-56"
      data={actividades}
      keyExtractor={(item) => item.titulo}
      renderItem={({ item, index }) => (
        <ActividadAsociacion
          titulo={item.titulo}
          descripcion={item.descripcion}
          tipo={item.tipo}
          imagen={item.imagen}
        />
      )}
    />
    </View>
  );
};

export default ListaActividadesAsociacion;
