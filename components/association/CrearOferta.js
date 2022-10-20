import React, {useState, useEffect} from "react";
import { ScrollView, StyleSheet, Button, TextInput, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Formik } from "formik";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker';
import { firebase } from "../../utils/firebase";
import { storage, uploadBytes } from "../../utils/firebase";
import {ref} from "firebase/storage";

import { pickImage, saveActivity, storeImage } from "../../service/service";

const CrearOferta = () => {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if(!result.cancelled) {
            console.log(result);
            setImage(result.uri);
            return result;
        }
    };

    if (hasGalleryPermission === false) {
        <Text>No tiene acceso a la galería</Text>
    }

    const storeImage = async () => {
        setUploading(true);
        console.log(image);
        const filename = image.substring(image.lastIndexOf('/') + 1);
        const path = `cardImages/${filename}`;
        const storageRef = ref(storage, path);
        const img = await fetch(image);
        const bytes = await img.blob();
        
        try {
            await uploadBytes(storageRef, bytes);
        }
        catch(e) {
            console.log(e);
        }
        setUploading(false);
    }

    return (
        <ScrollView className="p-5 pt-20">
            <Formik
                initialValues={{ titulo: '', tipo: '', maxParticipantes: '', duracion: '', descripcion: '', imagen: '', fecha: '', ubicacion:''}}
                onSubmit={(values) => {
                    values.fecha = new Date();
                    const filename = image.substring(image.lastIndexOf('/') + 1);
                    values.imagen = filename;
                    storeImage();
                    saveActivity(values);
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
                                    value={props.values.imagen}
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