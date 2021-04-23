import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Register from './Components/authForm/Register'
export default function App() {


  return (
    <View  style={styles.container}>
      <StatusBar style="auto" />
      <Register/>
    </View>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#118ece',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
