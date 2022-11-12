import React from "react";
import { View, Text } from "react-native";
import Feed from "../../components/association/Feed";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileAssociation = () => {
  return (
    <SafeAreaView>
      <Feed />
    </SafeAreaView>
  );
};

export default ProfileAssociation;
