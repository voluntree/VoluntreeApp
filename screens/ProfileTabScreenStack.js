import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyActivitiesScreen from "./MyActivitiesScreen";
import ProfileScreen from "./user/ProfileScreen";
import FavoritosScreen from "./FavoritosScreen";
import EditProfile from "./user/EditProfile";
import FollowingScreen from "./user/FollowingScreen";

const ProfileTabScreenStack = () => {
  const ProfileTabStack = createNativeStackNavigator();
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen name="Perfil" component={ProfileScreen}/>
      <ProfileTabStack.Screen name="Mis actividades" component={MyActivitiesScreen}/>
      <ProfileTabStack.Screen name="Favoritos" component={FavoritosScreen} />
      <ProfileTabStack.Screen name='EditProfile' component={EditProfile}/>
      <ProfileTabStack.Screen name='Following' component={FollowingScreen}/>
    </ProfileTabStack.Navigator>
  );
};

export default ProfileTabScreenStack;
