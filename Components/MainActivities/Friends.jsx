import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from "react-native";
import BottomNavigator from "../NavigatorMenu/BottomNavigator";
import SearchBar from "./SearchBar";
import UserHandler from "./UserHandler";
import ScrollViewBase from "react-native-web/dist/exports/ScrollView/ScrollViewBase";
import * as firebase from "firebase";
import GetRequest from "./GetRequest";
import PostRequest from "./PostRequest";

const Account = ({stateChanger, LocalUser, ChangeTextLoadingDialog, LoadingDialogController}) => {


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



    const [sendRequests, setSendRequests] = useState([])
    const [getRequests, setGetRequests] = useState([])
    const [friends, setFriends] = useState([])

    const [friendCode, setFriendCode] = useState('')
    const styles = StyleSheet.create({
        Wrapper: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        FriendsHandler: {
            width: 300,
            height: 500,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            display: 'flex',
            alignItems: 'center',
        },
        scrollView: {
            paddingRight: 25,
        },
        NameHandler: {
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
        },
    })

    useEffect( () => {

        ChangeTextLoadingDialog('Идет загрузка списка друзей, подождите пожалуйста...')
        LoadingDialogController(true)
         firebase.database().ref('Accounts/' + LocalUser.login + '/SendRequests').on('value', (snapshot) => {
            setSendRequests([])
            snapshot.forEach(function (request) {
                firebase.storage().ref('ProfileImages/' + request.val()).getDownloadURL().then((uri) => {
                    setSendRequests(prev => [...prev, {login: request, uri: uri}])
                })
            })
        });

         firebase.database().ref('Accounts/' + LocalUser.login + '/GetRequests').on('value', (snapshot) => {
            setGetRequests([])
            snapshot.forEach(function (request) {
                firebase.storage().ref('ProfileImages/' + request.val()).getDownloadURL().then((uri) => {
                    setGetRequests(prev => [...prev, {login: request, uri: uri}])
                })
            })
        });

         firebase.database().ref('Accounts/' + LocalUser.login + '/Friends').on('value', (snapshot) => {
            setFriends([])
            snapshot.forEach(function (request) {
                firebase.storage().ref('ProfileImages/' + request.val()).getDownloadURL().then((uri) => {
                    setFriends(prev => [...prev, {login: request, uri: uri}])
                })
            })
            LoadingDialogController(false)
        });


    }, [])


    const onChange = (text) => {
        setFriendCode(text)
    }

    const onSearch = async () => {
        let isFounded = false;
        ChangeTextLoadingDialog('Поиск профиля...')
        LoadingDialogController(true)

        await firebase.database().ref('Accounts/').once('value', (snapshot) => {
            snapshot.forEach(async function  (childSnapshot) {
                if (friendCode===LocalUser.code)  return
                if (friendCode === childSnapshot.val()['Auth']['code']) {
                    LoadingDialogController(false)
                    isFounded = true
                    await firebase.database().ref('Accounts/' + LocalUser.login + '/SendRequests').once('value',(snapshot=>{
                        console.log(snapshot.exists())
                        if (!snapshot.exists()){
                            firebase.database().ref('Accounts/' + childSnapshot.key + '/GetRequests').push(LocalUser.login)
                            firebase.database().ref('Accounts/' + LocalUser.login + '/SendRequests').push(childSnapshot.key)
                            ToastAndroid.showWithGravity("Запрос успешно отправлен.", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                        }else{
                            ToastAndroid.showWithGravity("Заявка уже существует.", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                        }
                    }))

                }
            });
        });
        if (!isFounded) {
            LoadingDialogController(false)
            ToastAndroid.showWithGravity("Пользователь не найден.", ToastAndroid.LONG, ToastAndroid.BOTTOM)
        }
    }
    return (
        <View style={styles.Wrapper}>
            <View style={styles.FriendsHandler}>
                <SearchBar onSearch={onSearch} onChangeSetCallback={onChange}/>

                <ScrollView style={styles.scrollView}>
                    {sendRequests.length!=0 ? <View style={styles.NameHandler}><Text>Исходящие заявки</Text></View>:()=>{}}
                    {sendRequests && sendRequests.map((userData) => {
                        return <PostRequest localUser={LocalUser} uri={userData['uri']} login={userData['login'].val()}/>
                    })}
                    {getRequests.length!=0 ? <View style={styles.NameHandler}><Text>Входящие заявки</Text></View>:()=>{}}
                    {getRequests && getRequests.map((userData) => {
                        return <GetRequest localUser={LocalUser} uri={userData['uri']}  login={userData['login'].val()}/>
                    })}
                    {friends.length!=0 ? <View style={styles.NameHandler}><Text>Ваши друзья</Text></View>:()=>{}}
                    {friends && friends.map((userData) => {
                        return <UserHandler localUser={LocalUser} uri={userData['uri']}  login={userData['login'].val()}/>
                    })}


                </ScrollView>

            </View>
        </View>
    );
};

export default Account;
