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
  const [asociacion, setAsociacion] = useState();

  useEffect(() => {}, []);

  return (
    <Profile
      fromUser={false}
      userID={currentUser.uid}
      asociacion={asociacion}
      correoAsociacion={currentUser.email}
    />
  );
};

export default ProfileAssociation;
