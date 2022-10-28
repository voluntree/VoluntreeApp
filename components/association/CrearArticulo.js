import { View, Text, ScrollView, TextInput } from "react-native";
import React from "react";
import { Formik } from "formik";

const CrearArticulo = () => {
  return (
    <ScrollView>
      <Formik initialValues={{
        titulo: "",
        subtitulo: "",
        autor:"",
        fecha_publicacion: Date.now(),
        asociacion:"",
        introduccion: "",
        cuerpo:"",
        conclusion: "",
        imagen:"",
        favoritos: []
      }}>

      </Formik>
    </ScrollView>
  );
};

export default CrearArticulo;
