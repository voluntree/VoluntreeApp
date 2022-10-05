import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { TailwindProvider } from 'tailwindcss-react-native';
import { doc, setDoc } from "firebase/firestore";
import {db} from '../utils/firebase';
import { useState } from 'react';

// Add a new document in collection "cities"


const HomeScreen = () => {

  const[username, setName] = useState('')
  const[email, setEmail] = useState('')

  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      });
  }, [])

  const crearUser = () => 
    setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
  });
  

  return (
    <TailwindProvider>
      <SafeAreaView className="items-center mt-2">
        <TouchableOpacity>
          <Text className="text-2xl font-bold text-lime-500">Voluntree</Text>
        </TouchableOpacity>

        <View className="h-40 w-96 mt-10">
          <MapView className="h-full w-full"></MapView>
        </View>

        <View>
          <TextInput value= {username} onChangeText = {(username) => setName(username)} placeholder="Username"></TextInput>
          <TextInput value= {email} onChangeText = {(email) => setEmail(email)} placeholder="Email"></TextInput>

          <TouchableOpacity onPress={crearUser}>
            <Text className="text-2xl font-bold text-lime-500">SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TailwindProvider>
  );
}




export default HomeScreen