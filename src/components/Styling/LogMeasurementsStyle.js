import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        marginHorizontal:20,
        // width:screenWidth,
        // height:screenHight,
        //backgroundColor:'red'
    },
    childContainer:{
        //flex:1,
        //marginHorizontal:20,
        //backgroundColor:'green'
    },
    nextContainer:{
        marginHorizontal:20,
    },
    headingContainer:{
        flex:0.5,
        height:'6%',
        //backgroundColor:'red'
    },
    headingStyle:{
        fontSize:20,
        color:'black',
        fontFamily: "MontserratExtraBold",
    },
    arrowContainer:{
        flex:1,
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
    inputContainer:{
        //flex:0.9,
       // backgroundColor:'pink',
        flexDirection:'row',
        marginTop:8
        
    },
    // inputContainer:{
    //     flex:1,
    //     backgroundColor:'skyblue'
    // }
    inputTextStyle:{
        width:'50%',
        fontFamily: 'MontserratLight',
        color: '#666666',
        height:40,
        //borderRadius:3,
        backgroundColor:'#e5e5e5',
        borderBottomLeftRadius:3,
        borderTopLeftRadius:3,
        paddingLeft:10
        
    },
    weightListsContainer:{
        flex:14,
        //backgroundColor:'pink',
        flexDirection:'row',
        flexWrap:'wrap',

    },
    weightListOne:{
    //    flex:0.25,
       marginTop:10,
    //    borderWidth:5,
    //    borderColor:'white',
       borderRadius:3,
       width:'100%',
       height:'15%',
       paddingHorizontal:15,
       paddingVertical:10 ,
       backgroundColor:'black'
    },
    weightNumberStyle:{
        color:'#FF6200',
        fontFamily:'MontserratLight'
    },
    weightTextStyle:{
        color:'#a6a6a6',
        fontFamily:'MontserratLight'
    },
    caloriesBtnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      },
      unitTextStyle:{
    //    borderWidth:1,
    //    borderColor:'#e5e5e5',
       height:40,
       //borderRadius:3,
       justifyContent:'flex-end',
       padding:5,
       borderBottomRightRadius:3,
       borderTopRightRadius:3,
       width:'50%',
       flexDirection:'row',
       backgroundColor:'#e5e5e5'
            
      },
      textStyle:{
        fontFamily:'MontserratLight',
        color:'#4f4f4f',
        paddingRight:5,
        paddingVertical:5

      },
      labelTextWeight:{
        fontFamily:'MontserratLight',
        color:'#4f4f4f',
        marginTop:20
      },
      validationContainer:{
          height:30,
         // backgroundColor:'blue'
      },
      validationInstruction:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200',
        paddingVertical:5
    },
    btnContainer:{
        //marginTop:20,
        marginVertical:25

    },
    labelText:{
        fontFamily:'MontserratLight',
        color:'#4f4f4f',
    }

})   

export default styles;