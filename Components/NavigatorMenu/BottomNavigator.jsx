
import React from 'react';
import login from '../authForm/Auth'
import register from '../authForm/Register'
import ButtonStylized from "../ButtonStylized";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Text} from 'native-base';
import NavigatorButton from "./NavigatorButton";


const BottomNavigator = ({stateChanger, stateOfButtons}) => {
    const styles = StyleSheet.create({
        wrapper:{
            display:'flex',
            flexDirection:'row',
            position:'absolute',
            bottom: 15,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,
            elevation: 24,
            justifyContent: 'space-around',
            backgroundColor:'#ffffff',
            minWidth:300,
            borderRadius: 100,
            padding: 10,

        },
        buttonStyle:{


        },
    })
    return (
            <View style={styles.wrapper}>
                    <NavigatorButton imageHeight={30} imageWidth={30} text='Account' stateChanger={stateChanger} stateName={"Account"} image={require('../../R/Images/Account.png')} clickImage={require('../../R/Images/AccountClicked.png')} status={stateOfButtons[0]}/>
                    <NavigatorButton imageHeight={30} imageWidth={30} text='Map' stateChanger={stateChanger} stateName={"Map"} image={require('../../R/Images/Map.png')} clickImage={require('../../R/Images/MapClicked.png')} status={stateOfButtons[1]}/>
                    <NavigatorButton imageHeight={30} imageWidth={30} text='Friends' stateChanger={stateChanger} stateName={"Friends"} image={require('../../R/Images/Friends.png')} clickImage={require('../../R/Images/FriendsClicked.png')} status={stateOfButtons[2]}/>
            </View>
    );
};

export default BottomNavigator;
