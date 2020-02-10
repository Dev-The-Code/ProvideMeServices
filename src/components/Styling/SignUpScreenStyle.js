
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';


const styles =StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'red',
        marginLeft: 20,
        marginRight: 20
    },
    signUpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop:10
    },
    signUpText: {
        fontFamily: "MontserratExtraBold",
         fontSize:20,
        color: '#A6A6A6',
    },
    logoContainer: {
        flex: 1,
        //backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    forImages: {
        flex: 1,
        height: 100,
        width: 120,
        alignSelf: 'stretch',
        // marginBottom: 4
    },
    paraContainer: {
        flex: 1,
        //backgroundColor:'blue',
        marginVertical:10,
        flexWrap: 'wrap',
        flexDirection: 'row',
    
      },
      paraText: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
        // marginLeft: 20,
        // marginRight: 20
      },
    
      inputFields: {
        flex: 1,
        //backgroundColor:'gray',
        flexDirection: 'row',
        justifyContent: 'center',
    
    
      },
      inputTexts: {
        flex: 1,
        fontFamily: 'MontserratLight',
       // fontFamily:'MontserratMedium',
        color: 'black',
        // fontSize: 23,
        //marginLeft: 20,
        height: 40,
        //borderColor: 'gray',
        //backgroundColor: '#1e1e1e',
        backgroundColor:'white',
        borderRadius: 2,
        //marginRight: 20,
        paddingLeft: 16,
        
      },
      errorInput:{
          borderWidth:3,
          borderColor:'red',
      },
      textsStyles: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
        // marginLeft: 20
      },
      buttonContainer:{
        flex:2,
        marginTop:10
    },
      accountLinkContainer:{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical:20,
          //backgroundColor:'white',
          //alignItems:'center'
        
      },
      
      accountText:{
        // fontSize:23,
        fontFamily:'MontserratLight',
        color:'#A6A6A6'
      },
      registerText:{
        // fontSize:23,
        fontFamily:'MontserratMedium',
        color:'#FF6200'
      },
      caloriesBtnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
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
        
        marginVertical:10,
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
      emailExistContainer:{
        marginVertical:8,
        alignItems:'center',
      },
      emailNotExistStyle:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
      },
      clickedMale:{
        height: 38, 
        width: '43%', 
        //marginLeft: 16, 
        color: 'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    femaleContainer:{
        height: 38, 
        width: '43%', 
        //marginLeft: 16, 
        justifyContent: 'center', 
        backgroundColor: 'white',
        //opacity:0.3,
        marginTop: 5, 
        borderRadius: 3 
    },
    clickedFemale:{
        height: 38, 
        width: '43%', 
        //marginLeft: 16, 
        color: 'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    maleTouchableOpacity:{
      height: 38,
      width: '43%', 
      justifyContent: 'center', 
      //backgroundColor: '#1e1e1e',
      backgroundColor:'white',
      //opacity:0.3,
      marginTop: 5, 
      borderRadius: 3 
  },
  maleTextStyle:{
      textAlign: 'center', 
      color: 'black',
      fontFamily: 'MontserratLight'
  },
  genderTextStyle:{
    color: '#A6A6A6',
    fontFamily: 'MontserratLight',
    marginTop:8
},
maleClickedTextStyle:{
  color:'white',
  textAlign: 'center', 
  fontFamily: 'MontserratLight',
},
femaleClickedTextStyle:{
  color:'white',
  textAlign: 'center', 
  fontFamily: 'MontserratLight',
}



})

export default styles;