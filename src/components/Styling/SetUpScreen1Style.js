import { Alert, StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'red'
    },
    childContainer: {
        flex: 1,
        //backgroundColor: 'blue',
        marginHorizontal:20
    },
    headingContainer: {
        flex: 0.5,
        //backgroundColor: 'yellow',
        // marginLeft:20,
        // marginRight:20

    },
    headingStyle: {
        fontSize: 20,
        fontFamily: "MontserratExtraBold",
        color: '#A6A6A6',
    },
    paraContainer: {
        flex: 0.25,
        //backgroundColor: 'pink',

    },
    paraStyle: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
    },
    dateOfBirthContainer: {
        flex: 0.3,
        //backgroundColor: 'skyblue',
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row'

    },
    genderContainer: {
        flex: 0.5,
        //backgroundColor: 'green',
        marginTop: 10,
        flexDirection: 'row',


    },
    genderInputStyleMale: {
        flex: 1,
        fontFamily: 'MontserratLight',
        color: '#666666',
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#808080',
        borderWidth: 2,
        marginRight: 20,
        // paddingLeft: 16,
        textAlign: 'center'

    },
    genderInputStyleFemale: {
        flex: 1,
        fontFamily: 'MontserratLight',
        color: '#666666',
        //marginLeft: 20,
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#808080',
        borderWidth: 2,
        //marginRight: 20,
        //    paddingLeft: 16,
        textAlign: 'center'

    },
    textsStyle: {
        fontFamily: 'MontserratLight',
        color: '#A6A6A6',
    },
    btnContainer: {
        //flex: 0.5,
        //backgroundColor: 'gray',
        marginTop:70,
        //marginLeft:220,
        marginRight:20,
        //paddingLeft:200,
        flexDirection:'row',
        justifyContent:'flex-end'
        
    },
    reserv: {
        flex: 2,
        //backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20

    },
    caloriesBtnStyle: {
        flex: 0.7,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#FF6200',
        alignItems: 'center',
        borderRadius: 5,
        
    },
    maleContainer: {
        flex: 1
    },
    maleTouchableOpacity: {
        height: 38,
        width: '90%',
        //color:'#7e7e7e',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 3,
        //opacity: 0.4
    },
    maleTextStyle: {
        textAlign: 'center',
        //color: 'black',
        color: '#7e7e7e',
        //fontFamily: 'MontserratLight',
        //fontFamily: 'MontserratMedium',
        fontFamily: "MontserratExtraBold",
         //opacity:0.7


    },
    femaleContainer: {
        height: 38,
        width: '90%',
        marginLeft: 16,
        justifyContent: 'center',
        backgroundColor: '#e5e5e5',
        marginTop: 5,
        borderRadius: 3
    },
    clickBtnStyle: {
        // height: 38,
        // width: '90%', 
        // justifyContent:'center',
        // backgroundColor: '#FF6200',
        // alignItems:'center',
        // borderRadius:3
        // flex:2,
        height: 38,
        justifyContent: 'center',
        backgroundColor: '#FF6200',
        alignItems: 'center',
        borderRadius: 3,
        marginTop: 5,
        width: '90%',
        
        // opacity: 2.5
    },
    validationInstruction:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
    },
})

export default styles;