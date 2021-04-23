import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Touchable} from "react-native-web";

const ButtonStylized = ({title,callback}) => {
    return (
        <TouchableOpacity onPress={callback} style={styles.opacity}>
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({

    opacity:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#118ece',
        borderRadius : 30,
        height: 50,
    },

});


export default ButtonStylized;
