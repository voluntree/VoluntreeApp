import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

import HomeAssociation from "../../screens/association/HomeAssociation";
import NewsAssociation from "../../screens/association/NewsAssociation";
import InboxAssociation from "../../screens/association/InboxAssociation";
import ProfileAssociation from "../../screens/association/ProfileAssociation";
import PostActivity from "../../screens/association/PostActivity";
import ModalNewActivity from "../../screens/association/ModalNewActivity";
import { theme } from "../../tailwind.config";

const Tab = createBottomTabNavigator();

const AssociationTab = () => {
  const navigation = useNavigation();

  const [isActivityModalOpen, setActivityModalOpen] = useState(false);
  const [add] = useState(new Animated.Value(0));
  const [newActivity] = useState(new Animated.Value(70));
  const [newArticle] = useState(new Animated.Value(20));

  const [pop, setPop] = useState(false);

  const POP_IN = () => {
    setPop(true);

    Animated.spring(add, {
      toValue: 1,
      friction: 5,
      useNativeDriver: false,
    }).start();

    Animated.timing(newActivity, {
      toValue: 135,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(newArticle, {
      toValue: 140,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const POP_OUT = () => {
    setPop(false);

    Animated.spring(add, {
      toValue: 0,
      friction: 5,
      useNativeDriver: false,
    }).start();

    Animated.timing(newActivity, {
      toValue: 70,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(newArticle, {
      toValue: 20,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const rotation = {
    transform: [
      {
        rotate: add.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  const FloatingButton = () => {
    return (
      <View className=" items-center">
        <Animated.View
          className="w-12 h-12 bg-costas rounded-full justify-center items-center"
          style={[styles.shadow, { bottom: newArticle }]}
        >
          <TouchableOpacity
            onPress={() => {
                navigation.navigate("NuevoArticulo");
                POP_OUT();
            }}
          >
            <Icon name="post-add" type="material" color={theme.colors.ambiental} size={25} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          className="w-12 h-12 bg-costas rounded-full justify-center items-center"
          style={[styles.shadow, { bottom: newActivity }]}
        >
          <TouchableOpacity
            onPress={() => {
              setActivityModalOpen(true);
              POP_OUT();
            }}
          >
            <Icon name="library-add" type="material" color={theme.colors.ambiental} size={25} />
          </TouchableOpacity>
        </Animated.View>

        <TouchableWithoutFeedback
          onPress={() => {
            pop === false ? POP_IN() : POP_OUT();
          }}
        >
          <Animated.View
            className="w-16 h-16 bg-costas justify-center items-center rounded-full bottom-[120px]"
            style={[styles.shadow, rotation]}
          >
            <Icon name="add" type="material" color={theme.colors.ambiental} size={30} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 15,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 70,
            ...styles.shadow,
          },
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <Icon
                    name="park"
                    type="material"
                    color={focused ? theme.colors.ambiental : "#748c94"}
                    size={30}
                />

                <Text
                  style={{
                    color: focused ? theme.colors.ambiental : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={NewsAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <Icon
                    name="article"
                    type="material"
                    color={focused ? theme.colors.ambiental : "#748c94"}
                    size={30}
                />
                <Text
                  style={{
                    color: focused ? theme.colors.ambiental : "#748c94",
                    fontSize: 12,
                  }}
                >
                  News
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Crear"
          component={PostActivity}
          options={{
            tabBarButton: () => <FloatingButton />,
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={InboxAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <Image
                  source={require("../../icons/inbox.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? theme.colors.ambiental : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? theme.colors.ambiental : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Inbox
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileAssociation}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <Image
                  source={require("../../icons/profile.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? theme.colors.ambiental : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? theme.colors.ambiental : "#748c94",
                    fontSize: 12,
                  }}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <ModalNewActivity
        isActivityModalOpen={isActivityModalOpen}
        setActivityModalOpen={setActivityModalOpen}
      />
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#636363",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default AssociationTab;
