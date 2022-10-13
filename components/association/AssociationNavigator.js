import * as React from 'react';
import { StyleSheet, Text, View, Image, Animated} from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../../tailwind.config';
import HomeAssociation from '../../screens/association/HomeAssociation';
import NewsAssociation from '../../screens/association/NewsAssociation';
import InboxAssociation from '../../screens/association/InboxAssociation';
import ProfileAssociation from '../../screens/association/ProfileAssociation';


const Tab = createBottomTabNavigator()

export function AssociationNavigator(){
  
    const screenOptions = {
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
      },
      buttonOnFocus: {
        width: 60,
        height: 30,  
        alignItems: 'center', 
        borderRadius: 5
      }
    })

    return (
      <Tab.Navigator {...{ screenOptions }}>
        <Tab.Screen
          name="Home"
          component={HomeAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View
                  style={[
                    styles.buttonOnFocus,
                    { backgroundColor: focused ? "#8bb3ff" : null },
                  ]}
                >
                  <Image
                    source={require("../../icons/home.png")}
                    resizeMode="contain"
                    style={{ width: 25, height: 25 }}
                  ></Image>
                </View>
                <Text style={styles.tabText}>HOME</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Noticias"
          component={NewsAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View
                  style={[
                    styles.buttonOnFocus,
                    { backgroundColor: focused ? "#8bb3ff" : null },
                  ]}
                >
                  <Image
                    source={require("../../icons/news.png")}
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
          name="CreateActivity"
          component={HomeAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View>
                  <Image
                    source={require("../../icons/plus.png")}
                    resizeMode="contain"
                    style={{ width: 30, height: 26 }}
                  ></Image>
                </View>
                <Text style={styles.tabText}></Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={InboxAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View
                  style={[
                    styles.buttonOnFocus,
                    { backgroundColor: focused ? "#8bb3ff" : null },
                  ]}
                >
                  <Image
                    source={require("../../icons/inbox.png")}
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
          component={ProfileAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View
                  style={[
                    styles.buttonOnFocus,
                    { backgroundColor: focused ? "#8bb3ff" : null },
                  ]}
                >
                  <Image
                    source={require("../../icons/profile.png")}
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