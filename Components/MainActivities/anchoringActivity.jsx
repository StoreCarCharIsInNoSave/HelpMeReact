import React, {Fragment, useEffect, useState} from 'react';
import {Clipboard, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {RadioButton} from "react-native-paper";
import ButtonStylized from "../ButtonStylized";
import * as firebase from "firebase";

const AnchoringActivity = ({LocalUser, request, stateChanger, setRequest, ChangeTextLoadingDialog, LoadingDialogController}) => {


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
            minHeight: 420,
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

    })
    const [profileImage, SetProfileImage] = useState(null)
    const [profile, SetProfile] = useState(null)
    useEffect(() => {
        ChangeTextLoadingDialog('Загрузка данных')
        LoadingDialogController(true)
        let imageRef = firebase.storage().ref('ProfileImages/' + request['login']);
        imageRef.getDownloadURL().then((url) => {
            SetProfileImage(url)
            LoadingDialogController(false)
        })
        firebase.database().ref('Accounts/' + request['login']).once('value', (snapshot) => {
            SetProfile(snapshot.val()['Auth'])
        });
    }, [])

    const ToHelp = () =>{
        if (request.status!='unbusy') {
            ToastAndroid.showWithGravity("Данному пользователю уже помогают.", ToastAndroid.LONG, ToastAndroid.BOTTOM)
            return
        }
        firebase.database().ref('Accounts/' + profile.login + '/Request').update({status:LocalUser.login})
        ToastAndroid.showWithGravity("Вы успешно закрепились за пользователем.", ToastAndroid.LONG, ToastAndroid.BOTTOM)
        stateChanger('Map')
        return
    }
    return (
        <View style={styles.Wrapper}>
            <View style={styles.backWrap}>
                <TouchableOpacity onPress={() => {
                    stateChanger('Map')
                }} style={styles.helpWrap}>
                    <Image style={styles.back} source={require('../../R/Images/back.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.background}>
                {profileImage && <Image style={styles.imageProfile} source={{uri: profileImage}}></Image>}

                {profile &&
                <Fragment>
                    <Text style={styles.header}>Логин</Text>
                    <Text>{profile.login}</Text>
                    <Text style={styles.header}>Дата создания запроса</Text>
                    <Text>{request.date}</Text>
                    <Text style={styles.header}>Время создания запроса</Text>
                    <Text>{request.time}</Text>
                    <Text style={styles.header}>Код</Text>
                    <View style={styles.codeWrapper}>
                        <Text>{profile.code}</Text>
                        <TouchableOpacity onPress={() => {
                            Clipboard.setString(profile.code)
                            ToastAndroid.showWithGravity("Код успешно скопирован!", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                        }} style={styles.copyWrapper}>
                            <Image style={styles.copyImg} source={require('../../R/Images/copy.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.header}>Занятость</Text>
                    {request.status === 'unbusy' ? <Text key={1}>Не занят</Text> :
                        <Text key={2} style={{color: 'red'}}> Закреплен за {request.status}</Text>}

                    <Text style={styles.header}>Серьезность ситцации</Text>
                    {
                        (request.level === 'easy') ? <Text key={3} style={{color: 'green'}}>Не серьезная</Text> :
                            (request.level === 'medium') ? <Text key={4} style={{color: 'yellow'}}>Обычная</Text> :
                                (request.level === 'hard') && <Text key={5} style={{color: 'red'}}>Серьезная</Text>
                    }
                    <Text style={styles.header}>Описание</Text>
                    <Text>{request.situation}</Text>
                    <ButtonStylized style={{marginTop:30}} width={200} height={50} bgColor={'#118ece'} marginTop={20} textColor={'white'} title={'Помочь'} callback={()=>{ToHelp()}}></ButtonStylized>
                </Fragment>}
            </View>
        </View>
    );
};

export default AnchoringActivity;
