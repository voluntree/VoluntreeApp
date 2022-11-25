import * as React from 'react';
import { View, useWindowDimensions, Text} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FavoritosScreen from '../../screens/FavoritosScreen';
import MyActivitiesScreen from '../../screens/MyActivitiesScreen';
import { theme } from '../../tailwind.config';

 
const FirstRoute = () => (
<MyActivitiesScreen></MyActivitiesScreen>
);
const SecondRoute = () => (
<FavoritosScreen></FavoritosScreen>
);
 
export default function UserProfileTab() {
  const layout = useWindowDimensions();
 
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
{ key: 'first', title: 'Actividades ' },
{ key: 'second', title: 'Favoritos ' },
  ]);
 
  const renderScene = SceneMap({
first: FirstRoute,
second: SecondRoute,
  });
 
  const renderTabBar = props => (
  <TabBar className = "bg-costas"
  style = {{elevation: 0}}
      {...props}
      activeColor ={theme.colors.ambiental}
      inactiveColor ={theme.colors.ambiental}
      renderLabel = {({ route, focused, color}) => (
          <Text style = {{color, fontWeight: focused ? "800" : "400"}}>
            {route.title}
          </Text>
        
      )}
      indicatorStyle = {{backgroundColor: theme.colors.blanco}}
      pressColor = {theme.colors.blanco} 
      
  />
  );
 
  return (
  <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}
  />
  );
}
