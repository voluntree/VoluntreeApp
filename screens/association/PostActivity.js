import React, {useLayoutEffect} from "react";
import { View, Text, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TailwindProvider } from 'tailwindcss-react-native'

import CrearOferta from "../../components/association/CrearOferta";
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalNewActivity from "./ModalNewActivity";

const PostActivity = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView>
            <CrearOferta />
        </SafeAreaView>
    )
}

export default PostActivity;