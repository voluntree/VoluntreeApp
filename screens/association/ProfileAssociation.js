import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  where,
  query,
  getDocs,
  collection,
} from "firebase/firestore";
import { Text } from "react-native";
import { auth, db } from "../../utils/firebase";
import Profile from "../../components/association/Profile";
import { View, Button } from "react-native";

const ProfileAssociation = () => {
  const currentUser = auth.currentUser;

  return (
    <Profile
      fromUser={false}
      correoAsociacion={currentUser.email}
    />
  );
};

export default ProfileAssociation;
