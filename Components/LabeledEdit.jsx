import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const LabeledEdit = ({lableText}) => {
    return (
        <View style={styles.lineHandler}>
            <Text style={styles.text}>{lableText}</Text>
            <TextInput style={styles.RegisterTextInput}/>
        </View>
    );
};
const styles = StyleSheet.create({

    text:{
        flex:1,
    },
    RegisterTextInput:{
        backgroundColor: '#8d8d8d',
        borderRadius: 30,
        color:'#ffffff',
        padding: 5,
        flex:3,
        marginLeft: 5,

    },

    lineHandler:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',


    },
});

export default LabeledEdit;
