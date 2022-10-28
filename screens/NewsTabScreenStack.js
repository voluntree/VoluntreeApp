import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaArticulos from './../components/articulos/ListaArticulos';
import NewsScreen from './user/NewsScreen';


const NewsTabScreenStack = () => {
    const NewsTabStack = createNativeStackNavigator();
  return (
    <NewsTabStack.Navigator>
        <NewsTabStack.Screen name="Home" component={ListaArticulos}/>
        <NewsTabStack.Screen name="Articulo" component={NewsScreen}/>
    </NewsTabStack.Navigator>
  )
}

export default NewsTabScreenStack