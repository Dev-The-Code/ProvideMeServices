import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const showMeasureStyles =StyleSheet.create({
    mainContainer:{
        flex:1,
        //marginHorizontal:20,
        width:screenWidth,
        height:screenHight,
        //backgroundColor:'red'
    },
    smallChildContainer:{
        flex:1,
        //backgroundColor:'red',
        marginHorizontal:20
    },
    dateWithCancelIcon:{
       flexDirection:'row',
       justifyContent:'space-between'
    },
    headingContainer:{
        height:50
    },
    headingStyle:{
        fontSize: 18,
        fontFamily: "MontserratExtraBold",
        color: '#000000',
        
    },
    cardContainer:{
        //height:250,
        //width:160,
        //borderWidth:2,
        //borderColor:'white',
        backgroundColor:'#000000',
        borderRadius:5

    },
    currntDateStyle:{
        color:'#FFFFFF',
        marginVertical:10
    },
    textStyle:{
        color:'#FFFFFF',
       // marginVertical:2,
       
    },
      forBorder:{
        borderTopColor:'#FFFFFF',
        borderTopWidth:1,
        //marginHorizontal:12,
        // marginVertical:5
      },
      cardLeft:{
        //  borderWidth:3,
        //  borderColor:'black',
        height:216,
        width:150,
        borderRadius:5,
        backgroundColor:'black',
    },
    // cardRight:{
    //     // borderWidth:3,
    //     // borderColor:'black',
    //     height:216,
    //     borderRadius:5,
    //     backgroundColor:'black',
    //     marginTop:15,
    // },
    childContainer:{
        marginVertical:7,
        marginLeft:12
    },
    cardDateStyle:{
        color:'white',
        fontFamily: "MontserratExtraBold",
        fontSize:14,
        marginTop:5
    },
    // priceDetail:{
    //     color:'#a6a6a6',
    //     fontFamily:'MontserratLight',
    //     marginTop:20,
        
    // },
    dateMonthContainer:{
        flexDirection:'row',
        marginTop:20,
    },
    monthName:{
        color:'#a6a6a6',
        fontFamily:'MontserratLight',
        
    },
    superScriptTextStyle:{
        fontSize:11,
        lineHeight:14,
        color:'#a6a6a6',
        fontFamily:'MontserratLight',
       },
       dateNumber:{
           marginLeft:5,
           color:'#a6a6a6',
        fontFamily:'MontserratLight',
       },
       yearStyle:{
           marginLeft:5,
           color:'#a6a6a6',
        fontFamily:'MontserratLight',
       },
       textStyle:{
        color:'#a6a6a6',
        fontFamily:'MontserratLight',
        fontSize:11,
        //marginTop:
       },
       weightTextStyle:{
        color:'#a6a6a6',
        fontFamily:'MontserratLight',
        fontSize:15,
        marginTop:30
       },

       waistTextStyle:{
        color:'#a6a6a6',
        fontFamily:'MontserratLight',
        fontSize:15,
        marginTop:10
       },
       detailViewContainer:{
           marginTop:35,
    
       },
       detailViewTextStyle:{
        color:'#FF6200',
        fontFamily: "MontserratLight",
        fontSize:14
       },
       bodyChildOne:{
        flex:1,
        //backgroundColor:'yellow',
        flexDirection:'row',
        //flexWrap:'wrap',
        justifyContent:'space-evenly',
        padding:10
        
     },
     arrowIcon:{
        height:23,
        width:23,
        marginTop:15
    },
    blurView: {
        position: 'absolute',
        left: 50,
        right: 50,
        top: 50,
        bottom: 50,
        backgroundColor: 'transparent'
      },
      headerIconContainer:{
        marginRight:25,
        marginBottom:8
    },
    headerIcon:{
        height:18,
        width:18
    }
})

export default showMeasureStyles;