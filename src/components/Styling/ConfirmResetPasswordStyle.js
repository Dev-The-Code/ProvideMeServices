import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    // mainContainer:{
    //     flex:1,
    //     width:screenWidth,
    //     height:screenHight,
    // },
    container: {
      flex: 1,
      //backgroundColor: 'red'
      marginHorizontal:20,
    },
    heading: {
      flex: 0.3,
     // backgroundColor: 'yellow'
    },
    headingStyle:{
      color: '#A6A6A6',
      //marginLeft: 20,
      fontFamily: "MontserratExtraBold",
      fontSize:17
    },
    firstPara:{
      flex:0.1,
      //backgroundColor:'green'
    },
    firstParaStyle:{
      color: '#A6A6A6',
      //marginLeft: 20,
      fontFamily: 'MontserratLight',
    },
    newPasswordField:{
        flex:0.5,
        //backgroundColor:'pink',
        flexDirection:'row',
        justifyContent:'center',
  
    },
    newPasswordFieldStyle:{
        flex: 1,
        fontFamily: 'MontserratLight',
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius:2,
        //borderWidth: 2,
        //marginRight: 20,
        paddingLeft: 16,
        marginTop:7,
        
        
    },
    newPasswordText:{
      color: '#A6A6A6',
     // marginLeft: 20,
      fontFamily: 'MontserratLight',
    
    },
    retypePasswrdField:{
     flex:0.5,
    // backgroundColor:'blue',
     flexDirection:'row'
    },
    
    retypePasswordText:{
     color: '#A6A6A6',
      //marginLeft: 20,
      fontFamily: 'MontserratLight',
    },
    instructionCotainer:{
         flex:0.1,
         //backgroundColor:'white'
    },
    instructionStyle:{
      color: '#A6A6A6',
      //marginLeft: 20,
      fontFamily: 'MontserratLight',
    },
    btnContainer:{
           flex:0.25,
           //backgroundColor:'black',
           flexDirection:'row'
    },
      btnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF7F50',
        alignItems:'center',
        borderRadius:5
    },
    forImg:{
      // padding: 10,
      margin: 5,
      height: 20,
      width: 20,
      resizeMode: 'stretch',
      alignItems: 'center',
      backgroundColor:'gray'
    },
    btnContainer:{
        flex:2,
        marginTop:10
     
     },
     caloriesBtnStyle:{
       flex:3,
       height:40,
       justifyContent:'center',
       backgroundColor: '#FF6200',
       alignItems:'center',
       borderRadius:5,
       paddingHorizontal:5
     },
     emailCodeContainer:{
        flex:0.5,
        //backgroundColor:'pink',
        flexDirection:'row',
        // justifyContent:'center',
        
     },
     emailCodeInputStyle:{
        flex: 0.5,
        fontFamily: 'MontserratLight',
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius:2,
        //borderWidth: 2,
        //marginRight: 20,
        paddingLeft: 16,
        marginTop:7,
       
     },
     emailCodeText:{
        color: '#A6A6A6',
        // marginLeft: 20,
        marginTop:10,
         fontFamily: 'MontserratLight',
     },
     passwrdInstructionContainer:{
        //backgroundColor:'white',
        marginVertical:8
    },
    instructionStyle:{
      fontSize:11,
      fontFamily:'MontserratLight',
      color:'#FF6200'
    },
    passMatchContainer:{
     
      marginVertical:5,
      alignItems:'center',
    },
    passNotMatchStyle:{
      fontSize:12,
      fontFamily:'MontserratLight',
      color:'#FF6200'
    },
    spinerContainer:{
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      // justifyContent: 'space-around',
      padding: 10
    },
    passMatchStyle:{
      fontSize:12,
      fontFamily:'MontserratLight',
      color:'green'
    },
    errorInput:{
        borderWidth:3,
        borderColor:'red',
    },
    codeContainer:{
      
    },
    emailNotValidTextStyle:{
      fontSize:12,
      fontFamily:'MontserratLight',
      color:'#FF6200'
    },
    passChangeTextStyle:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
    }
  })

  export default styles;