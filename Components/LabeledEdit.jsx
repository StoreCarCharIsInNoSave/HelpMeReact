import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const LabeledEdit = ({lableText, onChangeSetCallback, val, isPassword}) => {
    return (
        <View style={styles.lineHandler}>
            <Text style={styles.text}>{lableText}</Text>
            <TextInput secureTextEntry={isPassword} value={val}  style={styles.RegisterTextInput} onChangeText={(text)=> onChangeSetCallback(text)}/>
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
        borderWidth: 2,
        borderColor: 'black',
        borderStyle:'solid',
    },

    lineHandler:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',


    },
});

export default LabeledEdit;
