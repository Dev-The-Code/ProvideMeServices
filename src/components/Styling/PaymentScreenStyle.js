import React from 'react';
import { Alert, StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 20,
        // width:screenWidth,
        // height:screenHight,
        //backgroundColor:'red'
    },
    // headerIcon:{
    //     height:18,
    //     width:18
    // },
    // headerIconContainer:{
    //     marginRight:30,
    //     marginBottom:8
    // },
    headingContainer: {
        flex: 1,

        //height:'7%',
        //backgroundColor:'pink'
    },
    headingStyle: {
        fontSize: 20,
        color: '#4f4f4f',
        fontFamily: "MontserratExtraBold",
    },

    paraTextContainer: {
        flex: 1,
        marginTop: 20
    },

    inputLabelsStyle: {
        fontFamily: 'MontserratLight',
        color: '#4f4f4f',
    },

    nameContainer: {
        flex: 1,
        marginTop: 12
    },
    emailContainer: {
        flex: 1,
        marginTop: 10
    },
    inputTextStyle: {
        flex: 1,
        fontFamily: 'MontserratLight',
        borderRadius: 3,
        height: 40,
        backgroundColor: '#e5e5e5',
        paddingLeft: 16,
        // marginTop: 5,
    },
    paymentMonthContainer: {
        flex: 1,
        marginTop: 20
    },
    amountContainer: {
        flex: 1,
        marginTop: 20
    },
    cardContainer: {
        //flex: 1,
        marginTop: 20,

    },

    blankContainer: {
        flex: 2,
        marginBottom: 30
    },
    btnContainer: {
        flex: 2,
        marginTop: 30,
        marginBottom: 10
    },
    caloriesBtnStyle: {
        flex: 2,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#FF6200',
        alignItems: 'center',
        borderRadius: 5,
        // opacity:0.2
    },
    caloriesBtnStyleDisabled: {
        flex: 2,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#FF6200',
        alignItems: 'center',
        borderRadius: 5,
        opacity: 0.2
    },
    validContainer: {
        flex: 1,
        marginTop: 20,
        // height:100,
        flexDirection: 'row',
        //backgroundColor:'yellow',
    },
    validThru: {
        flex: 1,
        //backgroundColor:'red',
        marginRight: 10,
    },
    cvv: {
        flex: 1,
        // backgroundColor:'blue',
        marginLeft: 10
    },
    forImages: {
        //flex: 1,
        height: 250,
        width: 250,
        alignSelf: 'stretch',
        // marginBottom: 4

    },
    cardContainer: {
        width: 400,
        borderRadius: 5,
        padding: 15
    },
    dateWithCancelIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
       // marginHorizontal:8
    },
    toggelBtnContainer: {
        flexDirection: 'row',
        height: 50,
        //backgroundColor:'red',
        marginTop: 15
    },
    payScreenOneBtn: {
        height: 40,
        width: '50%',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FF6200',
        alignItems: 'center',
        borderRadius: 5

    },
    payScreenTwoBtn: {
        height: 40,
        width: '50%',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#FF6200',

    },
    textStyleOne: {
        fontSize: 14,
        fontFamily: 'MontserratLight',
        color: 'white',

    },
    unActiveBtnStyle: {
        height: 40,
        width: '50%',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5

    },
    unActiveTextStyle: {
        fontSize: 14,
        fontFamily: 'MontserratLight',
        color: 'black',

    },
    fileUploadContainer: {
        flexDirection: 'row',
        marginTop: 60,
        marginBottom: 60,
        justifyContent: 'space-between',

    },
    fileRecipet: {
        height: 45,
        width: 130,
        justifyContent: 'center',
        // flexDirection:'row',

    },
    imgFile: {
        height: 45,
        width: 130,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e5e5e5'
    },
    textStyle: {
        color: '#4f4f4f',
        fontFamily: 'MontserratLight',
    },
    reciptImg: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    },
    validationInstruction:{
        color: '#FF6200',
        fontFamily: 'MontserratLight',
    }
    // pickerStyle:{
    //     backgroundColor:'#e5e5e5'
    // }
})

export default styles;