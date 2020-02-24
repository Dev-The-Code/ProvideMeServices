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
            nicNumber: '',
            address: '',
            position: 'top',
            singupvalue: this.props.navigation.state.params.singupvalue,


        }
    }

    CompleteRegisteration = async () => {
        const { navigate } = this.props.navigation;
        const { nicNumber, address, singupvalue } = this.state;


        singupvalue.nicNumber = this.state.nicNumber
        singupvalue.address = this.state.address
        console.log("singupvalue")
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

    }

    render() {
        const FullName = this.state.singupvalue.name + this.state.singupvalue.lastName;
        console.log('FullName>>>>', FullName)
        const { shortPrice, medical, transformation, partum, singupvalue, nicNumber, address } = this.state;
        const { navigate, } = this.props.navigation;
        console.log('signupvalue>>>', singupvalue)

        return (
            <ScrollView>
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
                                <Text style={styles.inputTexts}>
                                    {FullName}
                                </Text>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 5, marginVertical: -50, }}>
                            <View style={{ marginVertical: 8, marginTop: 5, }}>
                                <Text style={styles.textsStyles}>Mobile number</Text>
                            </View>
                            <View style={styles.inputFields}>
                                <Text style={styles.inputTexts}>
                                    {this.state.singupvalue.mobileNo}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 50, paddingHorizontal: 5, }}>
                            <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                <Text style={styles.textsStyles}>CNIC Number</Text>
                            </View>
                            <View style={styles.inputFields}>
                                <TextInput onChangeText={text => {
                                    this.setState({ nicNumber: text })
                                }}
                                    placeholder="xxxxx-xxxxxxx-x"
                                    placeholderTextColor="#7e7e7e"
                                    value={nicNumber}
                                    style={styles.inputTexts} />
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 5, }}>
                            <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                <Text style={styles.textsStyles}>Address</Text>
                            </View>
                            <View style={styles.inputFields}>
                                <TextInput onChangeText={text => {
                                    this.setState({ address: text })
                                }}
                                    placeholder="Complete Home Address"
                                    placeholderTextColor="#7e7e7e"
                                    value={address}
                                    style={styles.inputTexts} />
                            </View>
                        </View>
                        <View style={{ marginTop: 50, paddingHorizontal: 5, }}>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', }} onPress={this.CompleteRegisteration}>
                                <View style={styles.markBtnCont}>
                                    <Text style={styles.markText}>
                                        Complete Registeration
                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>
            </ScrollView>


        )
    }
}

export default CompleteReg;