import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SkipButton = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity style={styles.btnStyle} underlayColor='#fff' onPress={() => { props.gotToSetUpScreen('Setupscreen') }}>
                <Text style={styles.skipButton}>Skip for now</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
        </View>
    )
}
export default SkipButton;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    btnStyle: {
        flex: 2,
        height: 40,
        justifyContent: 'center',
        backgroundColor: 'black',
        alignItems: 'center',
        borderRadius: 5

    },
    skipButton: {
        fontFamily: 'MontserratMedium',
        color: 'white'
    },
})  