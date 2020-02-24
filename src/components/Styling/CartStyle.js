import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,

    },

    mainCont: {
        flex: 1,
        marginHorizontal: 10,
        elevation: 5,
        marginVertical: 10,
        marginHorizontal: 10,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 50
    },


    container2: {
        flex: 1,
        paddingHorizontal: 5,
        paddingBottom: 5

    },

    modaMainCont: {
        width: '100%',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        paddingBottom: 10,
        elevation: 3
    },

    modalChildCont: {
        padding: 15,
    },

    heading: {
        height: 30,


        //backgroundColor:'red'
    },
    headingText: {
        color: 'black',
        fontFamily: "MontserratExtraBold",
        fontSize: 20,


    },

    cartMainCont: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 9,
        borderRadius: 10,
        marginHorizontal: 5,
        // borderColor: 'red',
        shadowColor: 'black',
        elevation: 4,
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2

    },

    cartCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
    },

    cartText: {
        color: '#555555',
        fontFamily: "MontserratExtraBold",
    },

    priceText: {
        color: '#E5E5E5',
        fontFamily: 'MontserratLight',
        marginTop: 10,
        fontWeight: 'bold'
    },

    priceTextHead: {
        color: '#E5E5E5',
        fontFamily: 'MontserratLight',
        fontSize: 10

    },

    bookBtnMainCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 10,
        shadowColor: 'red',
        paddingBottom: 10
    },

    bookBtnCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 30,
        width: 340,
        display: 'flex',
        borderColor: 'black',
        backgroundColor: '#447BBE',
        shadowOpacity: 1,
        shadowColor: 'black',
        elevation: 5,

    },

    totalCont: {
        // justifyContent: 'flex-end',
        borderRadius: 50,
        backgroundColor: 'white',
        padding: 5,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 10,
        height: 30,
        width: 130
    },

    timeMainCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },

    dateMainCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },

    quantityMainCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },

    plusText: {
        color: 'black',
        borderColor: '#447BBE',
        textAlign: 'center',
        borderRadius: 15,
        borderWidth: 1,
        padding: 5,
        width: 40,
        height: 30
    },

    minusText: {
        color: 'black',
        borderColor: '#447BBE',
        borderRadius: 15,
        borderWidth: 1,
        textAlign: 'center',
        padding: 5,
        width: 40,
        height: 30
    },

    bahriaMainCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },

    changeCont: {
        borderColor: '#447BBE',
        borderWidth: 1,
        borderRadius: 50,
        width: 80,
    },

    changeText: {
        textAlign: 'center',
        color: '#E5E5E5',
        padding: 5
    },

    graveMainCont: {
        justifyContent: 'space-between',
        marginTop: 20
    },

    bookText: {
        color: 'white',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

    totalText: {
        color: '#447BBE',
        textAlign: 'center',
        fontWeight: 'bold'
    },




})

export default styles;