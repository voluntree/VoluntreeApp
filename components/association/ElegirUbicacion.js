import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { theme } from "../../tailwind.config";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Callout, Marker } from "react-native-maps";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "../../utils/firebase";
import { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import Svg, { Path, Rect } from "react-native-svg";
import { Icon } from "react-native-elements";
import {
  EducativoIcon,
  AmbientalIcon,
  CulturalIcon,
  DeportivoIcon,
  ComunitarioIcon,
  ComunitarioItemIcon,
  AmbientalItemIcon,
  DeportivoItemIcon,
  EducativoItemIcon,
  CulturalItemIcon,
} from "../../icons/Icons";
import { isEmpty } from "@firebase/util";
import { getActivityById, getActivityByTitle } from "../../service/service";

const ElegirUbicacion = () => {
    const navigation = useNavigation();
    const region = {
        latitude: 39.367835,
        longitude: -0.376084,
        latitudeDelta: 0.015,
        longitudeDelta: 2.2,
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View>
            {/* Buscador */}
            <View className="absolute z-10 w-full justify-center items-center">
                <View 
                    className='flex-row h-12 w-10/12 bg-blanco rounded-full justify-center items-center mt-12 px-4'
                    style={{shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.50,
                        shadowRadius: 3.84,
                        elevation: 10,
                    }}
                >
                    <TextInput 
                        className="h-12 w-[90%] text-base rounded-full"
                        placeholder="Buscar aquí"
                    />
                    <Icon
                        name="search"
                        type="material"
                        size={25}
                    />
                </View>
            </View>
            {/* Mapa */}
            <MapView 
                className="h-full w-full"
                region={region}
            >
            </MapView>
        </View>
    )
}

export default ElegirUbicacion;