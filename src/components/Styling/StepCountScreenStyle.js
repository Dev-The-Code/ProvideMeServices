import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        marginHorizontal:20,
        //width:screenWidth,
        // height:screenHight,
        //backgroundColor:'red',
        
    },
    // childContainer:{
    //     flex:2,
    //     backgroundColor:'#FFFFFF',
    //     marginHorizontal:40
    // },
    headingContainer:{
        height:50
    },
    headingStyle:{
        fontFamily: "MontserratExtraBold",
        color: '#000000',
        marginVertical:10
        
    },
    dateContainer:{
        height:20,
        alignItems:'center',
        //backgroundColor:'green'
    },
    stepCountContainer:{
         height:220,
         borderWidth:2,
         //borderColor:'#FFFFFF',
         marginHorizontal:30,
         marginTop:20,
         backgroundColor:'#000000',
         flexDirection:'row',
         justifyContent:'space-between',
         borderRadius:4


    },
    progressWhelContainer:{
        marginTop:50,
        marginLeft:20
    },
    stepCountData:{
        marginVertical:25,
        
    },
    graphContainer:{
       marginHorizontal:30,
       borderWidth:2,
       marginTop:20, 
       height:160,
       //borderColor:'white',
       backgroundColor:'#000000',
       borderRadius:4
    },
    tapLoadText:{
        color: '#FF6200',
        fontFamily: 'MontserratLight',
        marginBottom:15
    },
    inputTexts: {
        flex: 1,
        fontFamily: 'MontserratLight',
       // fontFamily:'MontserratMedium',
        color: 'black',
        // fontSize: 23,
        //marginLeft: 20,
        height: 40,
        borderColor: 'gray',
        //backgroundColor: '#1e1e1e',
        backgroundColor:'white',
        borderRadius: 3,
        borderWidth:1,
        //marginRight: 20,
        paddingLeft: 16,
        
      },
    
})

export default styles;