import * as React from 'react';
import { StyleSheet, Text, View, Image, Animated} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/user/HomeScreen';
import { theme } from '../../tailwind.config';
import MapTabScreenStack from '../../screens/MapTabScreenStack';
import HomeTabScreenStack from '../../screens/HomeTabScreenStack';
import ProfileTabScreenStack from '../../screens/ProfileTabScreenStack';
import NewsTabScreenStack from '../../screens/NewsTabScreenStack';
import {HomeIcon, NewsIcon, ShopIcon, InboxIcon, ProfileIcon, MapIcon, ProfileIconFocused, MapIconFocused, HomeIconFocused, NewsIconFocused, ChatIconFocused, ChatIcon} from '../../icons/Icons'
import { useState } from 'react';
import { black } from 'tailwindcss/colors';


const Tab = createBottomTabNavigator()

export function TabNavigator(){

  
    const screenOptions = {
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle:{
        backgroundColor: "white",
        height:60,
        borderTopWidth: 0,
      },
      
      headerShown: false,
      
      tabBarHideOnKeyboard: true,
    };
    

    return (
      <Tab.Navigator {...{ screenOptions }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeTabScreenStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View className=" items-center rounded-lg" style={{}}>
                  {focused
                    ? HomeIconFocused(32, 32, "#fff")
                    : HomeIcon(26, 26, "#fff")}
                </View>
                {!focused ? (
                  <Text className="text-[10px]">Inicio</Text>
                ) : (
                  <Text className="font-bold text-[10px]">Inicio</Text>
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Noticias"
          component={NewsTabScreenStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View className=" items-center rounded-lg" style={{}}>
                  {focused
                    ? NewsIconFocused(32, 32, "#fff")
                    : NewsIcon(26, 26, "#fff")}
                </View>
                {!focused ? (
                  <Text className="bottom-0 text-[10px]">Noticias</Text>
                ) : (
                  <Text className="font-bold text-[10px]">Noticias</Text>
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="MapTab"
          component={MapTabScreenStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View className=" items-center rounded-lg" style={{}}>
                  {focused
                    ? MapIconFocused(32, 32, "#fff")
                    : MapIcon(26, 26, "#fff")}
                </View>
                {!focused ? (
                  <Text className="text-[10px]">Mapa</Text>
                ) : (
                  <Text className="font-bold text-[10px]">Mapa</Text>
                )}
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
                <View className=" items-center rounded-lg" style={{}}>
                  {focused
                    ? ChatIconFocused(32, 32, "#fff", "4")
                    : ChatIcon(26, 26, "#fff", "4")}
                </View>
                {!focused ? (
                  <Text className="text-[10px]">Chat</Text>
                ) : (
                  <Text className="font-bold text-[10px]">Chat</Text>
                )}
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
                <View className=" items-center rounded-lg" style={{}}>
                  {focused
                    ? ProfileIconFocused(32, 32, "#fff")
                    : ProfileIcon(26, 26, "#fff")}
                </View>
                {!focused ? (
                  <Text className="text-[10px]">Perfil</Text>
                ) : (
                  <Text className="font-bold text-[10px]">Perfil</Text>
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
}





