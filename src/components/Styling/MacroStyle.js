import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        marginHorizontal:20
        // width:screenWidth,
        // height:screenHight,
        //backgroundColor:'red'
    },
    childContainer:{
        flex:1,
        // marginHorizontal:20,
        //marginRight:20,
        
        //backgroundColor:'green'
    },
    container: {
        flex: 1,
        flexDirection: 'row'
        // width: screenWidth,
        // height: screenHeight
    },
    headingContainer:{
        flex:1.5,
        //height:'7%',
        //backgroundColor:'red'
    },
    headingStyle:{
        fontSize:20,
        color:'#4f4f4f',
        fontFamily: "MontserratExtraBold",
    },
    // textContainer:{
    //     flex:1,
    //     //height:'8%',
    //     //backgroundColor:'green',
    //     marginTop:25
    // },
    styleForLabel:{
        color:'#4f4f4f',
        fontFamily:'MontserratLight',
        
    },
    dateBirth:{
        flex:0.2,
        //height:'4%',
        //backgroundColor:'pink',
        marginTop:10
    },
    // inputContainer:{
    //     flex:0.5,
    //     //height:'10%',
    //     flexDirection:'row',
    //     // flexWrap:'wrap',
    //     marginTop:5,
    //     //backgroundColor:'orange'
    // },
    inputStyle:{
        flex:1,
        height:38,
        borderRadius:3,
        backgroundColor:'#e5e5e5',
        color: '#4f4f4f'
        //opacity:0.4
    },
    genderContainer:{
        flex:2,
        marginTop:5,
        //backgroundColor:'yellow',
        //flexDirection:'row'
    },
    ageInputContainer:{
        flex:1,
        marginTop:10
    },
    touchableOpacityOne:{
        flex: 1,
        padding: 5,
        marginVertical: 5,
        backgroundColor:'#e5e5e5',
        paddingLeft:10,
        height:40 ,
        borderTopLeftRadius:3,
        borderBottomLeftRadius:3,
        marginTop:15.5
        // opacity:0.6
    },
    textInputStyleParent:{
        flex:1,
        height: 40,
        backgroundColor: '#e5e5e5',
        paddingLeft:16,
        marginTop:10,
        marginBottom:5
    },
    touchableOpacityTwo:{
        flex: 1,
        padding: 5, 
        marginVertical: 5,
        alignItems:'flex-end',
        backgroundColor:'#e5e5e5',
        paddingRight:10,
        marginRight:12,
        height:40 ,
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        marginTop:15.5
        //marginLeft:15
       // opacity:0.6
    },
    pickerStyle: {
        width: 140,
        height: 40,
        //marginTop:5,
        color: '#4f4f4f',
        backgroundColor: '#e5e5e5',
        borderRadius:5,
        // marginLeft:16,
        fontFamily: 'MontserratLight',
        // opacity:0.3
        
        

    },
    inputCaloriesStyleOne:{
        height:65,
        //borderWidth:2,
        width:'40%',
        borderBottomWidth:1,
        marginLeft:8,
        marginTop:12,
        borderColor:'gray',
        paddingBottom:20

    },
    inputCaloriesStyleTwo:{
        height:65,
        //borderWidth:2,
        width:'50%',
        marginLeft:12,
        borderBottomWidth:1,
        marginLeft:20,
        marginTop:12,
        borderColor:'gray',
        paddingBottom:20

    },
    inputCaloriesStyleThree:{
        marginTop:8,
        height:65,
        borderWidth:0,
        width:'45%',
        marginLeft:8,
        paddingBottom:20

    },
    inputCaloriesStyleFour:{
        marginTop:8,
        height:65,
        borderWidth:0,
        width:'45%',
        marginLeft:8,
        paddingBottom:20

    },
    caloriesBtnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      },
      genderTextStyle:{
        color: '#4f4f4f' ,
        fontFamily: 'MontserratLight',
        marginTop:8
    },
    maleContainer:{
        flex:1
    },
    maleTouchableOpacity:{
        height: 38,
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5', 
        marginTop: 5, 
        borderRadius: 3 
    },
    maleTextStyle:{
        textAlign: 'center', 
        color: '#4f4f4f',
        fontFamily: 'MontserratLight'
    },
    heightStyle:{
        marginTop: 20, 
        color: '#4f4f4f',
        fontFamily: 'MontserratLight', 
    },
    inputContainer:{
        width: '46.5%', 
        height: 50, 
        justifyContent: 'center',
        flexDirection:'row',
        //justifyContent:'space-between',
        //backgroundColor:'green' 
    },
    textStyle:{
        marginTop: 20, 
        color: '#4f4f4f',
        fontFamily: 'MontserratLight',
    },
    sedetaryContainer:{
        height: 38, 
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5', 
        //marginTop: 5, 
        borderRadius: 3 
    },
    activityChildsTextStyle:{
        textAlign: 'center', 
        color: '#4f4f4f',
        fontFamily: 'MontserratLight', 
    },
    moderateContainer:{
        height: 38, 
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5', 
        //marginTop: 10, 
        borderRadius: 3 
    },
    clickSedetary:{
        height: 38, 
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        //marginTop: 5, 
        borderRadius: 3 
    },
    clickModerate:{
        height: 38, 
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        borderRadius: 3 
    },
    clickedMale:{
        height: 38, 
        width: '43%', 
        //marginLeft: 16, 
        color:'white',
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
        color:'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    lightTouchableStyle:{
        height: 38, 
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5', 
        //marginTop: 8, 
        borderRadius: 3 
    },
    extremTouchableStyle:{
        height: 38, 
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5', 
        //marginTop: 10, 
        borderRadius: 3 
    },
    lightTextStyle:{
        textAlign: 'center', 
        color: '#4f4f4f' ,
        fontFamily: 'MontserratLight',
    },
    macroTextStyle:{
        color: '#4f4f4f' ,
        fontFamily: 'MontserratLight',
    },
    inputCaloriesContainer:{
        flex:1,
        width: '100%', 
        height: 140, 
        marginTop: 5, 
        borderRadius: 3, 
        flexDirection: 'row',
        flexWrap:'wrap', 
        backgroundColor: '#e5e5e5'
    },
    lastParaContainer:{
        flex:1,
        marginTop:10
    },
    lastParaStyle:{
        color: '#4f4f4f' ,
        fontFamily: 'MontserratLight'
    },
    btnContainer:{
        flex:1,
        flexDirection:'row',
        marginTop:10
    },
    forImg: {
        width: 16,
        height: 16,
        marginVertical: 5

    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        //borderRadius:2
    },
    clickBtnStyle:{
        height: 38,
        width: '90%', 
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        marginTop:8,
        borderRadius:3
    },
    validationInstruction:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
    },
    validationContainer:{
        marginTop:3
    },
    sedetaryAndLightClickedStyle:{
        height: 38,
        width: '90%', 
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:3
    },
    clickedExtremTouchableStyle:{
        height: 38, 
        width: '43%', 
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        //marginTop: 10, 
        borderRadius: 3 
    },
    clickedLightStyle:{
        height: 38,
        width: '43%', 
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:3
    },
    instructionContainer:{
        flex:0.2
    },
    heightContainer:{
        // height:70,
        // backgroundColor:'pink',
        // borderColor:'black',
        // borderWidth:3,
        flexDirection:'row',
        justifyContent:'space-between',
        //marginBottom:12
    },
    currentWeightContainer:{
      // height:70,
        // backgroundColor:'pink',
        // borderColor:'black',
        // borderWidth:3,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    goalWeightContainer:{
        // height:70,
        // backgroundColor:'pink',
        // borderColor:'black',
        // borderWidth:3,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    showValidationContainer:{
        flexDirection: 'row',
        height: 30, 
        justifyContent: 'space-between' ,
        //backgroundColor:'blue'
    },
    activityLevelInstruction:{
        flexDirection: 'row',
        height: 30, 
        //backgroundColor:'blue'
         justifyContent:'center',
         marginTop:10
    },
    currentMacroText:{
        color:'#000000',
        marginTop:10,
        
    },
    unitPara:{
        color:'#4f4f4f',
        fontFamily:'MontserratLight'
    },
    unitValueContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5
    },
    metrilClick:{
        height: 38, 
        width: '43%', 
        //marginLeft: 16, 
        color:'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    impClick:{
        height: 38, 
        width: '43%', 
        //marginLeft: 16, 
        color:'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    buttonStyle:{
        height: 38,
        width: '30%', 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5', 
        marginTop: 5, 
        borderRadius: 3 
    },
    clickedButton:{
        height: 38, 
        width: '30%', 
        //marginLeft: 16, 
        color:'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3 
    },
    genderTextStyle:{
        color: '#4f4f4f',
        fontFamily: 'MontserratLight',
        marginTop:12
    },
    maleClickedTextStyle:{
        color:'white',
        textAlign: 'center', 
        fontFamily: 'MontserratLight',
      },
    weightStatusBtn:{
        height: 38,
        width: '30%', 
        justifyContent: 'center', 
        backgroundColor: '#e5e5e5', 
        marginTop: 5, 
        borderRadius: 3
    },
    weightStatusClicked:{
        height: 38, 
        width: '30%', 
        //marginLeft: 16, 
        color:'white',
        justifyContent: 'center', 
        backgroundColor: '#FF6200', 
        marginTop: 5, 
        borderRadius: 3
    },
    fitnessTextStyle:{
        textAlign: 'center', 
        color: '#000000',
        fontFamily: 'MontserratLight'
    },
    validationInstruction:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
    },  
    
})

export default styles;