import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,

    },

    container2: {
        flex: 1,
        paddingHorizontal: 5,
        paddingBottom: 5

    },

    heading: {
        height: 30,
        paddingHorizontal: 5,


        //backgroundColor:'red'
    },
    headingText: {
        color: '#555555',
        fontFamily: "MontserratExtraBold",
        fontSize: 20,
        marginBottom: 10,

    },

    paraContainer: {
        flex: 0,
        //backgroundColor:'blue',
        marginVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    paraText: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
        // marginLeft: 20,
        // marginRight: 20
    },

    textsStyles: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#555555',
        // marginLeft: 20
    },

    inputFields: {
        flex: 1,
        //backgroundColor:'gray',
        flexDirection: 'row',
        justifyContent: 'center',


    },

    inputTexts: {
        flex: 1,
        fontFamily: 'MontserratLight',
        color: 'black',
        height: 40,
        backgroundColor: '#E5E5E5',
        borderRadius: 2,

        paddingLeft: 16,

    },

    markBtnCont: {
        marginVertical: 10,
        backgroundColor: '#447BBE',
        borderRadius: 20,
    },

    markText: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 20,
    },

})

export default styles;