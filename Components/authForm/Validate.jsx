import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

const Validate = ({status, text}) => {

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',

        },
        image: {
            height: 15,
            width: 15,
        },

    })

    return (
        <View style={styles.container}>
            {status ? <Image style={styles.image} source={require('../../R/Images/ok.png')}/> :
                <Image style={styles.image} source={require('../../R/Images/bad.png')}/>}
            <Text>{' ' + text}</Text>
        </View>
    );
}
;

export default Validate;
