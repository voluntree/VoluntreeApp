import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { TailwindProvider } from 'tailwindcss-react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const HomeScreen = () => {


    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

  return (
    <TailwindProvider>
      <SafeAreaView className="items-center mt-2">
        <Text className="text-2xl font-bold text-lime-500">Voluntree</Text>

        <View className = 'h-40 w-96 mt-10'>
          <MapView className="h-full w-full"
            
          ></MapView>
        </View>
      </SafeAreaView>
    </TailwindProvider>
  );
}




export default HomeScreen