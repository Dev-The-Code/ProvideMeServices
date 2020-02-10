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

    monthlyPlan: {
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

    plan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
    },

    monthlyText: {
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

    cartMainCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 10,
        shadowColor: 'red',
        paddingBottom: 10
    },

    cartCont: {
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

    counterCont2: {
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




})

export default styles;