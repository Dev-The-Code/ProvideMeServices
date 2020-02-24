import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Picker,
    Option
} from 'react-native';

import styles from '../Styling/UserTypeStyle';
//import AsyncStorage from '@react-native-community/async-storage';
import HttpUtilsFile from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast';
const { heightDimension } = Dimensions.get('window').height;

let singupvalue;

class UserType extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            userObj: this.props.navigation.state.params.userObj,
            service: ''

        }
    }

    seekerValue = (value) => {
        const { navigate } = this.props.navigation;
        if (value == 'seeker') {
            this.setState({
                service: 'seeker'

            },
                async () => {
                    singupvalue = this.state.userObj
                    singupvalue.service = this.state.service
                    console.log(singupvalue, 'userobj>>>')
                    try {
                        let sendData = await HttpUtilsFile.post('signup', singupvalue);
                        console.log('data send >>>', sendData)
                        if (sendData.code == 200) {
                            this.setState({
                                isLoading: false
                            }, () => {
                                navigate('Login')
                            })

                        }
                    }

                    catch (err) {
                        console.log(err)
                    }
                })

        }
        else if (value == 'provider') {
            this.setState({
                service: 'provider'

            }, () => {
                singupvalue = this.state.userObj
                singupvalue.service = this.state.service
                console.log(singupvalue, 'userobj>>>')
            })
        }
    }


    render() {
        const { service, userObj } = this.state;
        const { navigate, } = this.props.navigation;
        // console.log(this.state.userObj)
        // console.log(this.state.service, 'service>>>')
        return (
            <View style={{ flex: 1, height: heightDimension, }} >
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Select User Type</Text>
                    </View>
                    <View style={styles.line}>
                        <Text style={styles.lineText}>How do you intend to use this app?</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', }}>
                    <TouchableOpacity style={{ paddingBottom: 150 }}
                        onPress={() => {
                            // navigate('BottomTabe');
                            this.seekerValue('seeker');
                        }} >
                        <View style={styles.seekContainer}>
                            <View style={styles.seekServiceContainer}>
                                <Image source={require('../icons/profile.png')} style={styles.seekPicStyle} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View >
                        <TouchableOpacity style={{ paddingBottom: 200 }}
                            // onPress={() => navigate('CompleteReg', { service: service })}
                            onPress={() => {
                                this.seekerValue('provider');
                                navigate('CompleteReg', { singupvalue: this.state.userObj })
                            }}
                        >
                            <View style={styles.providerContainer}>
                                <View style={styles.providerServiceContainer}>
                                    <Image source={require('../icons/profile.png')} style={styles.providerPicStyle} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >





        )

    }
}

export default UserType;