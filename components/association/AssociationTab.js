import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import HomeAssociation from "../../screens/association/HomeAssociation";
import NewsAssociation from "../../screens/association/NewsAssociation";
import InboxAssociation from "../../screens/association/InboxAssociation";
import ProfileAssociation from "../../screens/association/ProfileAssociation";
import PostActivity from "../../screens/association/PostActivity";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity className='items-center justify-center bottom-7' onPress={onPress}>
        
        <View className='items-center justify-center w-16 h-16 bg-[#00BFA5] rounded-full'> 
            {children}
        </View>
    </TouchableOpacity>
);

const AssociationTab = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 15,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 70,
                    ... styles.shadow,
                    
                },
                tabBarHideOnKeyboard: true,
                headerShown : false,
            }}
        >
            <Tab.Screen name="Home" component={HomeAssociation} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View className='items-center justify-center'>
                        <Image
                            source={require('../../icons/home.png')} 
                            resizeMode='contain' 
                            style={{
                                width: 25, height: 25,
                                tintColor: focused ? '#00BFA5' : '#748c94'}}/>
                            
                        <Text style={{color: focused ? '#00BFA5' : '#748c94', fontSize: 12 }}>Home</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name="News" component={NewsAssociation} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View className='items-center justify-center'>
                        <Image 
                            source={require("../../icons/news.png")}
                            resizeMode='contain'
                            style={{ 
                                width: 25, height: 25, 
                                tintColor: focused ? '#00BFA5' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#00BFA5' : '#748c94', fontSize: 12 }}>News</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Nueva Oferta" component={PostActivity} 
            options={{
                tabBarIcon: ({focused}) => (
                    <Image
                        source={require("../../icons/plus.png")}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: '#black'
                        }}
                    />
                ),
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                )
            }}/>
            <Tab.Screen name="Inbox" component={InboxAssociation} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View className='items-center justify-center'>
                        <Image 
                            source={require("../../icons/inbox.png")}
                            resizeMode='contain'
                            style={{ 
                                width: 25, height: 25, 
                                tintColor: focused ? '#00BFA5' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#00BFA5' : '#748c94', fontSize: 12 }}>Inbox</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Profile" component={ProfileAssociation} 
            options={{
                tabBarIcon: ({focused}) => (
                    <View className='items-center justify-center'>
                        <Image 
                            source={require("../../icons/profile.png")}
                            resizeMode='contain'
                            style={{ 
                                width: 25, height: 25, 
                                tintColor: focused ? '#00BFA5' : '#748c94'
                            }}
                        />
                        <Text style={{color: focused ? '#00BFA5' : '#748c94', fontSize: 12 }}>Profile</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})

export default AssociationTab;