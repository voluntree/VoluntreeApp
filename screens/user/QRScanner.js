import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        <Text className="font-bold text-base">Escanee el codigo QR aportado por la asociación</Text>
      </View>

      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
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
