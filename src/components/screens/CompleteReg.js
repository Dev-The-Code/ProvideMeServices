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

import { SearchBar } from 'react-native-elements';

import styles from '../Styling/CompleteRegStyle';

import HttpUtilsFile from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast';

import CaloriesSetupBtn from '../buttons/setUpBtn';
const { heightDimension } = Dimensions.get('window').height;

class CompleteReg extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shortPrice: true,
            medical: true,
            transformation: true,
            partum: true,
            name: '',
            email: '',
            number: '',
            position: 'top',
        }
    }

    render() {
        const { shortPrice, medical, transformation, partum } = this.state;
        const { navigate } = this.props.navigation;

        return (

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}   >
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Complete Your Registeration</Text>
                    </View>


                    <View style={styles.paraContainer}>
                        <Text style={styles.paraText}>
                            Enter your details below to complete your registeration as a service provider.
                 </Text>
                    </View>
                    <View style={{ marginBottom: 50, paddingHorizontal: 5, }}>
                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                            <Text style={styles.textsStyles}>Full Name</Text>
                        </View>
                        <View style={styles.inputFields}>
                            <TextInput
                                placeholder="Muhammad Farhan"
                                placeholderTextColor="#7e7e7e"
                                style={styles.inputTexts} />
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 5, }}>
                        <View style={{ marginVertical: 8, marginTop: 5, }}>
                            <Text style={styles.textsStyles}>Mobile number</Text>
                        </View>
                        <View style={styles.inputFields}>
                            <TextInput
                                placeholder="0341 3334445"
                                placeholderTextColor="#7e7e7e"
                                style={styles.inputTexts} />
                        </View>
                    </View>

                    <View style={{ marginTop: 50, paddingHorizontal: 5, }}>
                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                            <Text style={styles.textsStyles}>CNIC Number</Text>
                        </View>
                        <View style={styles.inputFields}>
                            <TextInput
                                placeholder="xxxxx-xxxxxxx-x"
                                placeholderTextColor="#7e7e7e"
                                style={styles.inputTexts} />
                        </View>
                    </View>

                    <View style={{ marginTop: 50, paddingHorizontal: 5, }}>
                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                            <Text style={styles.textsStyles}>Address</Text>
                        </View>
                        <View style={styles.inputFields}>
                            <TextInput
                                placeholder="Complete Home Address"
                                placeholderTextColor="#7e7e7e"
                                style={styles.inputTexts} />
                        </View>
                    </View>
                    <View style={{ marginTop: 50, paddingHorizontal: 5, }}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', }}>
                            <View style={styles.markBtnCont}>
                                <Text style={styles.markText}>
                                    Complete Registeration
                    </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>



            </View>


        )
    }
}

export default CompleteReg;