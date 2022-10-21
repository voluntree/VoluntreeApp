import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyActivitiesScreen from "./MyActivitiesScreen";
import ListaFiltros from "../components/ListaFiltros";
import ActivityScreen from './user/ActivityScreen';

const ProfileTabScreenStack = () => {
  const ProfileTabStack = createNativeStackNavigator();
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen
        name="Mis actividades"
        component={MyActivitiesScreen}
      />
      <ProfileTabStack.Screen name="Actividad" component={ActivityScreen} />
    </ProfileTabStack.Navigator>
  );
};

export default ProfileTabScreenStack;
