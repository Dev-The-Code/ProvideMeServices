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

    search: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginHorizontal: 5,
    },

    searchbar: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'flex-end'
    },

    cardMainCon: {
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

    cardText: {
        color: '#555555',
        fontFamily: "MontserratExtraBold",
    },

    cardText2: {
        color: '#555555',
        marginRight: 5
    },

    counterCont: {
        justifyContent: 'flex-end',
        borderRadius: 50,
        backgroundColor: '#3AC6F4',
        padding: 5,
        marginRight: 10

    },

    cartMainCon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

        alignItems: 'flex-end',
        shadowOpacity: 10,
        shadowColor: 'red'
    },

    cartCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 30,
        width: 150,
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
        backgroundColor: '#3AC6F4',
        padding: 5,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 10,
        height: 30,
        width: 30
    },

    //Modal CSS
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: screenWidth,
        height: 100
    },

    childMainContainer: {
        flex: 1,
        marginHorizontal: 15
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

    modalTxt: {
        color: '#555555',
        fontWeight: 'bold',
    },

    quaMainCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },

    quaIncSty: {
        color: 'black',
        borderColor: '#447BBE',
        textAlign: 'center',
        borderRadius: 15,
        borderWidth: 1,
        padding: 5,
        width: 40,
        height: 30
    },

    textInpsty: {
        paddingBottom: 7,
        marginBottom: 5,
        paddingTop: -10
    },

    quaDecSty: {
        color: 'black',
        borderColor: '#447BBE',
        borderRadius: 15,
        borderWidth: 1,
        textAlign: 'center',
        padding: 5,
        width: 40,
        height: 30
    },

    dateTimeCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 10
    },

    dateShowSty: {
        color: '#E5E5E5',
        borderColor: '#447BBE',
        textAlign: 'center',
        padding: 5,
    },

    datePickerSty: {
        width: 100,
        color: '#E5E5E5',
        textAlign: 'center',
        marginBottom: 10
    },

    cartBtnCon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 15,
        marginVertical: 15
    },

    cartTextSt: {
        color: 'black',
        fontWeight: 'bold',
        borderColor: '#447BBE',
        textAlign: 'center',
        borderRadius: 15,
        borderWidth: 1,
        textAlign: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },

    cartchangeTextSt: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#447BBE',
        borderColor: '#447BBE',
        textAlign: 'center',
        borderRadius: 15,
        borderWidth: 1,
        textAlign: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },

    cancelBtnTxt: {
        color: '#3AC6F4',
        fontWeight: 'bold',
        borderColor: '#447BBE',
        textAlign: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },

    goToCartText: {
        color: 'white',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },

    pkgText: {
        color: '#E5E5E5',
        fontFamily: 'MontserratLight',
        marginTop: 10
    },
    detailPrice: {
        color: '#FF6200',
        fontFamily: 'MontserratMedium',
        marginTop: 10
    },
    instructionDetail: {
        marginTop: 10,
        paddingVertical: 7
    },
    instText: {
        color: '#7e7e7e',
        fontFamily: 'MontserratLight',
    },
    caloriesBtnStyle: {
        flex: 4,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#FF6200',
        alignItems: 'center',
        borderRadius: 5
    },
    iconStyle: {
        height: 15,
        width: 20,
        marginTop: 4
    },

    foodMainCont: {
        marginHorizontal: 15,
        //marginVertical: 5
    },
})

export default styles;