import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const UserHandler = ({uri, login}) => {


    const styles = StyleSheet.create({
        Wrapper: {
            width: '100%',
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
    })

    return (
        <View style={styles.Wrapper}>

                <Image style={styles.image} source={{uri: uri}}></Image>
                <View style={styles.text}>
                    <Text>{login}</Text>
                </View>

            <TouchableOpacity style={styles.imageMessageContainer}>
                <Image source={require('../../R/Images/chat.png')} style={styles.messageImage} />
            </TouchableOpacity>
        </View>
    );
};

export default UserHandler;
