import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './user/HomeScreen';
import ActivityScreen from './user/ActivityScreen';
import AssocFromUser from './user/AssocFromUser';


const HomeTabScreenStack = () => {
    const HomeTabStack = createNativeStackNavigator();
  return (
    <HomeTabStack.Navigator screenOptions={{headerShown: false}}>
        <HomeTabStack.Screen name="Home" component={HomeScreen}/>
        <HomeTabStack.Screen name="Activity" component={ActivityScreen}/>
        <HomeTabStack.Screen name="Association" component={AssocFromUser}/>
    </HomeTabStack.Navigator>
  )
}

export default HomeTabScreenStack