import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const LabeledEdit = ({lableText, text}) => {
    return (
        <View style={styles.lineHandler}>
            <Text style={styles.text}>{lableText}</Text>
            <Text  style={styles.RegisterTextInput} >{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    text:{
        flex:1,
    },
    RegisterTextInput:{

        borderRadius: 30,
        color:'#000000',
        padding: 5,
        flex:3,
        marginLeft: 5,
        borderWidth: 2,
        borderColor: 'black',
        borderStyle:'solid',
        height:40,
        textAlignVertical:'center',
    },

    lineHandler:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
    },
});

export default LabeledEdit;
