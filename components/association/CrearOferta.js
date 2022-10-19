import React from "react";
import { ScrollView, StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import { launchImageLibrary } from "react-native-image-picker";
import { pickImage, saveActivity } from "../../service/service";

const CrearOferta = () => {
    return (
        <ScrollView className="p-5 pt-20">
            <Formik
                initialValues={{ titulo: '', tipo: '', maxParticipantes: '', duracion: '', descripcion: '', imagen: '', fecha: '', ubicacion:''}}
                onSubmit={(values) => {
                    values.fecha = new Date();
                    saveActivity(values);
                    console.log(values);
                }}
            >
                {(props) => (
                    <View>
                        <View className='flex-row'>
                            <View className='mr-2 space-y-5'>
                                <TextInput className="text-xs w-44 h-10 border border-[#6b7280] rounded-md p-2" 
                                    placeholder="Título" 
                                    onChangeText={props.handleChange('titulo')} 
                                    value={props.values.titulo} />
                                <TextInput className="text-xs w-44 h-10 border border-[#6b7280] rounded-md p-2" 
                                    placeholder="Tipo" 
                                    onChangeText={props.handleChange('tipo')}
                                    value={props.values.tipo} />
                                <View className='flex-row'>
                                    <TextInput className="text-xs w-20 h-10 border border-[#6b7280] rounded-md p-2" 
                                        keyboardType="numeric" 
                                        placeholder="Participantes" 
                                        onChangeText={props.handleChange('maxParticipantes')} 
                                        value={props.values.maxParticipantes} />
                                    <TextInput className="text-xs w-20 h-10 border border-[#6b7280] rounded-md p-2 ml-4" 
                                        keyboardType="numeric" 
                                        placeholder="Duración" 
                                        onChangeText={props.handleChange('duracion')} 
                                        value={props.values.duracion} />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        pickImage().then((result) => {
                                            props.setFieldValue('imagen', result.uri);
                                        });
                                    }}
                                    value={props.values.image}
                                >
                                    <View className='w-40 h-40 items-center justify-center bg-[#d1d5db] rounded-md ml-2'>
                                        {props.values.imagen ?
                                            <Image className='w-40 h-28' source={{ uri: props.values.imagen }} /> 
                                         : 
                                            <Text className="text-2xl font-bold text-center text-[#ffffff]">+</Text> }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <TextInput className="align-top text-xs text-justify w-auto h-auto border border-[#6b7280] rounded-md p-2 mt-4 mb-6" 
                            multiline={true} 
                            numberOfLines={10} 
                            placeholder="Descripción" 
                            onChangeText={props.handleChange('descripcion')} 
                            value={props.values.descripcion} />
                        <Button title='Crear' color='maroon' onPress={props.handleSubmit} />
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

export default CrearOferta;