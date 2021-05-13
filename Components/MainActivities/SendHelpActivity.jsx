import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import * as ELocation from "expo-location";
import {CheckBox} from "native-base";
import RadioButtonGroup from "react-native-paper/src/components/RadioButton/RadioButtonGroup";
import {RadioButton} from "react-native-paper";
import ButtonStylized from "../ButtonStylized";
import * as firebase from "firebase";

const SendHelpActivity = ({LocalUser, stateChanger, ChangeTextLoadingDialog, LoadingDialogController}) => {

    const styles = StyleSheet.create({
        Wrapper: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        backWrap: {
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black',
            borderStyle: 'solid',
            width: 50,
            height: 50,
            padding: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 25,
            left: 15,
        },
        back: {
            width: 30,
            height: 30,
        },
        background: {
            backgroundColor: 'white',
            width: 300,
            minHeight: 220,
            borderRadius: 25,
            padding: 20,
        },
        situation: {
            backgroundColor: '#848484',
            borderRadius: 20,
            padding: 10,
            maxHeight: 300,
            color: 'white',
        },
        group: {
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        item: {
            display: 'flex',
            alignItems: 'center',
        },
        buttonWrapper: {
            marginTop: 10,
            alignItems: 'center',
        },
    })
    const [location, setLocation] = useState(null);
    const [lat, setLatitude] = useState(null);
    const [long, setLongitude] = useState(null);
    const [text, setText] = useState('')
    useEffect(() => {
        (async () => {
            let {status} = await ELocation.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.showWithGravity("Ошибка, неполучилось получить ваше местоположение", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                stateChanger('Account')
                return;
            }
            let location = await ELocation.getCurrentPositionAsync({});
            setLocation(location);
            setLongitude(location['coords']['longitude'])
            setLatitude(location['coords']['latitude'])

        })();
    }, []);
    const [value, setValue] = React.useState('easy');
    const Send = async (text) => {
        if (!!text.trim()) {
            let currentDate = new Date().toLocaleDateString();
            let currentTime = new Date().toLocaleTimeString();
            await firebase.database().ref('Accounts/' + LocalUser['login'] + '/Request').set({
                situation: text,
                date: currentDate,
                time: currentTime,
                status: 'unbusy',
                level: value,
                latitude: lat,
                longitude: long,
            })
            ToastAndroid.showWithGravity("Заявка успешно создана!", ToastAndroid.LONG, ToastAndroid.BOTTOM)
            stateChanger('Map')
        } else {
            ToastAndroid.showWithGravity("Опишите пожалуйста ситуацию", ToastAndroid.LONG, ToastAndroid.BOTTOM)
        }


    }


    return (
        <View style={styles.Wrapper}>
            <View style={styles.backWrap}>
                <TouchableOpacity onPress={() => {
                    stateChanger('Map')
                }} style={styles.helpWrap}>
                    <Image style={styles.back} source={require('../../R/Images/back.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.background}>
                <TextInput onChangeText={(val) => setText(val)}
                           placeholder='Подробно опишите ситуацию, в которой вы оказались.' multiline={true}
                           style={styles.situation}/>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                    <View style={styles.group}>
                        <View style={styles.item}>
                            <Text>Легкая</Text>
                            <RadioButton value="easy"/>
                        </View>
                        <View style={styles.item}>
                            <Text>Средняя</Text>
                            <RadioButton value="medium"/>
                        </View>
                        <View style={styles.item}>
                            <Text>Серьезная</Text>
                            <RadioButton value="hard"/>
                        </View>
                    </View>

                </RadioButton.Group>
                <View style={styles.buttonWrapper}>
                    <ButtonStylized height={50} width={200} textColor='white' bgColor='#118ece' title='Отправить запрос'
                                    callback={() => Send(text)}></ButtonStylized>
                </View>
            </View>
        </View>
    );
};

export default SendHelpActivity;
