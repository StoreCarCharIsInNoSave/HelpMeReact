import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

const WaitDialog = ({text}) => {

    const styles = StyleSheet.create({
        dialog:{
            width:300,
            minHeight:300,
            backgroundColor:'#384b5f',
            position:'relative',
            borderRadius:20,
            display:'flex',
            padding:20,
            borderWidth: 2,
            borderColor: 'white',
            borderStyle:'solid',
            alignItems: 'center',

        },
        wrapper:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            top:0,
            bottom:0,
            left:0,
            right:0,
            backgroundColor:'rgba(0,0,0,0.7)',
            position:'absolute',
        },
        text:{
            color:'white',
            fontSize:20,
            textAlign:'center',
        },
        image:{
            marginTop:20,
            width:150,
            height:150,
        },


    })


    return (
        <View style={styles.wrapper}>
            <View style={styles.dialog}>
                <Text style={styles.text}>{text}</Text>
                <Image style={styles.image} source={require('../../R/Images/Loading.gif')}></Image>
            </View>
        </View>
    );
};

export default WaitDialog;
