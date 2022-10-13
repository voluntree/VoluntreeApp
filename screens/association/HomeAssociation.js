import React, {useLayoutEffect} from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeAssociation = () => {
    const navigation = useNavigation();
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

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
        <View>
            <Button title="Association" />
        </View>
    </View>
    )
}   

export default HomeAssociation