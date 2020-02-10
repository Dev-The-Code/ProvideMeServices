import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        width:screenWidth,
        height:screenHight,
        //backgroundColor:'red'
    },
    childContainer:{
        flex:1,
        marginHorizontal:20,
        //backgroundColor:'green'
    },
    headingContainer:{
        //flex:0.5,
        height:'6%',
        //backgroundColor:'red'
    },
    headingStyle:{
        fontSize:20,
        color:'black',
        fontFamily: "MontserratExtraBold",
    },
    arrowContainer:{
        //flex:0.2,
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
        backgroundColor:'pink',
        marginVertical:25,
        flexDirection:'row',
       
    },
    bodyChildOne:{
       flex:1,
       //backgroundColor:'yellow',
       flexDirection:'row',
       //flexWrap:'wrap',
       justifyContent:'space-evenly',
       padding:10
       
    },
    bodyChildTwo:{
        flex:1,
        backgroundColor:'yellow',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    resultCardLeft:{
    //    borderWidth:5,
    //    borderColor:'white',
      borderRadius:3,
      backgroundColor:'black',
      height:125,
      width:140,
      flexWrap:'wrap'
    },
    resultCardRight:{
        //  borderWidth:5,
        //  borderColor:'white',
        borderRadius:3,
        backgroundColor:'black',
        height:125,
        width:140,
        //marginLeft:5
      },
    resultText:{
     marginTop:10,
     marginLeft:10,
     color:'#FFF',
    fontFamily:"MontserratExtraBold",
    },
    resultTextAmount:{
     marginTop:16,
     marginLeft:10,
     color:'#FF6200',
     fontFamily:'MontserratLight'
    },
    resultTextUnit:{
        marginLeft:10,
        marginTop:10,
        color:'#a6a6a6',
        fontFamily:'MontserratLight'
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

export default styles;