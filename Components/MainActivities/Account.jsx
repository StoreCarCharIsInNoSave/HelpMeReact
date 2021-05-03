import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Clipboard} from "react-native";
import BottomNavigator from "../NavigatorMenu/BottomNavigator";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import LabeledEdit from "../LabeledEdit";
import ButtonStylized from "../ButtonStylized";
import LabeledLabel from "../LabeledLabel";
import {Toast} from "native-base";
import {Share} from "react-native"
const Account = ({stateChanger, LoadingDialogController, ChangeTextLoadingDialog, LocalUser}) => {

    const [profileImage, setProfileImage] = useState(null)


    const TakePhotoFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            ChangeTextLoadingDialog('Загрузка изображения на сервер, подождите пожалуйста...')
            LoadingDialogController(true)
            const response = await fetch(result['uri'])
            const blob = await response.blob()
            let ref = firebase.storage().ref().child('ProfileImages/' + LocalUser['login'])
            await ref.put(blob)
            setProfileImage(result['uri'])
            LoadingDialogController(false)
        }

    }

    useEffect(() => {
        console.log('CALL')
        ChangeTextLoadingDialog('Загрузка профиля, подождите пожалуйста...')
        LoadingDialogController(true)
        let imageRef = firebase.storage().ref('ProfileImages/' + LocalUser['login']);
        imageRef.getDownloadURL().then((url) => {
            setProfileImage(url)
            LoadingDialogController(false)
        })
    }, [profileImage])


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
        firebase.app();
    }


    const styles = StyleSheet.create({
        Wrapper: {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        ProfileHandler: {
            width: 300,
            height: 400,
            backgroundColor: '#ffffff',
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            padding: 10,
            justifyContent: 'space-evenly',

        },
        Image: {
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'grey',
        },
        Touch: {
            width: 100,
            height: 100,
            borderRadius: 50,
        },
        changeButton: {
            position: 'absolute',
            bottom: 10,

        },
        code: {
            flexDirection: 'row',

        },
        imageCopy: {
            width: 45,
            height: 45,
            borderWidth: 2,

        },
        ImageWrapper: {
            borderWidth: 2,
            borderColor: 'black',
            borderStyle: 'solid',
            borderRadius: 50,
            padding: 5,
        },
        container: {
            display:'flex',
            flexDirection: 'row',
            width:'100%',
            justifyContent:'space-evenly',

        },

    })

    const CopyToClipBoard = () => {
        Clipboard.setString(LocalUser.code)
        ToastAndroid.showWithGravity("Ваш код успешно скопирован!", ToastAndroid.LONG, ToastAndroid.BOTTOM)
    }


    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Привет, скопируй этот код и введи его во вкладку Friends, для добавления меня в друзья.\n(Отправлено из HelpMe!)\n'+LocalUser.code,

            });
            if (result.action === Share.SharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <View style={styles.Wrapper}>
            <View style={styles.ProfileHandler}>
                <Text>Ваш аккаунт</Text>
                <TouchableOpacity style={styles.Touch} onPress={TakePhotoFromGallery}>
                    <Image source={{uri: profileImage}} style={styles.Image}></Image>
                </TouchableOpacity>
                <LabeledLabel lableText="Логин: " text={LocalUser.login}/>
                <LabeledLabel lableText="Почта: " text={LocalUser.email}/>
                <LabeledLabel lableText="Ваш код: " text={LocalUser.code}/>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.ImageWrapper} onPress={() => CopyToClipBoard()}>
                        <Image style={styles.imageCopy} source={require('../../R/Images/copy.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ImageWrapper} onPress={onShare}>
                        <Image style={styles.imageCopy} source={require('../../R/Images/Share.png')}></Image>
                    </TouchableOpacity>
                </View>


            </View>


        </View>
    );
};

export default Account;
