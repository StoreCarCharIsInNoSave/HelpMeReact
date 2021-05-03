import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const NavigatorButton = ({imageWidth,imageHeight,image, clickImage,text, status, stateName, stateChanger}) => {

    const stateHandler = {
        "active":clickImage,
        "default":image,
    }

    const styles = StyleSheet.create({
        wrapper:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
        },
        img:{
            height:imageHeight,
            width:imageWidth,
        },
    });

    return (
        <TouchableOpacity onPress={()=>stateChanger(stateName)}>
            <View style={styles.wrapper}>
                <Image style={styles.img} source={stateHandler[status]}/>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default NavigatorButton;
