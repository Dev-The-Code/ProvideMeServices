import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../Styling/SetUpScreen1Style';
import TextInputs from '../textInputs/TextInputs';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import OverlayLoader from '../Loader/OverlaySpinner';
const screenWidth = Dimensions.get('window').width;
const { heightDimension } = Dimensions.get('window');

class Setupscreen1 extends React.Component {
    static navigationOptions = (navigation) => {
        return {
            headerStyle: {
                backgroundColor: 'black'
            },
            headerTintColor: 'white'
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            dob: '',
            gender: '',
            dobValidation: false,
            genderValidation: false,
            male: false,
            female: false,
            date: "",
            time: '',
            userId: '',
            //dob: '',
            isLoading: false,
        }
    }
    componentWillMount() {
        let monthNo = new Date().getMonth();
        console.log('mont No >>>', monthNo)
        const date = new Date().getDate();
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (monthNo == 1 || monthNo == 2 || monthNo == 3 || monthNo == 4 || monthNo == 5 || monthNo == 6 || monthNo == 7 || monthNo == 8 || monthNo == 9) {
            month = `${monthNo + 1}`;
        }
        else {
            month = monthNo + 1;
        }
        AsyncStorage.getItem("currentUser").then(value => {
           // console.log('user data >>>',value)
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    userId: dataFromLocalStorage._id,
                })
            }
        });
    }

    getGender(gender) {
        if (gender == 'male') {
            this.setState({
                male: true,
                female: false,
                gender: 'male'
            })
        }
        else if (gender == 'female') {
            this.setState({
                male: false,
                female: true,
                gender: 'female'
            })
        }
    }

    nextStep = () => {
        const { dob, date, time, userId } = this.state;
        const { navigate } = this.props.navigation;

        if (dob == '') {
            this.setState({
                dobValidation: true
            })
        }
        else {
            this.setState({
                dobValidation: false
            })
        }
        // if (gender == '') {
        //     this.setState({
        //         genderValidation: true
        //     })
        // }
        // else {
        //     this.setState({
        //         genderValidation: false
        //     })
        // }
        if (dob != '' && date != '' && time != '' && userId != '') {
            navigate('Setupscreen', {
                dob: dob,
                date: date,
                time: time,
                userId: userId
            });
            // navigate('Setupscreen')
        }
    }

    render() {
        const { dobValidation, genderValidation, male, female, date, dob,isLoading } = this.state;
        console.log('current date >>>',date)
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'black', height: heightDimension }} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.mainContainer}>
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Set Up Your App
                      </Text>
                        </View>
                        <View style={styles.paraContainer}>
                            <Text style={styles.paraStyle}>
                                GetFitAthletic needs the following into to help you with your fitness journey.
                      </Text>
                        </View>
                        <Text style={styles.textsStyle}>Date Of Birth</Text>
                        <View style={styles.dateOfBirthContainer}>
                            <DatePicker
                                style={{ width: 200 }}
                                date={dob} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                placeholderTextColor="#7e7e7e"
                                format="DD-MM-YYYY"
                                minDate="01-01-1950"
                                maxDate={date}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        width: 0,
                                        height: 0,
                                    },
                                    dateInput: {
                                        backgroundColor:'white',
                                        //opacity:0.4
                                        color:'black'
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ dob: date }) }}
                            />
                            {/* <TextInputs placeholder={'Tab to set...'} /> */}
                        </View>
                        {dobValidation ?
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.validationInstruction}>
                                    Please fill date of birth
                                    </Text>
                            </View>
                            : null}
                        {/* <View> */}
                        {/* <Text style={styles.textsStyle}>Gender</Text>
                        <View style={styles.genderContainer}>
                            {/* <TextInput placeholder="Male" style={styles.genderInputStyleMale} />
                            <TextInput placeholder="Female" style={styles.genderInputStyleFemale} /> */}
                            {/* <View style={styles.maleContainer}>
                                <TouchableOpacity
                                    style={male ? styles.clickBtnStyle : styles.maleTouchableOpacity}
                                    onPress={this.getGender.bind(this, 'male')}>
                                    <Text style={styles.maleTextStyle}>
                                        Male
                                        </Text>
                                </TouchableOpacity>
                            </View> */}
                            {/* <View style={styles.maleContainer}>
                                <TouchableOpacity
                                    style={female ? styles.clickBtnStyle : styles.maleTouchableOpacity}
                                    onPress={this.getGender.bind(this, 'female')}>
                                    <Text style={styles.maleTextStyle}>
                                        Female
                                        </Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                        {/* {genderValidation ?
                            <View style={{ marginVertical: 3 }}>
                                <Text style={styles.validationInstruction}>
                                    Please select the gender
                                    </Text>
                            </View>
                            : null}  */}
                        {/* </View> */}
                        <View style={styles.btnContainer}>
                            {/* <Text style={{
                               // backgroundColor:'red'
                               color:'white'
                                
                            }}>For Button</Text> */}
                            <CaloriesSetupBtn title="Next >"
                                //  onPress={() => { navigate('Setupscreen') }} 
                                onPress={this.nextStep}
                                caloriesBtnStyle={styles.caloriesBtnStyle} />
                        </View>
                    {/* </View> */}
                    <View style={styles.reserv}></View>

                </View>
            </ScrollView>
        )
    }
}

export default Setupscreen1;

