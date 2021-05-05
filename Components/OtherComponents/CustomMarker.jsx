import React, {useEffect, useState} from 'react';
import {Callout, Marker} from "react-native-maps";
import {Image, StyleSheet, Text, View} from "react-native";
import * as firebase from "firebase";
import {Svg, Image as ImageSvg} from 'react-native-svg';
import ButtonStylized from "../ButtonStylized";

const CustomMarker = ({login, coordinate}) => {

    const [image, setImage] = useState(null)
    const styles = StyleSheet.create({
        Wrapper: {
            paddingTop: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            width: 300,
        },
        imgWrapper: {
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black',
            borderStyle: 'solid',
            marginBottom: 10,
        },
        image: {
            height: 100,
            width: 100,

        },
        Message: {
            width: 300,
            alignItems: 'center',
        },
        title: {
            color: '#acacac'
        },
        mainTitle: {
            color: '#acacac',
            paddingBottom: 15,
            fontSize: 20,
        },
        buttonWrapper: {
            width: '100%',
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'space-around',
            flexDirection: 'row',
        },
    });

    useEffect(() => {
        firebase.database().ref('Accounts/' + login + '/Auth').on('value', (snapshot) => {
            console.log('Получен снапшот')
            firebase.storage().ref('ProfileImages/' + login).getDownloadURL().then((uri) => {
                setImage(uri)
            })
        })
    }, [])

    return (
        <Marker coordinate={coordinate}>
            <Callout style={styles.Wrapper}>
                <Text style={styles.mainTitle}>Запрос</Text>

                <View style={styles.imgWrapper}>
                    <Svg style={styles.image}>
                        <ImageSvg width={'100%'} height={'100%'} preserveAspectRatio="xMidYMid slice"
                                  href={{uri: image}}/>
                    </Svg>
                </View>
                <Text style={styles.title}>Логин</Text>
                <Text>DOTNETISTRASH</Text>
                <Text style={styles.title}>Дата и время отправки</Text>
                <Text>DOTNETISTRASH</Text>
                <Text style={styles.title}>Важность</Text>
                <Text>DOTNETISTRASH</Text>
                <Text style={styles.title}>Окружение</Text>
                <Text>Бондажмастер</Text>
                <Text style={styles.title}>Статус</Text>
                <Text>Ожидает пользователя</Text>
                <View style={styles.Message}>
                    <Text style={styles.title}>Сообщение</Text>
                    <Text>Как меня заколебало верстать эту вонючую картинку. Почему верста похожа на рандом? пойду
                        спать.</Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <ButtonStylized height={30} width={70} textColor='black' bgColor='#acacac' title='Помочь'
                                    callback={() => {
                                        console.log('Помогаешь')
                                    }}></ButtonStylized>
                    <ButtonStylized height={30} width={70} textColor='black' bgColor='#acacac' title='Написать'
                                    callback={() => {
                                        console.log('Пишешь')
                                    }}></ButtonStylized>
                </View>
            </Callout>
        </Marker>
    );
};

export default CustomMarker;
