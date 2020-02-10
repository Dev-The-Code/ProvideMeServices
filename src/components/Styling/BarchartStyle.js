import React from 'react';
import { Alert, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'red'
        //width:screenWidth
        color: '#ffffff'

    },
})

export default styles;