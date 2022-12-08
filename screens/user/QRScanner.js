import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { confirmAssistenceViaCode, confirmAssistenceViaQR } from "../../service/service";
import { useNavigation, useRoute } from "@react-navigation/native";
import { current } from "tailwindcss/colors";
import { TextInput } from "react-native";
import { auth } from "../../utils/firebase";
import { theme } from "../../tailwind.config";
import { Camera } from "expo-camera"

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const { actividad } = route.params;
  const currentUser = auth.currentUser;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned)
      if (actividad.participantes.includes(currentUser.uid)) {
        try {
          setScanned(true);
          await confirmAssistenceViaQR(currentUser.uid, actividad.titulo, data);

          Alert.alert(
            "Asistencia confirmada",
            "Su asistencia ha sido confirmada exitosamente"
          );
          navigation.navigate("HomeTab");
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      } else
        Alert.alert("Error", "Primero debería inscribirse en esta actividad");
  };

  async function manual(){
    if(code=="") Alert.alert("Error","Introduzca el código si desea confirmar manualmente.")
    else{
      try{
        await confirmAssistenceViaCode(currentUser.uid,actividad.titulo, code)
        Alert.alert(
          "Asistencia confirmada",
          "Su asistencia ha sido confirmada exitosamente"
        );
        navigation.navigate("HomeTab");
      }catch(error) {Alert.alert("Error", error.message);}
    }
  }

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
    <SafeAreaView className="flex-col items-center h-full w-full py-5 bg-blanco">
      <Text className="text-ambiental text-base m-2">Confirmar manualmente</Text>
      <KeyboardAvoidingView className="flex-row w-96 justify-evenly my-2">
        <View className="h-10">
          <TextInput
            className="h-10 bg-costas w-40 px-2 rounded-md"
            style={{color: theme.colors.ambiental}}
            onChangeText={(text) => setCode(text)}
            placeholder={"Introduzca el código"}
            placeholderTextColor={theme.colors.ambiental}
            cursorColor = {theme.colors.ambiental}
          />
        </View>
        <TouchableOpacity onPress={manual} className="w-auto h-10 p-2 rounded-md bg-educacion items-center justify-center">
          <Text className=" text-ambiental">Confirmar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Text className="font-bold text-ambiental text-base m-2">O</Text>
      <View className="m-5">
        <Text className="text-ambiental text-base">
          Escanear código QR de la actividad
        </Text>
      </View>
      <View className = "w-[95%] h-[70%] bg-ambiental overflow-hidden rounded-md">
        <Camera
        className = " w-full h-full"
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      </View>
      
      <TouchableOpacity
        className="bottom-11 h-20 w-20 bg-costas flex items-center justify-center p-2 rounded-full"
        onPress={() => setScanned(false)}
      >
        <Text className="text-ambiental">Escanear</Text>
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
