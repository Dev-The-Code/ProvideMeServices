import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,

    },

    heading: {
        height: 30,
        paddingHorizontal: 5,

        //backgroundColor:'red'
    },


    line: {
        height: 30,
        paddingHorizontal: 5,
        paddingVertical: 20

        //backgroundColor:'red'
    },

    headingText: {
        color: '#555555',
        fontFamily: "MontserratExtraBold",
        fontSize: 20,
        marginBottom: 10,

    },

    lineText: {
        color: '#E5E5E5',
        fontFamily: "MontserratExtraBold",
        fontSize: 15,
        marginBottom: 10,

    },

    seekContainer: {
        flex: 0.25,
        //backgroundColor:'red'
        paddingTop: 70
    },

    seekServiceContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop: 15,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    seekPicStyle: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    },

    providerContainer: {
        flex: 0.25,
        //backgroundColor:'red'
        paddingTop: 70
    },

    providerServiceContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop: 15,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    providerPicStyle: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    },

})

export default styles;