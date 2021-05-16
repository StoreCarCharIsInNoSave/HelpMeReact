import React, {Fragment, useEffect, useState} from 'react';
import {Clipboard, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {RadioButton} from "react-native-paper";
import ButtonStylized from "../ButtonStylized";
import * as firebase from "firebase";
import * as ELocation from "expo-location";

const GettingHelpActivity = ({
                                 LocalUser,
                                 stateChanger,
                                 ChangeTextLoadingDialog,
                                 LoadingDialogController
                             }) => {

    const [helpUser, SetHelpUser] = useState(null)
    const [image, SetImage] = useState(null)
    useEffect(() => {
        (async () => {
            ChangeTextLoadingDialog('Загрузка профиля')
            LoadingDialogController(true)
            firebase.database().ref('Accounts/' + LocalUser['login'] + '/Request').once('value', (snapshot) => {
                firebase.database().ref('Accounts/' + snapshot.val()['status'] + '/Auth').once('value', (sn) => {
                    SetHelpUser(sn.val())

                    firebase.storage().ref('ProfileImages/' + sn.val()['login']).getDownloadURL().then((url) => {
                        SetImage(url)
                        LoadingDialogController(false)
                        console.log(image)
                    })
                });
            });
        })();
    }, []);


    const styles = StyleSheet.create({
        Wrapper: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        backWrap: {
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black',
            borderStyle: 'solid',
            width: 50,
            height: 50,
            padding: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 25,
            left: 15,
        },
        back: {
            width: 30,
            height: 30,
        },
        background: {
            backgroundColor: 'white',
            width: 300,
            minHeight: 390,
            borderRadius: 25,
            padding: 20,
            alignItems: 'center',
        },
        situation: {
            backgroundColor: '#848484',
            borderRadius: 20,
            padding: 10,
            maxHeight: 300,
            color: 'white',
        },
        group: {
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        item: {
            display: 'flex',
            alignItems: 'center',
        },
        buttonWrapper: {
            marginTop: 10,
            alignItems: 'center',
        },
        imageProfile: {
            width: 100,
            height: 100,
            borderRadius: 50,
        },
        header: {
            color: '#9c9c9c',
            marginTop: 5,
        },
        copyWrapper: {
            width: 30,
            height: 30,
            marginLeft: 5,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
        },
        copyImg: {
            height: 20,
            width: 20,

        },
        codeWrapper: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 100,
        },
        title: {
            fontSize: 25,
        },
        line: {
            flexDirection: 'row',
            width: 250,
            justifyContent: 'space-around',
        },

    })


    return (
        <View style={styles.Wrapper}>
            <View style={styles.background}>
                <Text style={styles.title}>Вам помогает</Text>
                {image && <Image style={styles.imageProfile} source={{uri: image}}></Image>}
                {helpUser && <Fragment>
                    <Text style={styles.header}>Логин пользователя</Text>
                    <Text>{helpUser.login}</Text>
                    <Text style={styles.header}>Количество сессий</Text>
                    <Text>{helpUser.sessions}</Text>
                    <Text style={styles.header}>Код</Text>
                    <View style={styles.codeWrapper}>
                        <Text>{helpUser.code}</Text>
                        <TouchableOpacity onPress={() => {
                            Clipboard.setString(helpUser.code)
                            ToastAndroid.showWithGravity("Код успешно скопирован!", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                        }} style={styles.copyWrapper}>
                            <Image style={styles.copyImg} source={require('../../R/Images/copy.png')}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line}>
                        <ButtonStylized width={100} height={50} bgColor={'#ff0000'} marginTop={10} textColor={'white'}
                                        title={'Отменить'} callback={() => {


                        }}></ButtonStylized>
                        <ButtonStylized width={100} height={50} bgColor={'#60ff00'} marginTop={10} textColor={'black'}
                                        title={'Завершить'} callback={() => {


                        }}></ButtonStylized>
                    </View>


                </Fragment>}


            </View>
        </View>
    );
};

export default GettingHelpActivity;
