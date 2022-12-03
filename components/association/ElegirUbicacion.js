import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import MapView, { Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
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
import { theme } from "../../tailwind.config";

const ElegirUbicacion = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [region, setRegion] = useState({
    latitude: 39.481256,
    longitude: -0.340958,
    latitudeDelta: 0.015,
    longitudeDelta: 2.2,
  });

  

  const google_api_key = "AIzaSyACpAdm3w3zmrvsSJ5KgKtNQff7nslAbj0";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="items-center">
        <View 
            className="absolute z-10 h-auto w-10/12 mt-12 justify-center"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.50,
                shadowRadius: 3.84,
                elevation: 10,
            }}
        >
            <GooglePlacesAutocomplete
                placeholder="Buscar"
                fetchDetails={true}
                onPress={(data, details = null) => {
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    })
                 }}
                query={{
                    key: google_api_key,
                    language: 'es',
                    components: 'country:es',
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`,
                }}
                styles={{
                    container: { flex: 0 },
                    listView: {
                        backgroundColor: "white",
                    },
                }}
            />
        </View>
      <MapView className="h-full w-full" region={region} provider="google">
        <Marker
          coordinate={region}
        />
      </MapView>
    </View>
  );
};

export default ElegirUbicacion;
