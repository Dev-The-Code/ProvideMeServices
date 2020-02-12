import React from 'react';
import { Alert, StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Dimensions.get('window').width;
// const screenHight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 20,
        // width:screenWidth,
        // height:screenHight,
        //backgroundColor:'red'
    },
    headerIcon: {
        height: 18,
        width: 18
    },

    rowCont1: {
        backgroundColor: 'white',
        marginTop: 90,
        borderRadius: 10,
        marginHorizontal: 5,
        // borderColor: 'red',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2

    },

    rowCont2: {
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 5,
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
    },

    monthlyText: {
        color: '#555555',
        fontFamily: "MontserratExtraBold",
    },

    designationHead: {
        color: '#555555',
        fontFamily: 'MontserratLight',
        marginTop: 10,
        fontWeight: 'bold',
    },

    designText: {
        fontSize: 10,
        color: '#E5E5E5',
    },

    ratingText: {
        color: '#555555',
        fontFamily: 'MontserratLight',
        marginTop: 10,
        fontWeight: 'bold',
        paddingRight: 60

    },

    Text2: {
        fontSize: 10,
        color: '#E5E5E5'
    },

    priceTextHead: {
        color: '#E5E5E5',
        fontFamily: 'MontserratLight',
        fontSize: 10

    },

    headerIconContainer: {
        marginRight: 30,
        marginBottom: 8
    },
    headingContainer: {
        // flex:0.25,
        //height:'7%',
        //backgroundColor:'pink'
    },
    headingStyle: {
        fontSize: 20,
        color: '#4f4f4f',
        fontFamily: "MontserratExtraBold",
    },
    profilPicStyle: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    },
    profilPicContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop: 15,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    nameContainer: {
        // borderWidth:2,
        // borderColor:'red',
        marginTop: 15,
        padding: 5,
    },
    nameStyle: {
        fontFamily: 'MontserratMedium',
        // fontFamily: 'MontserratLight',
        color: '#555555',
        fontSize: 20,
    },
    userTitle: {
        // borderWidth:2,
        // borderColor:'green',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    userTitleStyle: {
        fontFamily: 'MontserratLight',
        color: '#4f4f4f',
    },
    profileContainer: {
        flex: 0.25,
        //backgroundColor:'red'
        paddingTop: 70
    },
    userInfoContainer: {
        flex: 4,
        //backgroundColor:'yellow'
    },
    emailContainer: {
        flex: 1,
        backgroundColor: 'blue'
    },
    labelStyle: {
        fontFamily: 'MontserratMedium',
        // color: '#A6A6A6',
        color: '#4f4f4f',
    },
    userInsertedValueStyle: {
        fontFamily: 'MontserratLight',
        color: '#4f4f4f',
        marginTop: 7,
        //marginLeft:7,
        backgroundColor: '#e5e5e5',
        padding: 10,
        paddingLeft: 16,
        borderRadius: 3,

    },


    //Modal Css

    secmainContainer: {
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

    subBtnCon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 15,
        marginVertical: 15
    },

    subTextSt: {
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

    subchangeTextSt: {
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

    noThnkBtnTxt: {
        color: '#3AC6F4',
        fontWeight: 'bold',
        borderColor: '#447BBE',
        textAlign: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },

    //Text Area CSS
    container2: {
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textareaContainer: {
        height: 100,
        width: 275,
        padding: 5,
        borderRadius: 20,
        backgroundColor: '#E5E5E5',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },

    starCont: {
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewBlock: {
        marginTop: 12
    }
})

export default styles;