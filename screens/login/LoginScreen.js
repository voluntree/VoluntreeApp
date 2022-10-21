import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button, StyleSheet } from "react-native";

const LoginScreen = () => {
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 300,
            paddingHorizontal: 100,
            flexDirection: "row",
        }
    })
    
    return (
    <View style={styles.container}>
        <View style={{marginRight: 20}}>
            <Button title="User" onPress={() => {navigation.navigate('UserHome')}}/>
        </View>
        <View>
            <Button title="Association" onPress={() => {navigation.navigate('AssociationHome')}}/>
        </View>
    </View>
    )
}   

export default LoginScreen