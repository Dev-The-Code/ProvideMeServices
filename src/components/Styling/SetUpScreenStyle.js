import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: screenWidth,
        height:screenHight,
        backgroundColor:'black'
        
        
    },
    childContainer: {
        flex: 1,
        backgroundColor: 'black',
        marginHorizontal:20
    },
    heading: {
        flex: 0.3,
        //backgroundColor: 'black'
    },
    headingStyle: {
        fontFamily: "MontserratExtraBold",
        fontSize: 20,
        color: '#A6A6A6',
      

    },
    paraGraph: {
        flex: 0.2,
        marginTop: 5
        //backgroundColor: '#8397b3'
    },
    paraGraphStyle: {
        color: '#A6A6A6',
        fontFamily: 'MontserratLight',

    },
    labelsContainer:{
        flexDirection:'row',
        //backgroundColor:'green',
        marginRight:23,
        justifyContent:'space-between'
    },
    leftInputLabelStyle:{
        color: '#A6A6A6',
        fontFamily: 'MontserratLight',
        marginTop:10
    },
    rightInputLabelStyle:{
        color: '#A6A6A6',
        fontFamily: 'MontserratLight',
        marginTop:10,
        marginLeft:145
    },
    weightLabelContainer:{
        flexDirection:'row',
        marginTop:12,
        //backgroundColor:'green',
        marginRight:23,
        justifyContent:'space-between'
    },
    rightWeightUnitLabelInput:{
        color: '#A6A6A6',
        fontFamily: 'MontserratLight',
        marginTop:10,
        marginLeft:88
    },
    rightGoalWeightUnitLabel:{
        color: '#A6A6A6',
        fontFamily: 'MontserratLight',
        marginTop:10,
        marginLeft:108
    },

    inputFieldOne: {
        flexDirection:'row',
        justifyContent:'space-between'
        
    },
    inputFieldOneChild:{
        flex: 1,
        backgroundColor:'black',
        flexDirection:'row',
        marginTop:10,
        height:40,
        width:"50%"
    },
    touchableOpacityOne:{
        height:40,
        backgroundColor:'white',
        //opacity:0.6,
        paddingLeft:12, 
        paddingTop:5,width:55
    },

    inputTextStyle:{
        backgroundColor:'white',
        //opacity:0.6,
        color:'black',
        textAlign:'center',
        width:40
    },
    touchableOpacityTwo:{
        height:40,
        backgroundColor:'white',
        //opacity:0.6, 
        paddingTop:5,
        width:55,
        paddingLeft:22
    },

    inputFieldTwo:{
        marginTop:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    inputFieldThree:{
        marginTop:5,
        flexDirection:'row',
        justifyContent:'space-between'
    },

    pickerContainer:{
        flex: 1 ,
        marginLeft:15
    },
        
    
    buttonContainer: {
        flex: 2,
        //backgroundColor: '#794044',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:40
    },
    buttonContainerStyle: {
        flex: 1,
    },

    // reserveScreen: {
    //     flex: 2,
    //     backgroundColor: 'white'
    // },
    
    pickerStyle: {
        width: 155,
        height: 40,
        marginTop: 10,
        color: '#A6A6A6',
        backgroundColor: 'white',
        //opacity: 0.3

    },
    
    caloriesBtnStyle: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#FF6200',
        alignItems: 'center',
        borderRadius: 5
    },
    
    forImg: {
        width: 20,
        height: 20,
        marginVertical: 5

    },
    validationInstruction:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
    },
    rightValidationHieghtAndCurrentWeight:{
        marginLeft:65
    },
    rightGoalWeight:{
        marginLeft:30
    },
    textsStyles:{
        color: '#A6A6A6',
            fontFamily: 'MontserratLight',
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
      genderTextStyle:{
        color: '#A6A6A6',
        fontFamily: 'MontserratLight',
        marginTop:12
    },
    clickedMale:{
        height: 40, 
        width: '30%', 
        //marginLeft: 16, 
        color: 'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    maleTouchableOpacity:{
        height: 40,
        width: '30%', 
        justifyContent: 'center', 
        //backgroundColor: '#1e1e1e',
        backgroundColor:'white',
        //opacity:0.3,
        marginTop: 5, 
        borderRadius: 3 
    },
    maleClickedTextStyle:{
        color:'white',
        textAlign: 'center', 
        fontFamily: 'MontserratLight',
      },
      maleTextStyle:{
        textAlign: 'center', 
        color: 'black',
        fontFamily: 'MontserratLight'
    },
    clickedFemale:{
        height: 40, 
        width: '30%', 
        //marginLeft: 16, 
        color: 'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    maintainClicked:{
        height: 40, 
        width: '30%', 
        //marginLeft: 16, 
        color: 'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    maintainContainer:{
        height: 40, 
        width: '30%', 
        //marginLeft: 16, 
        justifyContent: 'center', 
        backgroundColor: 'white',
        //opacity:0.3,
        marginTop: 5, 
        borderRadius: 3 
    },
    femaleContainer:{
        height: 40, 
        width: '30%', 
        //marginLeft: 16, 
        justifyContent: 'center', 
        backgroundColor: 'white',
        //opacity:0.3,
        marginTop: 5, 
        borderRadius: 3 
    },  
    femaleClickedTextStyle:{
        color:'white',
        textAlign: 'center', 
        fontFamily: 'MontserratLight',
      },
      clickedMaintainTextStyle:{
        color:'white',
        textAlign: 'center', 
        fontFamily: 'MontserratLight',
      },
      maintainTextStyle:{
          textAlign: 'center', 
        color: 'black',
        fontFamily: 'MontserratLight'
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
     goalStepsContainer:{
          marginTop:15,
          marginBottom:8
     },
     goalStepsText:{
         color: '#A6A6A6',
        fontFamily: 'MontserratLight',
     }

})

export default styles;