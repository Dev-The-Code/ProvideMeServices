import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //marginTop:20,
      width:screenWidth,
      height:screenHight
    },
    childContainer:{
      flex:0.7,
      justifyContent:'flex-start',
     // backgroundColor: '#deb887',
      marginHorizontal:20
    },
    heading:{
      flex:1,
      flexDirection:'row',
      marginTop:10
      //backgroundColor:'red'
    },
    headingText: {
      fontFamily: "MontserratExtraBold",
      fontSize:17,
      // textAlign: 'center',
      // margin: 10,
      color:'#000000'
    },
    
    forText: {
      fontFamily: 'MontserratLight',
      fontSize:15
    },
  });

  export default styles;