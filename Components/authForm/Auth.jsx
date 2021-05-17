import React, {useState} from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import LabeledEdit from "../LabeledEdit";
import * as ImagePicker from 'expo-image-picker'
import ButtonStylized from '../ButtonStylized'
import {render} from "react-dom";
import * as firebase from "firebase";

const Register = ({stateChanger, setLocalUser}) => {

    const [image, setImage] = useState(null);

    const TakePhotoFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result)
            setProfileImage(result['uri'])
        }

    }


    const firebaseConfig = {
        apiKey: "AIzaSyAEbjw0nZzw8j7llIBP4flr0mn9LYwJHrk",
        authDomain: "helpmereact.firebaseapp.com",
        databaseURL: "https://helpmereact-default-rtdb.firebaseio.com",
        projectId: "helpmereact",
        storageBucket: "helpmereact.appspot.com",
        messagingSenderId: "816683669236",
        appId: "1:816683669236:web:cc7d24325532f0d75430a1",
        measurementId: "G-9P9WDB0WE9"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }


    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const LoginWithLoginAndPassword = async () => {
        if (!!login.trim()){
            let accountSnap;
            await firebase.database().ref('Accounts/' + login).once('value', (snapshot) => {
                accountSnap = snapshot.val()
            });
            if (accountSnap) {
                if (password === accountSnap['Auth']['password']) {
                    setLocalUser({
                        login: login,
                        password: password,
                        email: accountSnap['Auth']['email'],
                        code: accountSnap['Auth']['code'],
                    })
                    stateChanger('Account')
                } else {
                    alert("Ошибка, проверьте верность введенных данных!")
                    console.log(accountSnap['Auth']['password']);
                }
            } else {
                alert("Ошибка, проверьте верность введенных данных!")
            }
        }else{
            alert("Ошибка, проверьте верность введенных данных!")

        }

    }


    return (
        <View style={styles.registerContainer}>
            <View style={styles.wrap}>
                <Text style={{paddingBottom: 10}}>Авторизация</Text>
            </View>
            <LabeledEdit onChangeSetCallback={setLogin} lableText='Логин : '/>
            <LabeledEdit isPassword={true} onChangeSetCallback={setPassword} lableText='Пароль: '/>
            <ButtonStylized title='Войти' height={50} textColor={'white'} bgColor={'#118ece'}
                            callback={LoginWithLoginAndPassword}/>
            <ButtonStylized title='Нет аккаунта? зарегестрируйтесь!' textColor={'#000000'} callback={() => stateChanger('Register')}/>
        </View>
    );
};
export default Register;

const styles = StyleSheet.create({

    wrap: {
        display: 'flex',
        alignItems: 'center',
    },
    Opacity: {
        alignItems: 'center',
        width: 100,

    },
    Image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    registerContainer: {

        height: 300,
        width: 280,
        backgroundColor: '#d3dce5',
        borderRadius: 30,
        padding: 10,
        display: 'flex',
        justifyContent: 'space-evenly',

    },

});
