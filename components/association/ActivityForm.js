import React from "react";
import { ScrollView, StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";

const ActivityForm = () => {
    const styles = StyleSheet.create({
        input: {
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            fontSize: 18,
            borderRadius: 10,
            marginBottom: 10,
        }
    })
    
    return (
        <ScrollView style={{padding: 20, paddingTop: 60,}}>
            <Formik
                initialValues={{ title: '', body: '', rating: '' }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Título de la actividad'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                        />

                        <TextInput
                            style={styles.input}
                            multiline
                            placeholder='Tipo'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                            
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Descripción'
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical='top'
                            onChangeText={props.handleChange('description')}
                            value={props.values.description}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Número de participantes'
                            textAlignVertical='top'
                            onChangeText={props.handleChange('participants')}
                            value={props.values.participants}
                            keyboardType='numeric'
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Duración'
                            textAlignVertical='top'
                            onChangeText={props.handleChange('duration')}
                            value={props.values.duration}
                            keyboardType='numeric'
                        />

                        <Button title='Crear' color='maroon' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

export default ActivityForm;