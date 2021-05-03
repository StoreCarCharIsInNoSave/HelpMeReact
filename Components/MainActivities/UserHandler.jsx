import React from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import * as firebase from "firebase";

const UserHandler = ({uri, login, localUser}) => {


    const styles = StyleSheet.create({
        Wrapper: {
            width: 260,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#cdcdcd',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        image: {
            width: 50,
            height: 50,
            borderRadius: 50,

        },
        text: {

            backgroundColor: 'white',
            minHeight: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            padding: 5,

        },
        contentWrapper: {
            display: 'flex',
            flexDirection: 'row',
        },
        imageMessageContainer: {
            borderRadius: 50,

            padding: 5,
            backgroundColor: 'transparent',
        },
        messageImage: {
            width: 30,
            height: 30,
        },
        buttonsHandler: {
            display: 'flex',
            flexDirection: 'row',

        }
    })
    const StartChat = () => {
        ToastAndroid.showWithGravity("Возможно эта кнопка будет что-то делать, но я так не думаю...", ToastAndroid.LONG, ToastAndroid.BOTTOM)
    }

    const removeCallBack = async () =>{
            Alert.alert(
                "Удаление пользователя",
                "Вы действительно хотите удалить этого пользователя из списка друзей?\nЭто действие необратимо!",
                [
                    {
                        text: "Нет",
                        onPress: () => {},
                        style: "cancel"
                    },
                    { text: "Да", onPress:async () => {

                            await firebase.database().ref('Accounts/' + localUser['login']+'/Friends').once('value', (snapshot) => {
                                snapshot.forEach((elem)=>{
                                    if (elem.val()===login){
                                        firebase.database().ref('Accounts/' + localUser['login'] + '/Friends/'+elem.key).remove()
                                    }
                                })
                            });
                            await firebase.database().ref('Accounts/' + login+'/Friends').once('value', (snapshot) => {
                                snapshot.forEach((elem)=>{
                                    if (elem.val()===localUser['login']){
                                        firebase.database().ref('Accounts/' + login + '/Friends/'+elem.key).remove()
                                    }
                                })
                            });
                        }}
                ]
            );
    }


    return (
        <View style={styles.Wrapper}>

            <Image style={styles.image} source={{uri: uri}}></Image>
            <View style={styles.text}>
                <Text>{login}</Text>
            </View>

            <View style={styles.buttonsHandler}>
                <TouchableOpacity onPress={StartChat} style={styles.imageMessageContainer}>
                    <Image source={require('../../R/Images/chat.png')} style={styles.messageImage}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={removeCallBack} style={styles.imageMessageContainer}>
                    <Image source={require('../../R/Images/minus.png')} style={styles.messageImage}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserHandler;
