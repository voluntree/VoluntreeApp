import React, { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { Text } from "react-native";
import { auth, db } from "../../utils/firebase";
import Profile from "../../components/association/Profile";
import { View, Button } from "react-native";

const ProfileAssociation = () => {
  const currentUser = auth.currentUser;
  const [asociacion, setAsociacion] = useState();

  useEffect(() => {
    onSnapshot(doc(db, "asociaciones", currentUser.uid), async (doc) => {
      setAsociacion(doc.data());
    });
  }, []);

  return (
    <Profile
      fromUser={false}
      userID={currentUser.uid}
      asociacion={asociacion}
    />
  )

  
};

export default ProfileAssociation;