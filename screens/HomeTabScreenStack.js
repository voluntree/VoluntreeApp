import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './user/HomeScreen';
import ActivityScreen from './user/ActivityScreen';


const HomeTabScreenStack = () => {
    const HomeTabStack = createNativeStackNavigator();
  return (
    <HomeTabStack.Navigator>
        <HomeTabStack.Screen name="Home" component={HomeScreen}/>
    </HomeTabStack.Navigator>
  )
}

export default HomeTabScreenStack