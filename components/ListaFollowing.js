import { Text, FlatList } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { db } from '../utils/firebase';
import { collection, query,onSnapshot, where} from "firebase/firestore";
import TarjetaFollowingAssociation from "../components/TarjetaFollowingAssociation"
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { theme } from '../tailwind.config';

const ListaFollowing = (props) => {
  const [asociaciones, setAsociaciones] = useState([]);
  const q = query(collection(db,"asociaciones"), where("seguidores", "array-contains", props.usuario))
  useEffect(() => {
    
      onSnapshot(q, (snapshot)=>({
        id: snapshot.id,
      }, setAsociaciones(snapshot.docs.map(doc=> doc.data()))))
  }, []);
      
      const renderEmptyContainer = () => {
        return (
          <View className = "items-center">
            <Text>No sigues a ninguna asociación</Text>
          </View>
        );
      };

  return (
    <FlatList 
      style = {{width:"95%"}}
      data={asociaciones}
      keyExtractor={(item) => item.nombre}
      ListEmptyComponent={renderEmptyContainer()}
      renderItem={({ item, index }) => <TarjetaFollowingAssociation usuario={props.usuario} asociacion={item}/>}
    />
  );
};
export default ListaFollowing;

