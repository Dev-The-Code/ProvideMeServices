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

class UserType extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        const { navigate } = this.props.navigation;
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
                    <TouchableOpacity style={{ paddingBottom: 150 }} onPress={() => navigate('BottomTabe')} >
                        <View style={styles.seekContainer}>
                            <View style={styles.seekServiceContainer}>
                                <Image source={require('../icons/profile.png')} style={styles.seekPicStyle} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View >
                        <TouchableOpacity style={{ paddingBottom: 200 }} onPress={() => navigate('CompleteReg')} >
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