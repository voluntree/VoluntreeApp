import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./user/MapScreen";

const MapTabScreenStack = () => {
  const MapTabStack = createNativeStackNavigator();
  return (
    <MapTabStack.Navigator>
      <MapTabStack.Screen name="Map" component={MapScreen} />
    </MapTabStack.Navigator>
  );
};

export default MapTabScreenStack;
