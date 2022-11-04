import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyActivitiesScreen from "./MyActivitiesScreen";
import ActivityScreen from './user/ActivityScreen';
import ProfileScreen from "./user/ProfileScreen";
import FavoritosScreen from "./FavoritosScreen";

const ProfileTabScreenStack = () => {
  const ProfileTabStack = createNativeStackNavigator();
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen name="Perfil" component={ProfileScreen}/>
      <ProfileTabStack.Screen name="Mis actividades" component={MyActivitiesScreen}/>
      <ProfileTabStack.Screen name="Favoritos" component={FavoritosScreen} />
      <ProfileTabStack.Screen name="Actividad" component={ActivityScreen} />
    </ProfileTabStack.Navigator>
  );
};

export default ProfileTabScreenStack;
