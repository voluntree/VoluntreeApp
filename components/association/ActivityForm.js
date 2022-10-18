import React from "react";
import { ScrollView, StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";

import service, { saveActivity } from '../../service/service';

const ActivityForm = () => {
    const styles = StyleSheet.create({
        input: {
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            fontSize: 12,
            borderRadius: 10,
            marginBottom: 20,
        },
        description: {
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            fontSize: 12,
            borderRadius: 10,
            marginBottom: 20,
        },
        horizontal: {
            flexDirection: "row",
        },
        imageButton: {
            width: 162,
            height: 162,
            backgroundColor: '#d3d3d3',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    
    return (
        <ScrollView style={{padding: 20, paddingTop: 100,}}>
            <Formik
                initialValues={{ title: '', type: '', participants: '', duration: '', description: ''}}
                onSubmit={(values) => {
                    saveActivity(values);
                }}
            >
                {(props) => (
                    <View>
                        <View style={styles.horizontal}>
                            <View style={{width: 180, marginRight: 10}}>
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
                                    onChangeText={props.handleChange('type')}
                                    value={props.values.type}
                                    
                                />
                                <View style={styles.horizontal}>
                                    <TextInput
                                        style={[styles.input, {marginRight: 10, width: 95}]}
                                        placeholder='Número de participantes'
                                        textAlignVertical='top'
                                        onChangeText={props.handleChange('participants')}
                                        value={props.values.participants}
                                        keyboardType='numeric'
                                    />

                                    <TextInput
                                        style={[styles.input, {width: 75}]}
                                        placeholder='Duración'
                                        textAlignVertical='top'
                                        onChangeText={props.handleChange('duration')}
                                        value={props.values.duration}
                                        keyboardType='numeric'
                                    />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <View style={styles.imageButton}>
                                        <Text style={{fontSize: 20, color: '#fff'}}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <TextInput
                            style={styles.description}
                            placeholder='Descripción'
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical='top'
                            onChangeText={props.handleChange('description')}
                            value={props.values.description}
                        />
                        <Button title='Crear' color='maroon' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

export default ActivityForm;