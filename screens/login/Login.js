import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardEvent,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput, Checkbox, Modal } from "react-native-paper";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, auth, db } from "../../utils/firebase";
import Spinner from "react-native-loading-spinner-overlay";

import {
  doc,
  getDocs,
  collection,
  where,
  query,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import {
  setUserAsAssociation,
  setUserAsVolunteer,
} from "./../../service/LoginService";
import { LoginIcon } from "../../icons/Icons";
import { Component } from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { theme } from "../../tailwind.config";
import { getAsociacionByEmail, getAsociationByID, getVoluntarioByID } from "../../service/service";
import { isEmpty } from "@firebase/util";

const Login = () => {
  useEffect(() => {
    clearFields();
    setSpinner(false);
  }, []);

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setSpinner(false);
  };

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [tipoUser, setTipoUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusAsoc, setStatusAsoc] = useState("unchecked");
  const [statusVoluntario, setStatusVoluntario] = useState("unchecked");

  function actualizarEmail(value) {
    setEmail(value.trim());
  }
  function actualizarContraseña(value) {
    setPassword(value);
  }

  const nuevo = useRef(false);
  const [usuario, setUsuario] = useState();
  const [spinner, setSpinner] = useState(false);

  const Stack = createNativeStackNavigator();

  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const voluntarioRef = doc(db, "voluntarios", auth.currentUser.uid);
      getDoc(voluntarioRef).then((doc) => {
        if(doc.data() == undefined){
          getAsociacionByEmail(email).then((asoc) => {
            if(asoc != (undefined || null)){
              const asocRef = doc(db, "asociaciones", asoc.nombre);
              setUserAsAssociation(email);
              nuevo.current = asoc.nuevo;
              if (nuevo == true) {
                setSpinner(false);
                navigation.navigate("OnBoarding");
                updateDoc(asocRef, {
                  nuevo: false,
                });
              } else {
                setSpinner(false);
                navigation.navigate("AssociationHome");
              }
            }
          })
        }else{
          setUserAsVolunteer(auth.currentUser.uid)
          nuevo.current = doc.data().nuevo;
          if (nuevo == true) {
            setSpinner(false);
            navigation.navigate("OnBoarding");
            updateDoc(voluntarioRef, {
              nuevo: false,
            });
          } else {
            setSpinner(false);
            navigation.navigate("UserHome");
          }
        }
      })
    }).catch((error) => {
        setSpinner(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
            case "auth/invalid-email":
              Alert.alert("Advertencia", "Correo inválido");
              break;

            case "auth/wrong-password":
              Alert.alert("Advertencia", "Contraseña Incorrecta");
              break;

            case "auth/user-not-found":
              Alert.alert("Advertencia", "Correo electrónico no registrado");

            default:
              // Alert.alert(errorCode);
              Alert.alert("Advertencia", "Error al iniciar sesión");
        }
    })
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <KeyboardAvoidingView behavior="position">
        <View className="absolute top-0 p-4">
          {
            <Svg
              width="130"
              height="23"
              viewBox="0 0 130 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M5.66529 22.4931H8.65708L14.6407 6.65289H12.1581L7.19302 19.8003L2.48254 6.65289H0L5.66529 22.4931Z"
                fill="#0D6A43"
              />
              <Path
                d="M23.6028 23C27.4221 23 31.0823 20.3388 31.0823 14.6364C31.0823 8.93388 27.4221 6.146 23.6028 6.146C19.7835 6.146 16.0915 8.93388 16.0915 14.6364C16.0915 20.3388 19.7835 23 23.6028 23ZM18.5741 14.6364C18.5741 11.1515 20.1018 8.45868 23.6028 8.45868C27.1039 8.45868 28.6316 11.1515 28.6316 14.6364C28.6316 18.1212 27.1039 20.6873 23.6028 20.6873C20.1018 20.6873 18.5741 18.1212 18.5741 14.6364Z"
                fill="#0D6A43"
              />
              <Path
                d="M34.5764 22.4931H36.9634V0H34.5764V22.4931Z"
                fill="#0D6A43"
              />
              <Path
                d="M46.2765 23C48.6954 23 50.8915 21.6061 51.8463 19.5468V22.4931H54.2334V6.65289H51.8463V14.3512C51.8463 19.1033 49.6184 20.6873 47.0722 20.6873C44.8442 20.6873 43.7939 19.2934 43.7939 16.7589V6.65289H41.4069V17.7094C41.4069 21.1942 43.412 23 46.2765 23Z"
                fill="#0D6A43"
              />
              <Path
                d="M69.4459 12.3871V22.4931H71.833V11.4366C71.833 7.95179 69.8278 6.146 66.9634 6.146C64.5445 6.146 62.3484 7.34986 61.3935 9.31405V6.65289H59.0065V22.4931H61.3935V14.7948C61.3935 10.0427 63.6215 8.45868 66.1677 8.45868C68.3956 8.45868 69.4459 9.85262 69.4459 12.3871Z"
                fill="#0D6A43"
              />
              <Path
                d="M82.2714 22.4931H84.9768V20.1804H82.1123C80.8392 20.1804 80.2026 19.5468 80.2026 18.2796V8.96556H84.9768V6.65289H80.2026V1.58402H77.8155V6.65289H74.3782V8.96556H77.8155V18.0578C77.8155 20.9091 79.4069 22.4931 82.2714 22.4931Z"
                fill="#0D6A43"
              />
              <Path
                d="M88.4755 22.4931H90.8626V15.27C90.8626 11.1515 92.1675 8.96556 94.7137 8.96556H97.3236V6.65289H94.3954C92.5176 6.65289 91.34 8.30027 90.8626 10.803V6.65289H88.4755V22.4931Z"
                fill="#0D6A43"
              />
              <Path
                d="M105.938 23C109.757 23 112.049 21.0358 112.685 17.9311L110.203 17.6143C109.885 18.8815 109.121 20.6873 105.938 20.6873C102.755 20.6873 100.909 18.0579 100.909 15.2066H112.781V14.6364C112.781 8.93388 109.471 6.146 105.651 6.146C101.832 6.146 98.4266 8.93388 98.4266 14.6364C98.4266 20.3388 102.119 23 105.938 23ZM100.909 13.0523C100.909 11.1515 102.15 8.45868 105.651 8.45868C109.152 8.45868 110.298 11.1515 110.298 13.0523H100.909Z"
                fill="#0D6A43"
              />
              <Path
                d="M123.157 23C126.976 23 129.268 21.0358 129.905 17.9311L127.422 17.6143C127.104 18.8815 126.34 20.6873 123.157 20.6873C119.974 20.6873 118.128 18.0579 118.128 15.2066H130V14.6364C130 8.93388 126.69 6.146 122.871 6.146C119.051 6.146 115.646 8.93388 115.646 14.6364C115.646 20.3388 119.338 23 123.157 23ZM118.128 13.0523C118.128 11.1515 119.37 8.45868 122.871 8.45868C126.372 8.45868 127.517 11.1515 127.517 13.0523H118.128Z"
                fill="#0D6A43"
              />
            </Svg>
          }
        </View>
        <View className="items-center my-12">
          <Svg
            width="313"
            height="285"
            viewBox="0 0 313 285"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G clip-path="url(#clip0_1_761)">
              <Path
                d="M286.462 163.225H283.138V199.874H286.462V163.225Z"
                stroke="#0D6A43"
                stroke-miterlimit="10"
              />
              <Path
                d="M143.82 115.097H8.3243C3.8991 115.097 0.311768 118.684 0.311768 123.109V191.881C0.311768 196.306 3.8991 199.893 8.3243 199.893H143.82C148.245 199.893 151.833 196.306 151.833 191.881V123.109C151.833 118.684 148.245 115.097 143.82 115.097Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M202.932 103.089C231.401 103.089 254.48 80.0116 254.48 51.5444C254.48 23.0772 231.401 0 202.932 0C174.463 0 151.384 23.0772 151.384 51.5444C151.384 80.0116 174.463 103.089 202.932 103.089Z"
                fill="#FFE7A3"
              />
              <Path
                d="M130.745 126.32H103.708C98.2597 126.32 93.8433 130.736 93.8433 136.184C93.8433 141.632 98.2597 146.048 103.708 146.048H130.745C136.193 146.048 140.609 141.632 140.609 136.184C140.609 130.736 136.193 126.32 130.745 126.32Z"
                fill="#F6B8BB"
              />
              <Path
                d="M128.194 143.554C132.155 143.554 135.365 140.343 135.365 136.383C135.365 132.423 132.155 129.213 128.194 129.213C124.234 129.213 121.023 132.423 121.023 136.383C121.023 140.343 124.234 143.554 128.194 143.554Z"
                fill="white"
              />
              <Path
                d="M266.028 173.918H263.073V199.968H266.028V173.918Z"
                stroke="#0D6A43"
                stroke-miterlimit="10"
              />
              <Path
                d="M195.082 139.302H151.745V151.26H195.082V139.302Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M205.058 151.26H161.722V163.219H205.058V151.26Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M291.899 199.893H160.026C153.345 199.893 147.929 205.308 147.929 211.989V272.592C147.929 279.273 153.345 284.688 160.026 284.688H291.899C298.58 284.688 303.996 279.273 303.996 272.592V211.989C303.996 205.308 298.58 199.893 291.899 199.893Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M238.418 187.485H195.082V199.444H238.418V187.485Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M226.727 175.184H183.39V187.142H226.727V175.184Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M216.75 163.225H173.414V175.184H216.75V163.225Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M138.495 63.8584V115.097H184.949V63.8584H138.495ZM181.214 108.619C181.214 109.398 180.905 110.145 180.354 110.696C179.803 111.246 179.056 111.556 178.277 111.556H144.924C144.145 111.556 143.398 111.246 142.847 110.696C142.296 110.145 141.987 109.398 141.987 108.619V71.2094C141.987 70.4306 142.296 69.6836 142.847 69.1329C143.398 68.5821 144.145 68.2728 144.924 68.2728H178.277C179.056 68.2728 179.803 68.5821 180.354 69.1329C180.905 69.6836 181.214 70.4306 181.214 71.2094V108.619Z"
                fill="#EB672E"
              />
              <Path
                d="M163.767 68.2915H159.702V113.408H163.767V68.2915Z"
                fill="#EB672E"
              />
              <Path
                d="M184.164 91.5167V87.4515H139.044V91.5167H184.164Z"
                fill="#EB672E"
              />
              <Path
                d="M281.068 182.497C281.068 182.497 254.736 169.404 252.385 152.395C250.035 135.386 283.294 67.9236 283.294 67.9236C283.294 67.9236 312.32 126.769 313.019 150.705C313.717 174.641 281.068 182.497 281.068 182.497Z"
                fill="#0D6A43"
              />
              <Path
                d="M265.343 188.707C265.343 188.707 239.01 175.614 236.66 158.605C234.309 141.596 267.594 74.1337 267.594 74.1337C267.594 74.1337 296.595 132.979 297.262 156.909C297.929 180.839 265.343 188.707 265.343 188.707Z"
                fill="#B1D9C9"
              />
              <Path
                d="M101.981 136.546C102 136.029 102.171 135.529 102.473 135.108C102.774 134.688 103.193 134.366 103.676 134.181C104.159 133.997 104.686 133.959 105.191 134.071C105.696 134.184 106.157 134.443 106.516 134.815C106.875 135.188 107.116 135.658 107.21 136.166C107.304 136.675 107.246 137.2 107.044 137.676C106.842 138.152 106.504 138.559 106.073 138.844C105.641 139.13 105.135 139.282 104.618 139.283C104.259 139.297 103.902 139.235 103.568 139.101C103.235 138.967 102.934 138.764 102.685 138.506C102.436 138.247 102.244 137.939 102.123 137.601C102.001 137.263 101.953 136.904 101.981 136.546ZM104.618 138.416C105.585 138.416 106.214 137.649 106.214 136.546C106.214 135.442 105.591 134.675 104.618 134.675C103.645 134.675 103.016 135.442 103.016 136.546C103.016 137.649 103.645 138.453 104.618 138.453V138.416Z"
                fill="white"
              />
              <Path
                d="M109.076 135.523V139.183H108.035V133.946H109.151L111.452 137.606V133.946H112.493V139.183H111.377L109.076 135.523Z"
                fill="white"
              />
              <Path
                d="M81.2227 221.061V245.246H90.0584C89.6404 244.004 89.0907 242.811 88.4184 241.686C87.5018 240.314 87.6827 235.788 93.5315 235.788C99.3803 235.788 99.0187 240.451 98.1021 241.399C97.1855 242.347 95.9134 245.233 95.9134 245.233H105.41V221.061H81.2227Z"
                fill="#FCE7E7"
              />
              <Path
                d="M105.41 229.621C106.655 229.204 107.851 228.652 108.977 227.975C110.348 227.065 114.869 227.246 114.869 233.094C114.869 238.942 110.211 238.581 109.257 237.664C108.303 236.748 105.416 235.47 105.416 235.47L105.41 229.621Z"
                fill="#FCE7E7"
              />
              <Path
                d="M90.3389 221.06C89.9206 219.818 89.3687 218.624 88.6928 217.5C87.7824 216.129 87.9632 211.602 93.8121 211.602C99.6609 211.602 99.293 216.266 98.3826 217.214C97.4723 218.161 96.1878 221.048 96.1878 221.048L90.3389 221.06Z"
                fill="#FCE7E7"
              />
              <Path
                d="M126.798 234.042H102.61V242.877C103.855 242.459 105.051 241.907 106.177 241.231C107.549 240.32 112.069 240.501 112.069 246.349C112.069 252.198 107.412 251.836 106.458 250.92C105.504 250.003 102.617 248.725 102.617 248.725V258.227H126.804L126.798 234.042Z"
                fill="#F6B8BB"
              />
              <Path
                d="M118.236 258.227C118.655 259.47 119.207 260.664 119.882 261.787C120.799 263.159 120.612 267.685 114.763 267.685C108.914 267.685 109.282 263.022 110.193 262.074C111.103 261.126 112.387 258.24 112.387 258.24L118.236 258.227Z"
                fill="#F6B8BB"
              />
              <Path
                d="M126.798 243.163C128.041 242.743 129.237 242.191 130.364 241.517C131.736 240.601 136.257 240.788 136.257 246.636C136.257 252.485 131.599 252.117 130.645 251.2C129.691 250.284 126.804 249.012 126.804 249.012L126.798 243.163Z"
                fill="#F6B8BB"
              />
              <Path
                d="M274.322 199.893C274.322 199.893 266.901 220.4 254.705 220.4C242.508 220.4 237.433 199.968 237.433 199.968C237.433 199.968 228.08 218.186 215.908 218.186C203.737 218.186 197.576 199.968 197.576 199.968C197.576 199.968 196.878 210.149 185.885 210.149C174.891 210.149 175.908 199.968 175.908 199.968V226.684"
                fill="white"
              />
              <Path
                d="M274.322 199.893C274.322 199.893 266.901 220.4 254.705 220.4C242.508 220.4 237.433 199.968 237.433 199.968C237.433 199.968 228.08 218.186 215.908 218.186C203.737 218.186 197.576 199.968 197.576 199.968C197.576 199.968 196.878 210.149 185.885 210.149C174.891 210.149 175.908 199.968 175.908 199.968V226.684"
                stroke="#1D1D1B"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
              <Path
                d="M175.883 244.18C177.649 244.18 179.082 243.122 179.082 241.817C179.082 240.512 177.649 239.454 175.883 239.454C174.116 239.454 172.684 240.512 172.684 241.817C172.684 243.122 174.116 244.18 175.883 244.18Z"
                stroke="#EB672E"
                stroke-miterlimit="10"
              />
              <Path
                d="M176.132 227.14C176.132 227.14 170.776 228.842 170.265 229.864C169.753 230.887 169.074 234.977 169.074 234.977L164.129 238.556C164.129 238.556 171.094 240.944 176.132 240.944"
                fill="#EC672E"
              />
              <Path
                d="M175.633 227.14C175.633 227.14 180.99 228.842 181.501 229.864C182.012 230.887 182.698 234.977 182.698 234.977L187.637 238.556C187.637 238.556 180.672 240.944 175.633 240.944"
                fill="#EC672E"
              />
              <Path
                d="M176.132 249.592V277.674"
                stroke="#EB672E"
                stroke-miterlimit="10"
              />
              <Path
                d="M187.637 245.146L212.846 270.348"
                stroke="#EB672E"
                stroke-miterlimit="10"
              />
              <Path
                d="M202.932 235.6H252.298"
                stroke="#EB672E"
                stroke-miterlimit="10"
              />
              <Path
                d="M264.551 95.0394C264.551 95.0394 246.169 139.856 246.169 153.523"
                stroke="#0D6A43"
                stroke-miterlimit="10"
              />
              <Path
                d="M205.058 122.86L184.949 115.097V63.8585L205.058 56.3516V122.86Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M44.3214 199.444C44.3214 199.444 89.5408 155.799 91.8043 153.523C94.0677 151.248 100.989 149.103 105.41 153.523C109.831 157.944 105.41 164.123 105.41 164.123L73.4222 195.435C73.4222 195.435 80.6304 196.47 82.8439 199.419L44.3214 199.444Z"
                fill="#FFE7A3"
              />
              <Path
                d="M118.143 122.86L138.252 115.097V63.8585L118.143 56.3516V122.86Z"
                fill="white"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M90.9313 160.899L96.4434 165.719C96.7938 166.024 97.2476 166.183 97.7116 166.163C98.1756 166.143 98.6144 165.946 98.9376 165.613L102.317 162.134L102.673 161.697C103.296 160.831 105.522 157.956 102.118 154.92C98.8815 152.04 95.109 155.282 95.109 155.282L90.9001 159.023C90.7683 159.142 90.6635 159.288 90.5927 159.451C90.522 159.614 90.4869 159.79 90.4899 159.968C90.4928 160.146 90.5337 160.321 90.6099 160.481C90.686 160.642 90.7956 160.785 90.9313 160.899Z"
                fill="white"
              />
              <Path
                d="M46.03 76.4594C46.03 76.4594 37.7493 85.1883 41.5467 90.8683C45.3441 96.5484 59.0683 76.4594 59.0683 76.4594"
                fill="#066942"
              />
              <Path
                d="M73.31 96.8788H62.2171C60.7954 75.5553 46.005 76.7586 46.005 76.7586C46.005 76.7586 47.8756 69.9999 58.5694 70.2992C68.1969 70.5798 72.5243 92.4271 73.31 96.8788Z"
                fill="#EFF8F4"
                stroke="black"
                stroke-miterlimit="10"
              />
              <Path
                d="M69.5313 96.8789C69.5313 96.8789 65.5905 70.7294 53.9427 70.692"
                stroke="#191919"
                stroke-miterlimit="10"
              />
              <Path
                d="M74.0707 96.8726L86.1737 96.9475L88.8799 94.7278C88.8799 94.7278 82.0209 89.7398 77.0325 90.4569C75.5636 92.3384 74.5499 94.5343 74.0707 96.8726Z"
                fill="#0D6A43"
              />
              <Path
                d="M49.6216 78.9159C49.6216 78.9159 43.8538 82.8439 42.9496 89.6587"
                stroke="#1D1D1B"
                stroke-miterlimit="10"
              />
              <Path
                d="M61.9552 96.8788C61.435 96.8772 60.9196 96.9782 60.4386 97.1761C59.9575 97.374 59.5202 97.6649 59.1518 98.0322C58.7834 98.3994 58.4911 98.8357 58.2916 99.3161C58.0922 99.7966 57.9895 100.312 57.9895 100.832V102.559C57.9877 105.452 59.0443 108.245 60.9603 110.412C62.8762 112.58 65.519 113.971 68.3902 114.324C68.8761 114.387 69.3656 114.418 69.8555 114.418H80.0567C80.5777 114.418 81.0983 114.387 81.6156 114.324C84.8309 113.944 87.7949 112.397 89.9454 109.977C92.0958 107.556 93.2831 104.431 93.2821 101.193C93.2821 100.049 92.8274 98.9517 92.0182 98.1425C91.209 97.3334 90.1115 96.8788 88.9671 96.8788H61.9552V96.8788Z"
                stroke="black"
                stroke-miterlimit="10"
              />
              <Path
                d="M76.9889 90.513C83.985 90.513 90.4886 95.9997 90.4886 95.9997C90.4886 95.9997 103.477 110.789 106.526 101.393C109.575 91.9969 93.7747 82.8003 85.8993 83.6358C78.024 84.4713 74.052 96.8726 74.052 96.8726"
                fill="#EFF8F4"
              />
              <Path
                d="M76.9889 90.513C83.985 90.513 90.4886 95.9997 90.4886 95.9997C90.4886 95.9997 103.477 110.789 106.526 101.393C109.575 91.9969 93.7747 82.8003 85.8993 83.6358C78.024 84.4713 74.052 96.8726 74.052 96.8726"
                stroke="black"
                stroke-width="0.96"
                stroke-miterlimit="10"
              />
              <Path
                d="M80.0692 86.6659C80.0692 86.6659 93.3008 85.899 105.553 102.422"
                stroke="#191919"
                stroke-miterlimit="10"
              />
            </G>
            <Defs>
              <ClipPath id="clip0_1_761">
                <Rect width="313" height="285" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
        </View>
        <View className="space-y-3 pb-6">
          <View className="mx-8">
            <Text className="text-lg text-ambiental">Correo</Text>
            <TextInput
              activeOutlineColor={theme.colors.comunitario}
              outlineColor={theme.colors.comunitario}
              autoCapitalize="none"
              outlineStyle={{ borderWidth: 2 }}
              style={{ backgroundColor: "white" }}
              onChangeText={(value) => actualizarEmail(value)}
              value={email}
              className=""
              placeholder={""}
              mode="outlined"
              textColor={theme.colors.ambiental}
            ></TextInput>
          </View>
          <View className="mx-8">
            <Text className="text-lg text-ambiental">Contraseña</Text>
            <TextInput
              textColor={theme.colors.ambiental}
              outlineStyle={{ borderWidth: 2 }}
              activeOutlineColor={theme.colors.comunitario}
              style={{ backgroundColor: "white" }}
              outlineColor={theme.colors.comunitario}
              autoCapitalize="none"
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  icon="eye"
                  color={theme.colors.ambiental}
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                />
              }
              onChangeText={(text) => actualizarContraseña(text)}
              value={password}
              underlineColor={theme.colors.deportivo}
              className=""
              placeholder={""}
              mode="outlined"
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity
          className="mx-8"
          onPress={() => {
            navigation.navigate("Registro");
          }}
        >
          <View className=" w-full rounded-full h-12 mb-4 items-center justify-center">
            <Text className="tracking-wide text-ambiental">
              No tengo cuenta todavía
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {spinner ? (
        <View className="h-[110%] w-full absolute items-center justify-center bg-[#27272a] opacity-70">
          <ActivityIndicator
            className=""
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            color="#0000ff"
            size="large"
          />
        </View>
      ) : null}
      <TouchableOpacity
        className=" absolute bottom-0 right-0"
        onPress={() => {
          console.log("Entrando al onpress"), setSpinner(true), handleSignIn();
        }}
      >
        <View className="m-8">
          <Svg
            width="48"
            height="24"
            viewBox="0 0 26 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.2929L19.3431 0.928934C18.9526 0.538409 18.3195 0.538409 17.9289 0.928934C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM-8.74228e-08 9L25 9L25 7L8.74228e-08 7L-8.74228e-08 9Z"
              fill="#086841"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
