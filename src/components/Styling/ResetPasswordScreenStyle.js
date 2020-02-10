import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      width:screenWidth,
      height:screenHight

    },
    container:{
        flex:1,
        // backgroundColor:'white',
        marginHorizontal:20
    },
    resetPasswrdContainer:{
        flex:0.25,
        //flexDirection:'row',
        justifyContent:'flex-start',
        //backgroundColor:'red'
        //backgroundColor:'red'
    },
    resetTextStyle:{
        fontFamily: "MontserratExtraBold",
        fontSize:17,
        color: '#A6A6A6',
        // marginLeft:20,
        marginTop:5,
        
    },
    inputFields:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
       // backgroundColor:'yellow'
        
        
      },
      inputTextStyle:{
            flex: 1,
            fontFamily: 'MontserratLight',
            color: '#666666',
            // fontSize: 23,
            //marginLeft: 20,
            height: 40,
            //borderColor: 'gray',
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            //marginRight: 20,
            paddingLeft: 16,
            
      },
    
      textsStyles:{
        fontFamily:'MontserratLight',
        color: '#A6A6A6',
        
      },
    btnContainerStyle:{
        flex:2,
       // backgroundColor:'gray',
        flexDirection:"row",
        justifyContent:'center',
    
       
    },
    emailTextStyle:{
        color: '#A6A6A6',
        marginTop:15,
        fontFamily:'MontserratLight',
           
    },
    btnContainer:{
        flex:3,
     
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
     errorInput:{
        borderWidth:3,
        borderColor:'red',
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
      emailExistContainer:{
        marginVertical:8,
        marginBottom:15,
        alignItems:'center',
      },
      emailNotExistStyle:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
      },
      
    

})  

export default styles ;