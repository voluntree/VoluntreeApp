import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

import { auth, db } from "../../utils/firebase";
import Profile from "../../components/association/Profile";

const AssocFromUser = () => {
    const currentUser = auth.currentUser;
    const route = useRoute();
    const { asociacion } = route.params;

    return (
        <Profile
            fromUser={true}
            userID={currentUser.uid}
            asociacion={asociacion}
        />
    )
}

export default AssocFromUser;