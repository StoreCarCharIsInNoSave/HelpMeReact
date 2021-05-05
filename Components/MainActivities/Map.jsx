import React, {useState} from 'react';
import {Dimensions,Image,  ImageBackground, StyleSheet, Text, View} from "react-native";
import BottomNavigator from "../NavigatorMenu/BottomNavigator";
import MapView, {Callout, Circle, Marker} from "react-native-maps";
import CustomMarker from "../OtherComponents/CustomMarker";

const Map = ({stateChanger}) => {
    const styles = StyleSheet.create({
        Wrapper: {
            width: '100%',
            height: '100%',
            backgroundColor: 'green',
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
    })


    return (
        <View style={styles.Wrapper}>

            <MapView style={styles.map}
                     initialRegion={{
                         latitude: 37.78825,
                         longitude: -122.4324,
                         latitudeDelta: 0.001,
                         longitudeDelta: 0.001,
                     }}>
                <CustomMarker coordinate={{latitude: 37.78825, longitude: -122.4324}} login="Zxczxc"/>




            </MapView>

        </View>
    );
};

export default Map;
