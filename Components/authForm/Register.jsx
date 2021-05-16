import React, {useState} from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import LabeledEdit from "../LabeledEdit";
import * as ImagePicker from 'expo-image-picker'
import ButtonStylized from '../ButtonStylized'
import {render} from "react-dom";
import * as firebase from "firebase";
import Auth from "./Auth";
import WaitDialog from "../OtherComponents/WaitDialog";
import Validate from "./Validate";

const Register = ({stateChanger, WaitDialogTextChanger, WaitDialogToggler, setLocalUser}) => {

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

    let validPassword = false;
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [profileImageUri, setProfileImage] = useState('')
    const [lengthState, setLengthState] = useState(false)
    const [bigLetState, setBigLetState] = useState(false)
    const [haveANumState, setHaveANumState] = useState(false)

    const RegisterWithEmailAndPassword = async () => {

        function generateString(length) {
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function TestLogin(login) {
            if (/^[a-zA-Z1-9]+$/.test(login) === false) return false;
            if (login.length < 4 || login.length > 12) return false;
            if (parseInt(login.substr(0, 1))) return false;
            return true;
        }
        function TestEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if (!TestLogin(login)) {
            alert("Ошибка, введенный вами логин не подходит");
            return
        }
        if (!TestEmail(email)){
            alert('Ошибка, введенный вами адрес почты не подходит')
            return
        }
        if (!lengthState || !bigLetState || !haveANumState){
            alert('Ошибка, введенный вами пароль не подходит')
            return
        }
        if (!profileImageUri){
            alert("Ошибка, загрузите пожалуйста фотографию")
            return
        }

        let accountSnap;
        console.log('accountSnap | started')
        await firebase.database().ref('Accounts/' + login).once('value', (snapshot) => {
            accountSnap = snapshot.val()
        });
        console.log('accountSnap | ended')
        if (!accountSnap) {
            let user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
                alert(error.message)
            });
            if (user) {
                WaitDialogTextChanger('Запущен процесс регистрации, подождите немного...')
                WaitDialogToggler(true)
                let code = generateString(6)
                await firebase.database().ref('Accounts/' + login + '/Auth').set({email, login, password, code})
                const response = await fetch(profileImageUri)
                const blob = await response.blob()
                let ref = firebase.storage().ref().child('ProfileImages/' + login)
                await ref.put(blob)
                WaitDialogToggler(false)
                setLocalUser({
                    login: login,
                    password: password,
                    email: email,
                    code: code,
                    sessions:0,
                })
                stateChanger('Account')
            }
        } else {
            alert('The email address or login is already in use by another account')
        }
    }

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
            height: 500,
            width: 280,
            backgroundColor: '#d3dce5',
            borderRadius: 30,
            padding: 10,
            display: 'flex',
            justifyContent: 'space-evenly',

        },
        validateContainer: {
            display: 'flex',
            alignItems: 'flex-end',
        },

    });




    const ValidatePassword = (localPassword) => {
        setPassword(localPassword)
        if (/(?=.*[0-9])/.test(localPassword)) {
            setHaveANumState(true)
        } else {
            setHaveANumState(false)
        }

        if (/(?=.*[A-Z])/.test(localPassword)) {
             setBigLetState(true)
        } else {
            setBigLetState(false)
        }

        if (/[0-9a-zA-Z]{6,}/.test(localPassword)) {
            setLengthState(true)
        } else {
            setLengthState(false)
        }
    }

    return (
        <View>
            <View style={styles.registerContainer}>
                <View style={styles.wrap}>
                    <Text style={{paddingBottom: 30}}>Регистрация</Text>
                    <TouchableOpacity style={styles.Opacity} activeOpacity={0.5} onPress={TakePhotoFromGallery}>
                        <Image source={image ? image : require('../../R/Images/NoImage.png')} style={styles.Image}/>
                    </TouchableOpacity>
                </View>
                <LabeledEdit onChangeSetCallback={setLogin} lableText='Логин: '/>
                <LabeledEdit onChangeSetCallback={setEmail} lableText='Почта: '/>
                <LabeledEdit isPassword={true} onChangeSetCallback={ValidatePassword} lableText='Пароль: '/>
                <View style={styles.validateContainer}>
                    <Validate text={'Длина больше 6 символов'} status={lengthState}/>
                    <Validate text={'Есть большая буква'} status={bigLetState}/>
                    <Validate text={'Есть число'} status={haveANumState}/>
                </View>


                <ButtonStylized title='Регистрация' height={50} textColor={'white'} bgColor={'#118ece'}
                                callback={RegisterWithEmailAndPassword}/>
                <ButtonStylized title='Есть аккаунт? Авторизируйтесь!' textColor={'#000000'}
                                callback={() => stateChanger('Login')}/>

            </View>

        </View>


    );
};
export default Register;


