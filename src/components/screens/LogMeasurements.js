import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styling/LogMeasurementsStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast';
// import PickDate from '../Common/datePicker';
// import DatePicker from 'react-native-datepicker';
import OverlayLoader from '../Loader/OverlaySpinner'

const { height } = Dimensions.get('window');

class LogMeasurementsScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            dayOfMonth: '',
            monthNo: '',
            year: '',
            time: '',
            weight: '',
            neck: '',
            shoulder: '',
            biceps: '',
            chest: '',
            waist: '',
            thigh: '',
            day: '',
            userId: '',
            data: '',
            filterData: [],
            weightValidation: false,
            neckValidation: false,
            shoulderValidation: false,
            bicepsValidation: false,
            chestValidation: false,
            waistValidation: false,
            thighValidation: false,
            isLoading: false,
            position: 'top',
            monthArr: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    }

    
    componentWillMount() {
        let month;
        const { dayOfMonth } = this.state;
        let monthNo = new Date().getMonth() + 1;
        const day = new Date().getDay();
        const date = new Date().getDate();
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (monthNo == 1 || monthNo == 2 || monthNo == 3 || monthNo == 4 || monthNo == 5 || monthNo == 6 || monthNo == 7 || monthNo == 8 || monthNo == 9) {
            month = `0${monthNo}`;
        }
        else {
            month = monthNo;
            //console.log('month >>', month)
        }
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    userId: dataFromLocalStorage._id,
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    day: day,
                    dayOfMonth: date,
                    monthNo: monthNo,
                    year: year,
                })
            }
        });
    }
    toastFunction = (text, position, duration, withStyle) => {
        this.setState({
            position: position,
        })
        if (withStyle) {
            this.refs.toastWithStyle.show(text, duration);
        } else {
            this.refs.toast.show(text, duration);
        }
    }


    addWeight = async () => {
        const {
            weight,
            monthNo,
            monthArr,
            weekDay,
            day,
            userId,
            date,
            time,
            dayOfMonth,
            neck,
            shoulder,
            biceps,
            chest,
            waist,
            thigh,
            year
        } = this.state;
        // console.log('Neck -->', neck, 'Shoulder -->', shoulder)
        let addWeight = {}
        // if (weight == '') {
        //     this.setState({
        //         weightValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         weightValidation: false,
        //         isLoading:false,
        //     })
        // }
        // if (neck == ''){
        //     this.setState({
        //         neckValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         neckValidation: false,
        //         isLoading:false,
        //     })
        // }
        // if(shoulder == ''){
        //     this.setState({
        //         shoulderValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         shoulderValidation: false,
        //         isLoading:false,
        //     })
        // }
        // if(biceps == ''){
        //     this.setState({
        //         bicepsValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         bicepsValidation: false,
        //         isLoading:false,
        //     })
        // }
        // if(chest == ''){
        //     this.setState({
        //         chestValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         chestValidation: false,
        //         isLoading:false,
        //     })
        // }

        // if(waist == ''){
        //     this.setState({
        //         waistValidation: true,
        //         isLoading:false,
        //     })
        // }
        // else {
        //     this.setState({
        //         waistValidation: false,
        //         isLoading:false,
        //     })
        // }
        // if(thigh == ''){
        //     this.setState({
        //         thighValidation: true,
        //         isLoading:false,
        //     })

        // }
        // else {
        //     this.setState({
        //         thighValidation: false,
        //         isLoading:false,
        //     })
        // }

        if (weight != '' || neck != '' || shoulder != '' || biceps != '' || chest != '' || waist != '' || thigh != '') {
            addWeight.weight = weight + ' KG';
            addWeight.neck = neck + ' Inches';
            addWeight.shoulder = shoulder + ' Inches';
            addWeight.biceps = biceps + ' Inches';
            addWeight.chest = chest + ' Inches';
            addWeight.waist = waist + ' Inches';
            addWeight.thigh = thigh + ' Inches';
            addWeight.month = monthArr[monthNo];
            addWeight.day = weekDay[day];
            addWeight.dayOfMonth = dayOfMonth;
            addWeight.date = date;
            addWeight.time = time;
            addWeight.dayOfWeek = day + 1;
            addWeight.month = monthNo;
            addWeight.year = year;
            addWeight.userId = userId;
            this.setState({
                isLoading: true
            })
            //console.log(addWeight, 'addWeight')
            let dataUser = await HttpUtils.post('weightLog', addWeight)
            //console.log(dataUser, 'dataUser')
            let userMsg = dataUser.msg;
            if (dataUser.code) {
                this.setState({
                    isLoading: false
                }, () => {
                    this.toastFunction(userMsg, this.state.position, DURATION.LENGTH_LONG, true)
                    this.props.navigation.navigate('BottomTabe')
                })
            }
            else if (!dataUser.code) {
                this.setState({
                    isLoading: false
                }, () => {
                    this.toastFunction('Some thing went wrong', this.state.position, DURATION.LENGTH_LONG, true)
                })
            }
        }

    }

    //filtration with date
    dateFilter = async (e) => {
        const { data, date } = this.state;
        let dataArr = [];
        for (var i in data) {
            let dataFilter = data[i];
            if (e == undefined) {
                if (dataFilter.date == date) {
                    dataArr = [...dataArr, dataFilter]
                    this.setState({
                        filterData: dataArr
                    })
                }
            }
            else if (e != undefined) {
                if (dataFilter.date == e) {
                   // console.log('condition true')
                    dataArr = [...dataArr, dataFilter]
                    this.setState({
                        filterData: dataArr,
                        date: e
                    })
                }
            }
        }
    }

    getData = async () => {
        let dataUser = await HttpUtils.get('getweightlog')
       // console.log(dataUser, 'dataUser from log ')
        await this.setState({
            data: dataUser.content
        })
        await this.dateFilter()
    }
    render() {
        const {
            weightValidation,
            neckValidation,
            shoulderValidation,
            bicepsValidation,
            chestValidation,
            waistValidation,
            thighValidation,
            isLoading,
            neck,
            shoulder,
            date
        } = this.state;
        // console.log('Neck -->>', neck , 'Shoulder-->>',shoulder)
        //console.log('date >>', date)
        return (
            <View style={styles.mainContainer}>


                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    {/* <View style={styles.childContainer}> */}
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                             Measurements Log
                            </Text>
                    </View>

                    <Text style={styles.labelTextWeight}>Weight</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="0"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputTextStyle}
                            keyboardType={"numeric"}
                            maxLength={3}
                            onChangeText={(weight) => this.setState({ weight: weight })}
                        />
                        <View style={styles.unitTextStyle}><Text style={styles.textStyle}>KG</Text></View>
                    </View>
                    <View style={styles.validationContainer}>
                        {weightValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Weight </Text>
                            : null}
                    </View>
                    <Text style={styles.labelText}>Neck</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="0"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputTextStyle}
                            keyboardType={"numeric"}
                            maxLength={3}
                            onChangeText={(neck) => this.setState({ neck: neck })}
                        />
                        <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                    </View>
                    <View style={styles.validationContainer}>
                        {neckValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Neck Value </Text>
                            : null}
                    </View>
                    <Text style={styles.labelText}>Shoulder</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="0"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputTextStyle}
                            keyboardType={"numeric"}
                            maxLength={3}
                            onChangeText={(shoulder) => this.setState({ shoulder: shoulder })}
                        />
                        <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                    </View>
                    <View style={styles.validationContainer}>
                        {shoulderValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Shoulder Value </Text>
                            : null}
                    </View>
                    <Text style={styles.labelText}>Biceps</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="0"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputTextStyle}
                            keyboardType={"numeric"}
                            maxLength={3}
                            onChangeText={(biceps) => this.setState({ biceps: biceps })}
                        />
                        <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                    </View>
                    <View style={styles.validationContainer}>
                        {bicepsValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Biceps </Text>
                            : null}
                    </View>
                    <Text style={styles.labelText}>Chest</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="0"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputTextStyle}
                            keyboardType={"numeric"}
                            maxLength={3}
                            onChangeText={(chest) => this.setState({ chest: chest })}
                        />
                        <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                    </View>
                    <View style={styles.validationContainer}>
                        {chestValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Chest </Text>
                            : null}
                    </View>
                    <Text style={styles.labelText}>Waist</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="0"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputTextStyle}
                            keyboardType={"numeric"}
                            maxLength={3}
                            onChangeText={(waist) => this.setState({ waist: waist })}
                        />
                        <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                    </View>
                    <View style={styles.validationContainer}>
                        {waistValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Waist </Text>
                            : null}
                    </View>
                    <Text style={styles.labelText}>Thigh</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="0"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputTextStyle}
                            keyboardType={"numeric"}
                            maxLength={3}
                            onChangeText={(thigh) => this.setState({ thigh: thigh })}
                        />
                        <View style={styles.unitTextStyle}><Text style={styles.textStyle}>Inches</Text></View>
                    </View>
                    <View style={styles.validationContainer}>
                        {thighValidation ?
                            <Text style={styles.validationInstruction}>Please Enter Your Thigh </Text>
                            : null}
                    </View>
                    {isLoading ? <OverlayLoader /> : null}
                    <View style={styles.btnContainer}>
                        <CaloriesSetupBtn title="Save Measurements"
                            caloriesBtnStyle={styles.caloriesBtnStyle}
                            onPress={this.addWeight}
                        />
                    </View>

                    <Toast ref="toastWithStyle"
                        style={{ backgroundColor: '#FF6200' }}
                        position={this.state.position}
                        positionValue={50}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white', fontFamily: 'MontserratLight', }}
                    />


                    {/* <View style={styles.weightListsContainer}>
                            {filterData.length >= 0 && filterData.map((elem, key) => (
                                <View style={styles.weightListOne}>
                                    <Text style={styles.weightNumberStyle}>{elem.weight} KG</Text>
                                    <Text style={styles.weightTextStyle}>{`Weight on ${elem.day}, ${elem.month} ${elem.dayOfMonth}th`}</Text>
                                </View>
                            ))
                            }
                        </View> */}
                    {/* </View> */}
                </ScrollView>

            </View>
        )

    }
}
export default LogMeasurementsScreen;