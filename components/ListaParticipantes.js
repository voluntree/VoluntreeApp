import { FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../utils/firebase";
import TarjetaParticipante from './TarjetaParticipante';

const ListaParticipantes = (props) => {
  const [participantes, setParticipantes] = useState([])

  async function getParticipantes(participantes) {
    const getUser = participante => getDoc(doc(db, "voluntarios", participante));
    const promises = participantes.map(getUser);
    const users = await Promise.all(promises);
    return users.map(user => user.data()).flat()
  }

  useEffect(() => {
    getParticipantes(props.actividad.participantes).then(value => setParticipantes(value))
      }, [props.actividad.confirmados]);

  return (
    <FlatList
      data = {participantes}
      keyExtractor = {(item) => item.ID}
      renderItem= {({item, index}) => (
        <TarjetaParticipante item = {item} actividad={props.actividad}/>
      )}
    />
  );
}

export default ListaParticipantes