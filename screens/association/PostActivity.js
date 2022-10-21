import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CrearOferta from "../../components/association/CrearOferta";

const PostActivity = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View>
            <CrearOferta/>
        </View>
    )
}

export default PostActivity;