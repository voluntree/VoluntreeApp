import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { confirmAssistenceViaQR } from "../../service/service";
import { useNavigation, useRoute } from "@react-navigation/native";
import { current } from "tailwindcss/colors";

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { actividad } = route.params;
  const currentUser = "Catalin";

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned)
      if (actividad.participantes.includes(currentUser)) {
        try {
          setScanned(true);
          await confirmAssistenceViaQR(currentUser, actividad.titulo, data);

          Alert.alert(
            "Asistencia confirmada",
            "Su asistencia ha sido confirmada exitosamente"
          );
          navigation.goBack();
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      } else
        Alert.alert("Error", "Primero debería inscribirse en esta actividad");
  };

  if (hasPermission === null) {
    return (
      <View className="items-center my-52">
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View className="items-center my-52">
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="inset-0 absolute flex-col items-center">
      <View className="m-5">
        <Text className="font-bold text-base">
          Escanear codigo QR de la actividad
        </Text>
      </View>

      <BarCodeScanner
        className="w-96 h-96"
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View className="border-2 w-56 h-56 z-50 "></View>
      <TouchableOpacity
        className="absolute bottom-5 w-auto h-10 bg-bottomTabs flex items-center justify-center p-2 rounded-md"
        onPress={() => setScanned(false)}
      >
        <Text className="text-[#ffffff]">Escanear de nuevo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
