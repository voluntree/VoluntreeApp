import * as React from 'react';
import { StyleSheet, Text, View, Image, Animated} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { theme } from '../tailwind.config';
import MyActivitiesScreen from '../screens/MyActivitiesScreen';
import ActivityScreen from './../screens/ActivityScreen';


const Tab = createBottomTabNavigator()

export function TabNavigator(){
  
    const screenOptions = {
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle:{
        backgroundColor: theme.colors.bottomTabs,
        height:55
      },
    };
    
    const styles = StyleSheet.create({
      tabText: {
        fontSize: 12, 
        fontWeight: 'bold', 
        color: 'white'
      }
    })

    return (
      <Tab.Navigator {...{ screenOptions }}>
        <Tab.Screen
          name="Home"
          component={ActivityScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center bg-transparent">
                <View className="w-[60px] h-[30px] items-center rounded-lg" 
                      style={{backgroundColor: focused ? theme.colors.focusBottomTabs : null}}>
                  <Image
                    source={require("../icons/home.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                  />
                </View>
                 <Text style={styles.tabText}>HOME</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Noticias"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View className="w-[60px] h-[30px] items-center rounded-lg" 
                      style={{backgroundColor: focused ? theme.colors.focusBottomTabs : null}}>
                  <Image
                    source={require("../icons/news.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                  ></Image>
                </View>
                <Text style={styles.tabText}>NOTICIAS</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Tienda"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View className="w-[60px] h-[30px] items-center rounded-lg" 
                      style={{backgroundColor: focused ? theme.colors.focusBottomTabs : null}}>
                  <Image
                    source={require("../icons/shop.png")}
                    resizeMode="contain"
                    style={{ width: 30, height: 26 }}
                  ></Image>
                </View>
                <Text style={styles.tabText}>TIENDA</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View className="w-[60px] h-[30px] items-center rounded-lg" 
                      style={{backgroundColor: focused ? theme.colors.focusBottomTabs : null}}>
                  <Image
                    source={require("../icons/inbox.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                  ></Image>
                </View>
                <Text style={styles.tabText}>INBOX</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={MyActivitiesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View className="w-[60px] h-[30px] items-center rounded-lg" 
                      style={{backgroundColor: focused ? theme.colors.focusBottomTabs : null}}>
                  <Image
                    source={require("../icons/profile.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                  ></Image>
                </View>
                <Text style={styles.tabText}>PERFIL</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
}





