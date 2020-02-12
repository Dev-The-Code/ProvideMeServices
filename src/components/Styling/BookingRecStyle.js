import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,

    },

    container2: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,


    },

    container3: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10,
    },

    container4: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 50,


    },

    container5: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 50,


    },

    heading: {
        height: 30,
        paddingHorizontal: 10,

        //backgroundColor:'red'
    },

    heading2: {
        height: 30,
        marginVertical: 70,
        justifyContent: 'center',
        alignSelf: 'center',

        //backgroundColor:'red'
    },

    heading3: {
        height: 30,
        marginVertical: -50,
        justifyContent: 'center',
        alignSelf: 'center',

        //backgroundColor:'red'
    },

    heading4: {
        height: 30,
        marginVertical: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 40,

        //backgroundColor:'red'
    },

    btnHeading5: {
        height: 30,
        marginTop: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: 40,
        marginVertical: 40,
        backgroundColor: '#447BBE',
        borderRadius: 20,
        elevation: 5,

        //backgroundColor:'red'
    },

    headingText: {
        color: '#555555',
        fontFamily: "MontserratExtraBold",
        fontSize: 20,
        marginBottom: 10,

    },

    headingText2: {
        color: '#447BBE',
        fontFamily: "MontserratExtraBold",
        fontSize: 20,
        marginBottom: 10,

    },

    headingText3: {
        color: '#E5E5E5',
        fontFamily: "MontserratBold",
        fontSize: 15,
        marginBottom: 10,

    },

    headingText4: {
        color: '#E5E5E5',
        fontFamily: "MontserratBold",
        fontSize: 15,
        marginBottom: 10,

    },

    btnHeadingText5: {
        color: 'white',
        fontFamily: "MontserratExtraBold",
        fontSize: 20,
        marginHorizontal: 30,
        marginVertical: 30,

    },
})

export default styles;