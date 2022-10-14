import React, {useLayoutEffect} from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ActivityForm from "../../components/association/ActivityForm";

const PostActivity = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <View>
            <ActivityForm/>
        </View>
    )
}

export default PostActivity;