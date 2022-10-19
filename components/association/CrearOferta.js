import React from "react";
import { ScrollView, StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { launchImageLibrary } from "react-native-image-picker";
import { pickImage } from "../../service/service";

const CrearOferta = () => {
    return (
        <ScrollView className="p-5 pt-20">
            <Formik
                initialValues={{ title: '', type: '', participants: '', duration: '', description: '', image: '' }}
                onSubmit={(values) => {
                    //saveActivity(values);
                    console.log(values);
                }}
            >
                {(props) => (
                    <View>
                        <View className='flex-row'>
                            <View className='mr-2 space-y-5'>
                                <TextInput className="text-xs w-44 h-10 border border-[#6b7280] rounded-md p-2" 
                                    placeholder="Título" 
                                    onChangeText={props.handleChange('title')} 
                                    value={props.values.title} />
                                <TextInput className="text-xs w-44 h-10 border border-[#6b7280] rounded-md p-2" 
                                    placeholder="Tipo" 
                                    onChangeText={props.handleChange('type')}
                                    value={props.values.type} />
                                <View className='flex-row'>
                                    <TextInput className="text-xs w-20 h-10 border border-[#6b7280] rounded-md p-2" 
                                        keyboardType="numeric" 
                                        placeholder="Participantes" 
                                        onChangeText={props.handleChange('participants')} 
                                        value={props.values.participants} />
                                    <TextInput className="text-xs w-20 h-10 border border-[#6b7280] rounded-md p-2 ml-4" 
                                        keyboardType="numeric" 
                                        placeholder="Duración" 
                                        onChangeText={props.handleChange('duration')} 
                                        value={props.values.duration} />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        pickImage(props);
                                    }}
                                    >
                                    <View className='w-40 h-40 items-center justify-center bg-[#d1d5db] rounded-md ml-2'>
                                        <Text className="text-2xl font-bold text-center text-[#ffffff]">+</Text> 
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <TextInput className="align-top text-xs text-justify w-auto h-auto border border-[#6b7280] rounded-md p-2 mt-4 mb-6" 
                            multiline={true} 
                            numberOfLines={10} 
                            placeholder="Descripción" 
                            onChangeText={props.handleChange('description')} 
                            value={props.values.description} />
                        <Button title='Crear' color='maroon' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

export default CrearOferta;