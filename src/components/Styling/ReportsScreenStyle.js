import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        marginHorizontal:20,
        //  width:screenWidth,
        //  height:screenHight,
        //backgroundColor:'yellow'
    },
    headingContainer:{
        height:'8%',
        //backgroundColor:'red',
        flexDirection:'row',
        marginTop:15
    
    },
    textStyleOne:{
        color:'black',
        fontFamily: "MontserratExtraBold",
        fontSize:20
    },
    textStyleTwo:{
        color:'black',
        fontFamily: "MontserratExtraBold",
        fontSize:20,
        marginLeft:10
    },
    arrowContainer:{
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
    bodyContainer:{
        flex:1,
        //backgroundColor:'skyblue',
        flexDirection:'row',
        marginBottom:50

    },
    cardLeft:{
        flex:1,
        //backgroundColor:'yellow',
        marginRight:7,
    },
    cardRight:{
        flex:1,
        //backgroundColor:'pink',
        marginLeft:7
    },
    weeklyStepWalk:{
        //borderWidth:2,
        //borderColor:'black',
        backgroundColor:'black',
        borderRadius:3,
        height:220
    },
    weightStatus:{
        //borderWidth:2,
        //borderColor:'black',
        borderRadius:3,
        marginTop:15,
        height:290,
        backgroundColor:'black',
        marginBottom:15

    },
    headingText:{
     marginLeft:12,
     marginTop:12,
     color:'white',
     fontFamily: "MontserratMedium",  
    fontSize:20  
    },
    spinerContainer:{
        height:70,
        marginLeft:12,
        marginTop:10
    },
    resultContainer:{
        flexDirection:'row',
    //    height:'6%',
       //backgroundColor:'red',
       marginLeft:14,
       marginTop:8
   },
   statusGraphContainer:{
    marginTop:8,
    // backgroundColor:'black'
   } ,
   midBox:{
    //   borderWidth:1,
      height:110,
      marginHorizontal:10,

   },
   borderLines1:{
       flexDirection:'row',
       justifyContent:'space-between',
       marginLeft:12,
       flexWrap:'wrap',
    //    borderWidth:1,
    //    borderColor:'white',
       height:22,
       width:'85%',
    //    marginLeft:14
   },
   weeksTextContainer:{
       flexDirection:'row',
       justifyContent:'space-between',
       //borderWidth:1,
    //    borderColor:'white',
        height:30,
       width:'87%',
       marginLeft:12,
   },
   kgTextOne:{
       color:'#FF6200',
       fontFamily:'MontserratLight',
       
   },
   kgTextTwo:{
    color:'#a6a6a6',
    fontFamily:'MontserratLight'
   },
   thisWeek:{
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
    fontSize:11
    
   },
   lastWeek:{
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
    fontSize:11

   },
   lostKg:{
    color:'#FF6200',
    fontFamily:'MontserratLight',
    marginLeft:14,
   },
   lostText:{
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
    marginLeft:14,
    fontSize:11
   },
   totalExerciseContainer:{
    //    borderWidth:2,
    //    borderColor:'black',
       borderRadius:3,
       backgroundColor:'black'

   },
   totalExercisHeading:{
       marginLeft:10,
       marginTop:10,
       fontSize:20,
       color:'white',
       fontFamily: "MontserratMedium",
         
   },
   exerciseResultCard:{
       borderBottomWidth:0.5,
       borderColor:'#a6a6a6',
       height:60,
       marginBottom:12,
       marginLeft:10,
       width:'90%',
       marginVertical:10
   },
   resultHeading:{
       color:'#a6a6a6',
       fontFamily:'MontserratLight',
       fontSize:12
   },
   timeShowContainer:{
        flexDirection:'row',
       borderRightWidth:0.5,
       borderColor:'#a6a6a6',
       width:70,
       height:25,
    //    marginTop:3
   },
   timeShow:{
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
    fontSize:11,
    marginTop:4
   },
   dataResultParent:{
       flexDirection:'row'
   },
   superScriptTextStyle:{
    fontSize:9,
    lineHeight:14,
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
   },
   dateAndMonth:{
    flexDirection:'row',
    borderLeftWidth:0.5,
    borderColor:'#a6a6a6',
    width:65,
    height:30,
   },
   dateAndMonthShow:{
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
    fontSize:11,
    marginTop:4,
    marginLeft:8
   },
   dateNumber:{
    fontSize: 11, 
    lineHeight: 23,
    marginLeft:4,
    color:'#a6a6a6',
    fontFamily:'MontserratLight',
   }

})

export default styles;