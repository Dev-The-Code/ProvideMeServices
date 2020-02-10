import React from 'react';
import { Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';


class ToastComponent extends React.Component{
constructor(props){
    super(props);

    this.state={
        position:'top',
        style:{}
    }
}

// onClick = (text, position, duration,withStyle)=> {
//     this.setState({
//         position: position,
//     })
//     if(withStyle){
//         this.refs.toastWithStyle.show(text, duration);
//     }else {
//         this.refs.toast.show(text, duration);
//     }
// }

// getButton = (text, position, duration,withStyle) =>{
//     return(
//         <TouchableOpacity
//             style={{padding: 10}}
//             onPress={()=>this.onClick(text, position, duration,withStyle)}>
//             <Text>{text}</Text>
//         </TouchableOpacity>
//     )
// }


render(){
    console.log(this.props.pressFunc)
    return(
        <View style={styles.container}>
             {/* {this.getButton('LENGTH_SHORT+stop', 'top', DURATION.LENGTH_SHORT)}
                {this.getButton('LENGTH_SHORT+bottom', 'bottom', DURATION.LENGTH_SHORT)}
                {this.getButton('LENGTH_LONG+top', 'top', DURATION.LENGTH_LONG)}
                {this.getButton('LENGTH_LONG+bottom', 'bottom', DURATION.LENGTH_LONG)} */}
                {/* {this.getButton('LENGTH_LONG+top+custom style', 'top', DURATION.LENGTH_LONG,true)} */}
                {this.props.pressFunc}
                {/* <Toast ref="toast" position={this.state.position}/> */}
                <Toast ref="toastWithStyle" 
                style={{backgroundColor:'#FF6200'}} 
                position={this.state.position}
                positionValue={50}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{color:'white',fontFamily: 'MontserratLight',}}
                />
        </View>
    )
}

}
export default ToastComponent;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})