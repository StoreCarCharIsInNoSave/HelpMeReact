import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const SearchBar = ({onSearch, onChangeSetCallback}) => {


    const styles = StyleSheet.create({
        Wrapper: {
            width: '100%',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: '#b1b0b0',
            borderRadius: 5,
            flexDirection: 'row',


        },
        Input: {
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 5,

        },
        searchImage: {
            width: 30,
            height: 30,

        },
        imageWrapper: {
            backgroundColor: 'transparent',
            borderRadius: 50,
            padding: 7,

        },
    })

    return (
        <View style={styles.Wrapper}>
            <TextInput style={styles.Input} placeholder="Введите код пользователя..." onChangeText={(text)=> onChangeSetCallback(text)}></TextInput>
            <TouchableOpacity style={styles.imageWrapper} onPress={onSearch}>
                <Image style={styles.searchImage} source={require('../../R/Images/search.png')}></Image>
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;
