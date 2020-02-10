import React from 'react';
import { Alert, StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
    },
    headingContainer: {
        height: '8%',
        //backgroundColor:'red',
        flexDirection: 'row',
        marginTop: 40

    },
    textStyleOne: {
        color: '#3AC6F4',
        fontFamily: "MontserratExtraBold",
        fontSize: 20
    },
    textStyleTwo: {
        color: '#447BBE',
        fontFamily: "MontserratExtraBold",
        fontSize: 20
    },
    arrowContainer: {
        height: '10%',
        //backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forImgs: {
        height: 15,
        width: 15,
    },
    cardsContainer: {
        flex: 1,



        // flexDirection: 'row',
        //backgroundColor:'green',
        //width:'47%'
        //  flexWrap:'wrap',
        // justifyContent: 'space-between'

    },
    childContainerOne: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'

        //backgroundColor:'green'

    },
    // childContainerTwo: {
    //     flex: 1,
    //     //backgroundColor:'red'
    // },
    cardOne: {
        height: 140,
        width: 155,
        marginTop: 12
        // borderWidth:2,
        // borderColor:'black',
        // borderRadius:3,
        // marginLeft: 10
    },
    cardTwo: {
        // justifyContent:'flex-end',
        height: 140,
        width: 155,
        // borderWidth: 2,
        marginTop: 12,
        //borderColor:'white',
        // borderRadius:5,
        // backgroundColor:'#000000',
        marginLeft: 2
    },
    cardTwoTextStyle: {
        color: '#FFFFFF',
        fontFamily: "MontserratExtraBold",
        marginLeft: 14,
        marginTop: 20
    },
    cardThree: {
        height: 140,
        width: 155,
        // borderWidth:2,
        // borderColor:'black',
        // borderRadius:3,
        marginTop: 12
    },
    cardFour: {
        height: 280,
        width: 157,
        //borderWidth:2,
        //borderColor:'white',
        backgroundColor: 'black',
        borderRadius: 5,
        marginTop: 15,
        marginLeft: 2
    },
    cardFourTextStyle: {
        color: '#FFFFFF',
        fontFamily: "MontserratExtraBold",
        marginLeft: 14,
        marginTop: 20
    },
    cardFive: {
        height: 140,
        width: 155,
        // borderWidth:2,
        // borderColor:'black',
        // borderRadius:3,
        marginTop: 12
    },
    goalSetCard: {
        height: 140,
        width: 152,
        // borderWidth:2,
        // borderColor:'black',
        //borderRadius:3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
        //marginTop:12,
        //backgroundColor:'black',
        //padding:15
    },
    imgsStyle: {
        flex: 1,
        height: 130,
        width: 152,
        alignSelf: 'stretch',
        borderRadius: 5

    },
    whelSpinerContainer: {
        height: '23%',
        //backgroundColor:'white',
        marginLeft: 14,
        marginTop: 8
    },
    resultContainer: {
        flexDirection: 'row',
        height: '6%',
        //backgroundColor:'red',
        marginLeft: 14,
        marginTop: 10
    },
    detailReport: {
        height: '38%',
        //backgroundColor:'red',
        marginLeft: 14
    },
    arrowIcon: {
        height: 23,
        width: 23,
        marginTop: 22
    },
    lastArrow: {
        height: 23,
        width: 23,
        marginTop: 22,
        marginLeft: 14
    },
    waitContainer: {
        //height:60,
        width: 152,
        // borderWidth:2,
        // borderColor:'black',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        //marginTop:12,
        backgroundColor: '#000000',
        padding: 12

    },
    waitText: {
        color: '#FF6200',
        fontFamily: 'MontserratMedium',
    },
    weightLabel: {
        color: '#7e7e7e',
        fontFamily: 'MontserratLight',
    },
    bmiText: {
        color: '#FF6200',
        fontFamily: 'MontserratMedium',
        marginTop: 5
    },

    //dosri file ki css

    // modalContent: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     margin: 0,
    //     height: 100
    // },

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

    inputSearch: {
        padding: 15,
    },

    withOutTrainerModal: {
        width: '100%',
        justifyContent: 'center',
        height: 520,
        borderRadius: 1,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        paddingBottom: 30,
        elevation: 3
    },

    filterText: {
        marginTop: 5,
        color: '#555555',
        fontSize: 20
    },

    categoryText: {
        // marginTop: 8,
        color: '#555555',
        fontSize: 20,
        paddingTop: 10
    },

    sliderContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },

    searchBtnContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingRight: 40,
        justifyContent: 'space-around',
        marginLeft: 60,
        paddingTop: 50
    },

    serachResultCon: {
        marginTop: 16,
        // flexDirection: 'row',
        justifyContent: 'space-around',
        // borderWidth: 1,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'white',
        // alignSelf: 'flex-end',
        width: 120,
        alignItems: 'center',
        // width: 110
    },

    resetTxt: {
        flex: 0.9
    },

    searchResTxt: {
        color: '#3AC6F4',
        fontFamily: "MontserratExtraBold",
        textAlign: 'left',
        fontSize: 14
    },

    changeResTxt: {
        color: 'white',
        fontFamily: "MontserratExtraBold",
        textAlign: 'left',
        fontSize: 14
    },

    textColor: {
        fontFamily: "MontserratExtraBold",
        fontSize: 14,
        color: 'white',

    },

    userInstruction: {
        marginTop: 5,
        // marginLeft: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    userInsTextStyle: {
        color: 'white',
        fontFamily: 'MontserratLight',
        fontSize: 14,
        padding: 4,

    },

    sendReqContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        height: 40,
        borderColor: '#447BBE',
        borderRadius: 30,
        backgroundColor: 'white',
        alignSelf: 'center',
        width: 100,
        alignItems: 'center',
    },

    bridalContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        height: 40,
        borderColor: '#3AC6F4',
        borderRadius: 30,
        backgroundColor: 'white',
        alignSelf: 'center',
        width: 100,
        alignItems: 'center',
    },

    sendReqText: {
        color: '#E5E5E5',
        fontFamily: "MontserratExtraBold",
        textAlign: 'left',
        fontSize: 10
    },

})

export default styles; 