import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as firebase from "firebase";

const PostRequest = ({uri, login, localUser}) => {


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
            marginTop:10,
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
            borderRadius:5,
            padding: 5,

        },
        contentWrapper:{
            display:'flex',
            flexDirection: 'row',
        },
        imageMessageContainer:{
            borderRadius: 50,

            padding:5,
            backgroundColor:'transparent',
        },
        messageImage:{
            width:30,
            height:30,
        },
        buttonHandler:{
            display:'flex',
            flexDirection:'row',
        },
    })


    const removeCallBack = async () =>{
        console.log('----------------')
        console.log('local = ' +localUser['login'])
        console.log('current = '+login)
        console.log('remove')
        console.log('----------------')
        await firebase.database().ref('Accounts/' + login+'/GetRequests').once('value', (snapshot) => {
            snapshot.forEach((elem)=>{
                if (elem.val()===localUser['login']){
                    firebase.database().ref('Accounts/' + login + '/GetRequests/'+elem.key).remove()
                }
            })
        });

        await firebase.database().ref('Accounts/' + localUser['login']+'/SendRequests').once('value', (snapshot) => {
            snapshot.forEach((elem)=>{
                if (elem.val()===login){
                    firebase.database().ref('Accounts/' + localUser['login'] + '/SendRequests/'+elem.key).remove()
                }
            })
        });

    }
    return (
        <View style={styles.Wrapper}>

                <Image style={styles.image} source={{uri: uri}}></Image>
                <View style={styles.text}>
                    <Text>{login}</Text>
                </View>



                <TouchableOpacity style={styles.imageMessageContainer} onPress={removeCallBack}>
                    <Image source={require('../../R/Images/minus.png')} style={styles.messageImage} />
                </TouchableOpacity>
        </View>
    );
};

export default PostRequest;
