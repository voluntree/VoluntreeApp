import * as React from 'react';
import { StyleSheet, Text, View, Image, Animated} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/user/HomeScreen';
import { theme } from '../../tailwind.config';
import MapTabScreenStack from '../../screens/MapTabScreenStack';
import HomeTabScreenStack from '../../screens/HomeTabScreenStack';
import ProfileTabScreenStack from '../../screens/ProfileTabScreenStack';
import NewsTabScreenStack from '../../screens/NewsTabScreenStack';
import {HomeIcon, NewsIcon, ShopIcon, InboxIcon, ProfileIcon, MapIcon} from '../../icons/Icons'
import ChatListScreen from '../../screens/chat/ChatListScreen';


const Tab = createBottomTabNavigator()

export function TabNavigator(){
  
    const screenOptions = {
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle:{
        backgroundColor: theme.colors.bottomTabs,
        height:55
      },
      headerShown: false,
      tabBarHideOnKeyboard: true,
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
          name="HomeTab"
          component={HomeTabScreenStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center bg-transparent">
                <View
                  className="w-[60px] h-[30px] items-center rounded-lg"
                  style={{
                    backgroundColor: focused
                      ? theme.colors.focusBottomTabs
                      : null,
                  }}
                >
                  {HomeIcon(25, 25, "#fff")}
                </View>
                <Text style={styles.tabText}>HOME</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Noticias"
          component={NewsTabScreenStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center bg-transparent">
                <View
                  className="w-[60px] h-[30px] items-center rounded-lg"
                  style={{
                    backgroundColor: focused
                      ? theme.colors.focusBottomTabs
                      : null,
                  }}
                >
                  {NewsIcon(25, 25, "#fff")}
                </View>
                <Text style={styles.tabText}>NOTICIAS</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="MapTab"
          component={MapTabScreenStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center bg-transparent">
                <View
                  className="w-[60px] h-[30px] items-center rounded-lg"
                  style={{
                    backgroundColor: focused
                      ? theme.colors.focusBottomTabs
                      : null,
                  }}
                >
                  {MapIcon(25, 25, "#fff")}
                </View>
                <Text style={styles.tabText}>MAP</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={ChatListScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View
                  className="w-[60px] h-[30px] items-center rounded-lg"
                  style={{
                    backgroundColor: focused
                      ? theme.colors.focusBottomTabs
                      : null,
                  }}
                >
                  {InboxIcon(25, 25, "#fff")}
                </View>
                <Text style={styles.tabText}>INBOX</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileTabScreenStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View
                  className="w-[60px] h-[30px] items-center rounded-lg"
                  style={{
                    backgroundColor: focused
                      ? theme.colors.focusBottomTabs
                      : null,
                  }}
                >
                  {ProfileIcon(25, 25, "#fff")}
                </View>
                <Text style={styles.tabText}>PERFIL</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
}





