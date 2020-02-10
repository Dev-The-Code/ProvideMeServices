import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles=StyleSheet.create({
    container:{
        flex:1,
        //backgroundColor:'white',
        marginHorizontal:20,
        // width:screenWidth
    },
    headingContainer:{
        flex:1,
        //backgroundColor:'skyblue',
        height:70

    },
    headingStyle:{
        fontSize: 20,
        fontFamily: "MontserratExtraBold",
        // color: '#A6A6A6',
         color: 'white',
         opacity:0.65
    },
    paraContainer: {
        flex: 1,
       // backgroundColor: 'pink',
         height:60
    },
    paraStyle: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
    },
    activityContainer:{
        flex:1,
        justifyContent:'space-between',
        //backgroundColor:'red',
        flexDirection:'row',
        marginTop:10
        
    },
    scndActivity:{
        flex:0.5,
        justifyContent:'space-between',
        //backgroundColor:'yellow',
        flexDirection:'row',
        marginTop:10,
        height:120
    },
    macrosContainer:{
        flex:0.8,
        backgroundColor:'black',
        // borderColor:'gray',
        borderWidth:5,
        borderRadius:10,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        //opacity:0.3,
        marginTop:10,
        marginLeft:20,
       // width:250
    },
    btnContainer:{
        flex:1,
        marginTop:15
        //backgroundColor:'green'
    },
    touchOpacityStyle:{
        borderWidth:2,
        height:100,
        width:150,
        borderColor:'white',
        backgroundColor:'white',
        borderRadius:5,
        opacity:0.3
    },
    headerTextStyle:{
        paddingLeft:8,
        paddingTop:8,
        fontSize:15,
        fontFamily: 'MontserratLight',
        color: 'white',
        opacity:0.8
    },
    textStyle:{
        paddingLeft:8,
        paddingTop:5,
        fontFamily: 'MontserratLight',
        color: 'white',
        opacity:0.65
    },
    // textInputStyle:{
    //       height: 80,
    //       width:150,
    //       backgroundColor:'white',
    //       opacity:0.3

          
    // },
    textInputOne:{
          height: 80,
          width:150,
          flexWrap:'wrap',
          paddingBottom:28,
          borderTopLeftRadius:5,
        //   borderTopRightRadius:20,
         // color: 'white',
          backgroundColor:'white',
        //   paddingRight:5,
          opacity:0.3
    },
    textInputTwo:{
        height: 80,
          width:160,
          //backgroundColor:'gray',
          flexWrap:'wrap',
          //marginLeft:10,
          paddingBottom:28,
          borderTopRightRadius:5,
          backgroundColor:'white',
          paddingLeft:5,
          opacity:0.3
    },
    textInputThree:{
        height: 80,
          width:150,
         // backgroundColor:'gray',
          flexWrap:'wrap',
          paddingBottom:28,
          backgroundColor:'white',
          borderBottomLeftRadius:5,
          //paddingRight:5,
          opacity:0.3
    },
    textInputFour:{
         height: 80,
          width:160,
          //backgroundColor:'gray',
          flexWrap:'wrap',
          //marginLeft:10,
          paddingBottom:28,
          backgroundColor:'white',
          borderBottomRightRadius:5,
          paddingLeft:15,
          opacity:0.3
          
    },
    inputTextColor:{
        color:'yellow',
        opacity:1
        
    },
    caloriesBtnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      },
      clickBtnStyle:{
        height: 38,
        width: '90%', 
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:3
    },
    sedetaryContainer:{
        height: 100, 
        width: 150, 
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        // marginTop: 5, 
        borderRadius: 3,
        opacity:0.3
    },
    moderateContainer:{
        height: 100, 
        width: 150, 
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        // marginTop: 5, 
        borderRadius: 3,
        opacity:0.3
    },
    lightTouchableStyle:{
        height: 100, 
        width: 150, 
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        // marginTop: 5, 
        borderRadius: 3,
        opacity:0.3
    },
    extremTouchableStyle:{
        height: 100, 
        width: 150, 
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        // marginTop: 5, 
        borderRadius: 3,
        opacity:0.3
    },
    validationInstruction:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
    },
})

export default styles;

