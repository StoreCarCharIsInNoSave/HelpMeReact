import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import BottomNavigator from "../NavigatorMenu/BottomNavigator";
import MapView, {Callout, Circle, Marker} from "react-native-maps";
import * as ELocation from 'expo-location';
import {Toast} from "native-base";
import * as firebase from "firebase";
import GetRequest from "./GetRequest";
import CustomMarker from "./CustomMarker";


const Map = ({setRequest, stateChanger, LocalUser, WaitDialogToggler, WaitDialogTextChanger}) => {


    const styles = StyleSheet.create({
        Wrapper: {
            width: '100%',
            height: '100%',
        },

        map: {
            width: '100%',
            height: '110%',
        },
        image: {
            width: 60,
            height: 60,
            borderRadius: 50,
        },
        wrap: {
            backgroundColor: 'transparent',

        },
        callout: {
            height: 100,
            width: 100,
            backgroundColor: 'red',
        },
        helpWrap: {
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'black',
            borderStyle: 'solid',
            width: 50,
            height: 50,
            padding: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 110,
            right: 30,
        },
        help: {
            width: 50,
            height: 50,
        },
        myMarker: {
            width: 100,
            height: 100,
        },
    })
    const [location, setLocation] = useState(null);
    const [lat, setLatitude] = useState(null);
    const [long, setLongitude] = useState(null);
    useEffect(() => {
        (async () => {
            let {status} = await ELocation.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.showWithGravity("Ошибка, неполучилось получить ваше местоположение", ToastAndroid.LONG, ToastAndroid.BOTTOM)
                stateChanger('Account')
                return;
            }
            WaitDialogTextChanger('Получение местоположения, подождите пожалуйста')
            WaitDialogToggler(true)
            let location = await ELocation.getCurrentPositionAsync({});
            setLocation(location);
            WaitDialogToggler(false)
            setLongitude(location['coords']['longitude'])
            setLatitude(location['coords']['latitude'])


        })();
    }, []);
    const [requests, SetRequests] = useState([])

    useEffect(() => {
        (async () => {
                await firebase.database().ref('Accounts/').on('value', (snapshot) => {
                    SetRequests([])
                    snapshot.forEach((elem)=>{
                        if (elem.val()['Request']!=undefined){
                            if (elem.key!=LocalUser['login']){
                                SetRequests(prev=>[...prev,elem.val()['Request']])
                            }
                        }
                    })
                });
        })();
    }, []);



    return (
        <View style={styles.Wrapper}>

            <MapView style={styles.map}
                     initialRegion={{
                         latitude: lat,
                         longitude: long,
                         latitudeDelta: 0.01,
                         longitudeDelta: 0.01,
                     }}>
                {lat ? <Marker style={styles.myMarker} coordinate={{latitude: lat, longitude: long}}
                               image={require('../../R/Images/myloc.png')}/> : () => {
                }}

                {requests && requests.map((request) => {
                    return  <CustomMarker setRequest={setRequest} request={request} LocalUser={LocalUser} stateChanger={stateChanger}/>
                })}

            </MapView>

            <TouchableOpacity onPress={() => {
                stateChanger('SendHelp')
            }} style={styles.helpWrap}>
                <Image style={styles.help} source={require('../../R/Images/help.png')}></Image>
            </TouchableOpacity>
        </View>
    );
};

export default Map;
