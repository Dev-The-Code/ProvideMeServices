import React from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
//import Button from 'apsl-react-native-button'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class InputImgsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // username:''
            height: 10
        }
    }

    render() {
        // console.log(this.state.username)
        return (
            <View style={styles.container}>
                
                <TouchableOpacity style={this.props.touchableOpacityOne} activeOpacity={0.8}
                    onPress={this.props.decreamentValue}>
                    <Image source={this.props.iconMinus} style={styles.forImg} />
                </TouchableOpacity>
                <View style={styles.textInputContainer}>
                    <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={this.props.style}
                        type="number"
                        onChangeText={this.props.getHeightWeight}
                        
                    />
                    
                </View>
                <TouchableOpacity style={this.props.touchableOpacityTwo} activeOpacity={0.8}
                    onPress={this.props.increamentValue}>
                    <Image source={this.props.iconPlus} style={styles.forImg} />
                </TouchableOpacity>
            
            </View>
        )
    }
}

export default InputImgsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
        // width: screenWidth,
        // height: screenHeight
    },
    forImg: {
        width: 16,
        height: 16,
        marginVertical: 5

    },
    touchableOpacityOne: {
        flex: 1,
        padding: 5,
        marginVertical: 5,
        backgroundColor: 'gray',
        height: 40,
        opacity: 0.6

    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        //borderRadius:2
    },
    // textInputStyle:{
    //     flex:1,
    //     height: 40,
    //     textAlign: 'center', 
    //     backgroundColor: 'gray',

    // },
    touchableOpacityTwo: {
        flex: 1,
        padding: 5,
        marginVertical: 5,
        alignItems: 'flex-end',
        backgroundColor: 'gray',
        paddingRight: 5,
        marginRight: 12,
        height: 40
    },
})