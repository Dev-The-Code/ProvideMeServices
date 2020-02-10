import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    cardContainer:{
        width:335,
        borderRadius:5,
        backgroundColor:'black',
        padding:15
    },
    dateWithCancelIcon:{
        flexDirection:'row',
        justifyContent:'space-between'

    },
    iconStyle:{
        height:18,
    },
    borderLineStyle:{
        borderBottomWidth: 0.7, 
        borderColor: '#a6a6a6',
         width: 100 
    }
})

export default styles;