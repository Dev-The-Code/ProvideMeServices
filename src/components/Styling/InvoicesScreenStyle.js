import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles=StyleSheet.create({
container:{
    flex:1,
    // backgroundColor:'white',
    marginHorizontal:20,
},
headingContainer:{
    
    // height:'5%',
    //backgroundColor:'red',
    flexDirection:'row',
    marginTop:5

},
textStyleOne:{
    color:'black',
    fontFamily: "MontserratExtraBold",
    fontSize:20
},
arrowContainer:{
    height:'10%',
    //backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
},
forImgs:{
    height:15,
    width:15,
},
bodyContainer:{
    flex:1,
        //backgroundColor:'yellow',
        flexDirection:'row',
        //flexWrap:'wrap',
        justifyContent:'space-evenly',
        padding:10
},
leftContainer:{
    
},
rightContainer:{
    flex:1,
    //backgroundColor:'pink',
    marginLeft:8
},
cardLeft:{
    // borderWidth:3,
    // borderColor:'black',
    height:255,
    borderRadius:5,
    width:168,
    backgroundColor:'black',
    marginTop:15,
    padding:5,
    
},
cardRight:{
    // borderWidth:3,
    // borderColor:'black',
    height:216,
    borderRadius:5,
    backgroundColor:'black',
    marginTop:15,
},
childContainer:{
    marginVertical:13,
    marginHorizontal:10
},
cardNumberStyle:{
    color:'white',
    fontFamily: "MontserratExtraBold",
    fontSize:17
},
priceDetail:{
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
    marginTop:20,
    
},
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
    fontSize:11
   },
   paymentStatusContainer:{
       marginTop:20,

   },
   unpaidTextStyle:{
    color:'#FF6200',
    fontFamily: "MontserratLight",
   },

   blankView:{
       flex:1,
       marginBottom:30
       
   },
   checkReceipt:{
       marginTop:5,
       flexDirection:'row',
       justifyContent:'space-between'
   },
   checkReceiptText:{
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
   },
   iconStyle:{
       height:20,
       width:20,
       
   },
   receiptImgStyle:{
       height:390,
       width:'100%',
       //marginTop:10,
       //alignSelf: 'stretch',
   }
})

export default styles;