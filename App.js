import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import Register from './Components/authForm/Register'
import Auth from "./Components/authForm/Auth";
import BottomNavigator from "./Components/NavigatorMenu/BottomNavigator";
import Account from "./Components/MainActivities/Account";
import Map from "./Components/MainActivities/Map";
import Friends from "./Components/MainActivities/Friends";
import * as firebase from "firebase";
import WaitDialog from "./Components/OtherComponents/WaitDialog";
import SendHelpActivity from "./Components/MainActivities/SendHelpActivity";
import AnchoringActivity from "./Components/MainActivities/anchoringActivity";
import GettingHelpActivity from "./Components/MainActivities/GettingHelpActivity";


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


export default function App() {
    //сердечко программы

    const [FragmentController, ChangeFragmentState] = useState('Logo')
    const [localUser, setLocalUser] = useState(null)
    const [request, setRequest] = useState(null)



    const [loadingDialog, LoadingDialogController] = useState(false)

    const [textLoadingDialog, ChangeTextLoadingDialog] = useState('')

    useEffect(() => {
        if (FragmentController === 'Logo') {

            firebase.database().ref('Accounts/').once('value', (snapshot) => {
            });

            setTimeout(() => {
                ChangeFragmentState('Register')
            }, 5000)
        }
    })


    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>

            {FragmentController === 'Logo' && <Image style={styles.Logo} source={require('./R/Images/Logo.png')}/>}
            {FragmentController === 'Register' &&
            <Register setLocalUser={setLocalUser} stateChanger={ChangeFragmentState}
                      WaitDialogToggler={LoadingDialogController} WaitDialogTextChanger={ChangeTextLoadingDialog}/>}
            {FragmentController === 'Login' && <Auth setLocalUser={setLocalUser} stateChanger={ChangeFragmentState}/>}

            {FragmentController === 'Navigator' &&
            <BottomNavigator stateChanger={ChangeFragmentState} stateOfButtons={["default", "default", "default"]}/>}


            {FragmentController === 'Account' && <Account LocalUser={localUser} stateChanger={ChangeFragmentState}
                                                          ChangeTextLoadingDialog={ChangeTextLoadingDialog}
                                                          LoadingDialogController={LoadingDialogController}/>}
            {FragmentController === 'Account' &&
            <BottomNavigator stateChanger={ChangeFragmentState} stateOfButtons={["active", "default", "default"]}/>}

            {FragmentController === 'Map' &&
            <Map setRequest={setRequest} LocalUser={localUser} stateChanger={ChangeFragmentState}
                 WaitDialogToggler={LoadingDialogController} WaitDialogTextChanger={ChangeTextLoadingDialog}/>}
            {FragmentController === 'Map' &&
            <BottomNavigator stateChanger={ChangeFragmentState} stateOfButtons={["default", "active", "default"]}/>}

            {FragmentController === 'Friends' &&
            <Friends stateChanger={ChangeFragmentState} ChangeTextLoadingDialog={ChangeTextLoadingDialog}
                     LoadingDialogController={LoadingDialogController} LocalUser={localUser}/>}
            {FragmentController === 'Friends' &&
            <BottomNavigator stateChanger={ChangeFragmentState} stateOfButtons={["default", "default", "active"]}/>}

            {FragmentController === 'SendHelp' &&
            <SendHelpActivity stateChanger={ChangeFragmentState} LocalUser={localUser}
                              ChangeTextLoadingDialog={ChangeTextLoadingDialog}
                              LoadingDialogController={LoadingDialogController}/>}

            {FragmentController === 'Anchoring' &&
            <AnchoringActivity setRequest={setRequest} request={request} stateChanger={ChangeFragmentState}
                               LocalUser={localUser} ChangeTextLoadingDialog={ChangeTextLoadingDialog}
                               LoadingDialogController={LoadingDialogController}/>}

            {FragmentController === 'GettingHelp' &&
            <GettingHelpActivity stateChanger={ChangeFragmentState} LocalUser={localUser}
                                 ChangeTextLoadingDialog={ChangeTextLoadingDialog}
                                 LoadingDialogController={LoadingDialogController}/>}


            {loadingDialog === true && <WaitDialog text={textLoadingDialog}/>}
        </View>
    );
}


const styles = StyleSheet.create({
    Logo: {
        width: 300,
        height: 300,
    },
    container: {
        flex: 1,
        backgroundColor: '#118ece',
        alignItems: 'center',
        justifyContent: 'center',

    },
});
