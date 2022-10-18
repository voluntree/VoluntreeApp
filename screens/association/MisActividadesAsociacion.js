import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListaActividadesAsociacion from '../../components/ListaActividadesAsociacion';
import { useNavigation } from '@react-navigation/native';
import ListaDeTarjetas from '../../components/ListaDeTarjetas';

const MisActividadesAsociacion = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <TailwindProvider>
      <SafeAreaView className="h-full items-center">
        <Text>HOOOOLOLAAA</Text>
        <ListaActividadesAsociacion/>
      </SafeAreaView>
    </TailwindProvider>
  );
}

export default MisActividadesAsociacion