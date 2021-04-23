import React, {useState} from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import LabeledEdit from "../LabeledEdit";
import * as ImagePicker from 'expo-image-picker'
import ButtonStylized from '../ButtonStylized'
import {render} from "react-dom";

const Register = () => {
    const RegisterCallback = () => {
        console.log(1)
    }
    const [image, setImage] = useState(null);

    const TakePhotoFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3,4],
            quality: 1,
        });
        if (!result.cancelled)
        setImage(result)
    }
    return (
        <View style={styles.registerContainer}>
                <View style={styles.wrap}>
                    <TouchableOpacity style={styles.Opacity} activeOpacity={0.5} onPress={TakePhotoFromGallery}>
                     <Image source={image ? image : require('../../R/Images/NoImage.png')} style={styles.Image}/>
                    </TouchableOpacity>
                </View>
            <LabeledEdit lableText='Логин: '/>
            <LabeledEdit lableText='Пароль: '/>
            <LabeledEdit lableText='Почта: '/>
            <ButtonStylized title='Регистрация' callback={RegisterCallback}/>

        </View>
    );
};
export default Register;

const styles = StyleSheet.create({
    wrap:{
        display: 'flex',
        alignItems: 'center',
    },
    Opacity: {
        alignItems: 'center',
        width: 100,

    },
    Image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    registerContainer: {

        height: 400,
        width: 280,
        backgroundColor: '#d3dce5',
        borderRadius: 30,
        padding: 10,
        display: 'flex',
        justifyContent: 'space-evenly',

    },

});
