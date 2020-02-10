import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
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
        flex:1,
        marginHorizontal:18,
    },
    profilPicStyle:{
        width: 150,
        height: 150, 
        borderRadius: 150/2
    },
    profilPicContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop:15,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    nameContainer:{
        // borderWidth:2,
        // borderColor:'red',
        marginTop:15,
        padding:5,
    },
    nameStyle:{
         fontFamily:'MontserratMedium',
        // fontFamily: 'MontserratLight',
        color:'black'
    },
    userTitle:{
        // borderWidth:2,
        // borderColor:'green',
        justifyContent:'center',
        alignItems:'center',
        padding:5
    },
    userTitleStyle:{
        fontFamily: 'MontserratLight',
        color:'#4f4f4f',
    },
    inputLabelsStyle:{
        fontFamily: 'MontserratLight',
        color:'#4f4f4f',
    },
    emailContainer:{
        flex:1,
        marginTop:8
    },
    inputTextStyle:{
        flex: 1,
        fontFamily: 'MontserratLight',
        borderRadius:3,
        height: 40,
        backgroundColor: '#e5e5e5',
        paddingLeft: 16,
        marginTop:5,
      },
      passwrdContainer:{
        flex:1,
        marginTop:18
      },
      addressContainer:{
          flex:1,
          marginTop:18
      },
      contactNumberContainer:{
          flex:1,
          marginTop:18
      },
      genderContainer:{
          flex:1,
          marginTop:18,
          //backgroundColor:'green'
      },
      childGender:{
          flex:1,
          flexDirection:'row',
          justifyContent:'space-between'
      },
      blankContainer:{
          flex:2,
          marginBottom:30
      },
      btnContainer:{
         flex:2, 
         marginTop:20,
      },
      caloriesBtnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      },
      errorInput:{
        borderWidth:2,
        borderColor:'red',
    },
    passwrdInstructionContainer:{
        //backgroundColor:'white',
        //marginVertical:3
    },
    instructionStyle:{
      fontSize:13,
      fontFamily:'MontserratLight',
      color:'#FF6200',
      marginTop:5
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
      maleTouchableOpacity:{
        height: 38,
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5', 
        marginTop: 5, 
        borderRadius: 3 
    },
    clickedMale:{
        height: 38, 
        width: '43%', 
        //marginLeft: 16, 
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
        backgroundColor: '#e5e5e5', 
        marginTop: 5, 
        borderRadius: 3 
    },
    clickedFemale:{
        height: 38, 
        width: '43%', 
        //marginLeft: 16, 
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    maleTextStyle:{
        textAlign: 'center', 
        color: '#4f4f4f',
        fontFamily: 'MontserratLight'
    },

})

export default styles;