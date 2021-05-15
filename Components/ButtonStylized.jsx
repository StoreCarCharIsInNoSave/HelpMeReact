import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Touchable} from "react-native-web";

const ButtonStylized = ({title,callback,bgColor, height, textColor, width, marginTop}) => {

    const styles = StyleSheet.create({
        opacity:{
            backgroundColor: bgColor,
            justifyContent:'center',
            alignItems:'center',
            borderRadius : 30,
            height: height,
            width:width,
            marginTop:marginTop,
        },
    });
    return (
        <TouchableOpacity  onPress={callback} style={styles.opacity}>
            <Text style={{color:textColor}}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};



export default ButtonStylized;
