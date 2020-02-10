import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, TextInput, Button, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/StepCountScreenStyle';
import DatePicker from 'react-native-datepicker';
import HttpUtilsFile from '../Services/HttpUtils';
import AsyncStorage from '@react-native-community/async-storage';
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
// import moment from 'moment';
import Linechart from '../chartKit/lineChart'
import {
    DeviceEventEmitter // will emit events that you can listen to
} from 'react-native';
import { NativeAppEventEmitter } from 'react-native';
import { SensorManager } from 'NativeModules';
import GoogleFit, { Scopes } from 'react-native-google-fit'
import { NativeModules } from 'react-native';
import { thisExpression } from '@babel/types';
import OverlayLoader from '../Loader/OverlaySpinner';
//import { TextInput } from 'react-native-gesture-handler';
const rnHealthKit = NativeModules.RNHealthKit;

const { heightDimension } = Dimensions.get('window');
const date = new Date().getDate();



export default class StepCountScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            data: '',
            curTime: '',
            filterData: [],
            pedometerData: '',
            currentTime: new Date().toLocaleString(),
            targetTime: '',
            isPedometerAvailable: "checking",
            pastStepCount: 0,
            currentStepCount: 0,
            currntDate: '',
            timer: null,
            matchTimer: null,
            minutes_Counter: '00',
            seconds_Counter: '00',
            hour_Counter: '0',
            startDisable: false,
            achieve: false,
            allDataUser: [],
            userCurrentWeight: '',
            weightNoUnit: '',
            currentCalories: '',
            currentSteps: '',
            secTime: '',
            firstValue: '',
            secondValue: '',
            thirdValue: '',
            goalSteps: '',
            stepTime: '',
            currentUserId: '',
            showButton: false,
            isLoading: false,
            userId: '',
            stepGoalCountData: '',
            showAlert: false,
            timeWatch: '',
            eightToSixteen: false,
            sixteenTo23: false,
            oneToEight: false,
            tapLoad: true,
            stepsPercentage:''

        }

    }



    // googleFitAuthFun=()=>{
    //     const options = {
    //         scopes: [
    //           Scopes.FITNESS_ACTIVITY_READ_WRITE,
    //           Scopes.FITNESS_BODY_READ_WRITE,
    //         ],
    //       }
    //       GoogleFit.authorize(options)
    //         .then(authResult => {
    //           if (authResult.success) {
    //             // dispatch("AUTH_SUCCESS");
    //             console.log( authResult.success)
    //           } else {
    //             //dispatch("AUTH_DENIED", authResult.message);
    //             console.log(authResult.message)
    //           }
    //         })
    //         .catch((err) => {
    //           //dispatch("AUTH_ERROR");
    //           console.log(err)

    //         })
    // }

    // getGoalStepData = () => {
    //     //console.log('run function get goal steps')
    //     const { navigation } = this.props;
    //     this.focusListener = navigation.addListener('didFocus', () => {
    //         //    this.getData()
    //         AsyncStorage.getItem('goalSteps').then((value) => {
    //             if (value) {
    //                 const goalStepsValue = JSON.parse(value);
    //                 console.log('user steps >>', goalStepsValue);
    //                 this.setState({
    //                     goalSteps: goalStepsValue
    //                 })
    //             }
    //         })
    //     });

    // }
    async componentWillMount() {
        await this.getData()
        this.dateFilter()
        //this.getGoalStepData();
        const paramsData = this.props.navigation.state.params;
        console.log('params data >>>', paramsData)
        this.setState({
            goalSteps: paramsData.goalSteps,
            pedometerData:paramsData.pedometerData
        })
        //this.googleFitAuthFun()
        AsyncStorage.getItem('pedometerData').then((value) => {
            if (value) {
                //const setValue = JSON.parse(value);
                console.log('local storage pedometer >>>', value)
                this.setState({
                    pedometerData: value
                })
            }
        })
        this.matchTime();
        this._startPedometer();
    }

    checkFunc(data) {
        //console.log('data will update >>', data);
        this.setState({
            abc: data
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { goalSteps } = this.state;
        const goalStep = goalSteps;
        //console.log('number form goal >>', Number(goalSteps))
        if (prevState.pedometerData == Number(goalStep)) {
            //console.log('Condition successfully matched ');
            Alert.alert('Acheive Goal');
            this.sendDataPedometer();
        }
        
    }


    //get data from database
    getData = () => {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes
        const sec = new Date().getSeconds(); //Current Seconds
        const currentTime = hours + ':' + min + ':' + sec;
        //console.log('current time >>>', currentTime)
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        //let dataUser = await HttpUtils.get('getallexerciselog')
        //try {
        AsyncStorage.getItem('currentUser').then((value) => {
            if (value) {
                let dataUser = JSON.parse(value);
                console.log(dataUser)
                this.setState({
                    currentUserId: dataUser._id
                })
            }


        })





        // }
        // catch (error) {
        //     console.log(error)
        // }
        this.setState({
            date: date + '-' + month + '-' + year,
            curTime: currentTime
            //data: dataUser.content
        })
    }

    // dataPost = async () => {
    //     const dataPost = {
    //         userId: this.state.currentUserId,
    //         time: this.state.curTime,
    //         date: this.state.date,
    //         stepCount: 120,
    //         dailGoal: 300
    //     }
    //     try {
    //         let postedData = await HttpUtilsFile.post('pedometer', dataPost)
    //         console.log('posted data >>>', postedData)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    //filtration with date
    dateFilter = (e) => {
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
                    dataArr = [...dataArr, dataFilter]
                    this.setState({
                        filterData: dataArr,
                        date: e
                    })
                }
            }
        }
    }

    sendDataPedometer = async () => {
        const dataPost = {
            userId: this.state.currentUserId,
            time: this.state.curTime,
            date: this.state.date,
            stepCount: this.state.pedometerData,
            dailGoal: this.state.goalSteps
        }
        try {
            let postedData = await HttpUtilsFile.post('pedometer', dataPost)
            console.log('posted data >>>', postedData)
            if (postedData.code == 200) {
               console.log('data sumbit')
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    _startPedometer() {
        const { params } = this.props.navigation.state;
        console.log('Pedometer Function')
        this.setState({ tapLoad: false,})
        //this.matchTime()
        this.updateTime()
        //console.log('all data of user >>>',this.state.allDataUser)
        this.countStepTime()

        //console.log('watch time >>', this.state.timeWatch)

        //Sensor Manager For Stepcount

        SensorManager.startStepCounter(1000);
        DeviceEventEmitter.addListener('StepCounter', (data) => {
            console.log('sensor manager data -->>', data)
            params.pedometerFun(data.steps)
            this.setState({ pedometerData: data.steps }, () => {
                if (data.steps > Number(1)) {
                    //this.countStepTime()
                    if (this.state.eightToSixteen == true) {
                        this.setState({
                            firstValue: data.steps
                        })
                    }
                    else if (this.state.sixteenTo23 == true) {
                        this.setState({
                            secondValue: data.steps
                        })
                    }
                    else if(this.state.oneToEight == true){
                        this.setState({
                            thirdValue: data.steps
                        })

                    }
                    const multiplySteps = data.steps / Number(this.state.goalSteps);
                    //console.log('multiply >>',multiplySteps);
                    const divideSteps = multiplySteps*100;
                    //console.log('divided >>',divideSteps )
                    const roundedValue = Math.round(divideSteps);
                    //console.log('percentage steps >>',roundedValue)
                    this.setState({
                        stepsPercentage:roundedValue
                    })    

                }
                if (data.steps != 0 && Number(this.state.goalSteps) != 0) {
                    if (data.steps == Number(this.state.goalSteps)) {
                        console.log('steps match ')
                        // this.setState({
                            //     showButton: true
                            // })
                    }
                }


            })
            // console.log('user steps -->', data.steps)


        });

        //Use Google Fit Api 


        if (Platform.OS === 'android') {
            const options = {
                scopes: [
                    Scopes.FITNESS_ACTIVITY_READ_WRITE,
                    Scopes.FITNESS_BODY_READ_WRITE,
                ],
            }
            GoogleFit.authorize(options)
                .then((res) => {
                    console.log('authorized >>>', res)
                    //alert(`${res.message}`)
                    GoogleFit.observeSteps((res) => {
                       // console.log('google fit steps', res)
                        // const dataObj = {
                        //     pedometerData: res,
                        // }
                        params.pedometerFun(res.steps)
                        this.setState({ pedometerData: res.steps }, () => {
                            if (res.steps > Number(1)) {
                                //this.countStepTime()
                                if (this.state.eightToSixteen == true) {
                                    this.setState({
                                        firstValue: res.steps
                                    })
                                }
                                else if (this.state.sixteenTo23 == true) {
                                    this.setState({
                                        secondValue: res.steps
                                    })
                                }
                                else if(this.state.oneToEight == true){
                                    this.setState({
                                        thirdValue: res.steps
                                    })
            
                                }
                            const multiplySteps = res.steps / Number(this.state.goalSteps);
                            //console.log('multiply >>',multiplySteps);
                            const divideSteps = multiplySteps*100;
                            //console.log('divided >>',divideSteps )
                            const roundedValue = Math.round(divideSteps);
                            //console.log('percentage steps >>',roundedValue)
                            this.setState({
                                stepsPercentage:roundedValue
                            })


                            }
                            if (res.steps != 0 && Number(this.state.goalSteps) != 0) {
                                if (res.steps == Number(this.state.goalSteps)) {
                                    console.log('steps match ')
                                    
                                }
                            }


                        })
                    })

                })

                .catch((err) => {
                    console.log('err >>> ', err)
                })


        }
        else if (Platform.OS === 'ios') {
            const options = {
                scopes: [
                    Scopes.FITNESS_ACTIVITY_READ_WRITE,
                    Scopes.FITNESS_BODY_READ_WRITE,
                ],
            }

            rnHealthKit.authorize(options)
                .then((res) => {
                    console.log('authorized >>>', res)
                    rnHealthKit.observeSteps((res) => {
                        // console.log(res)
                        this.setState({ pedometerData: res.steps })
                    })


                })
                .catch((err) => {
                    console.log('err >>> ', err)
                })

        }



    }


    matchTime = () => {
        let matchTimer = setInterval(() => {
            const hours = new Date().getHours(); //Current Hours
            const min = new Date().getMinutes(); //Current Minutes
            const sec = new Date().getSeconds(); //Current Seconds
            const currentTime = hours + ':' + min + ':' + sec;
            //console.log('current time >>>', currentTime)
            const resetTime = '0' + ':' + '0' + ':' + '0';
            const eightTime = '8' + ':' + '0' + ':' + '0';
            const time16 = '16' + ':' + '0' + ':' + '0';
            const time23 = '23' + ':' + '59' + ':' + '59';
            const time1 = '1' + ':' + '0' + ':' + '0'
            //console.log('wanted time >>>', resetTime)

            if (currentTime == resetTime) {
                // console.log('Success!! condition match');

                this.setState({
                    pedometerData: '',
                    timer: null,
                    hour_Counter: '0',
                    minutes_Counter: '00',
                    seconds_Counter: '00',
                    startDisable: false,
                    matchTimer: null,
                    timer: clearInterval(this.state.timer),
                    matchTimer: clearInterval(this.state.matchTimer)
                })


            }
            else if (currentTime < time16 || currentTime >= eightTime) {
                console.log('8 to 16 time condition')
                this.setState({
                    eightToSixteen:true
                })
            }
            //     if (Platform.OS === 'android') {
            //         const options = {
            //             scopes: [
            //                 Scopes.FITNESS_ACTIVITY_READ_WRITE,
            //                 Scopes.FITNESS_BODY_READ_WRITE,
            //             ],
            //         }

            //         GoogleFit.authorize(options)
            //             .then((res) => {
            //                 // console.log('authorized >>>', res)
            //                 GoogleFit.observeSteps((res) => {
            //                     console.log(res)
            //                     this.setState({ pedometerData: res.steps }, () => {
            //                         if (res.steps > Number(1)) {
            //                             //this.countStepTime()
            //                             this.setState({
            //                                 secondValue: res.steps
            //                             })
            //                         }
            //                         if (res.steps != 0 && Number(this.state.goalSteps) != 0) {
            //                             if (res.steps == Number(this.state.goalSteps)) {
            //                                 console.log('steps match ')
            //                                 // this.setState({
            //                                 //     showButton: true
            //                                 // })
            //                             }
            //                         }

            //                     })
            //                 })

            //             })

            //             .catch((err) => {
            //                 console.log('err >>> ', err)
            //             })


            //     } else if (Platform.OS === 'ios') {
            //         const options = {
            //             scopes: [
            //                 Scopes.FITNESS_ACTIVITY_READ_WRITE,
            //                 Scopes.FITNESS_BODY_READ_WRITE,
            //             ],
            //         }

            //         rnHealthKit.authorize(options)
            //             .then((res) => {
            //                 // console.log('authorized >>>', res)
            //                 rnHealthKit.observeSteps((res) => {
            //                     // console.log(res)
            //                     this.setState({ pedometerData: res.steps }, () => {
            //                         if (res.steps > Number(1)) {
            //                             //this.countStepTime()
            //                             this.setState({
            //                                 secondValue: res.steps
            //                             })
            //                         }
            //                         if (res.steps != 0 && Number(this.state.goalSteps) != 0) {
            //                             if (res.steps == Number(this.state.goalSteps)) {
            //                                 console.log('steps match ')
            //                                 // this.setState({
            //                                 //     showButton: true
            //                                 // })
            //                             }
            //                         }

            //                     })
            //                 })


            //             })

            //     }






            // }

            // else {
            //     SensorManager.stopStepCounter();
            //     this.setState({
            //         pedometerData:''
            //     })
            // }
            else if (currentTime < time23 || currentTime >= time16) {
                console.log('16 to 23 Condition Successfully run');
                this.setState({
                    sixteenTo23: true
                })
            }
            //             // const secTime = this.state.pedometerData;
            //             // this.setState({
            //             //     secTime: secTime
            //             // })
            //             // console.log('user string weight >>>', this.state.userCurrentWeight.slice(0, 3))
            //             const userWeight = this.state.userCurrentWeight.slice(0, 3)
            //             // console.log('number weight >>>', userWeight)
            //             this.setState({
            //                 weightNoUnit: userWeight
            //             })

            //             SensorManager.startStepCounter(1000);
            //             DeviceEventEmitter.addListener('StepCounter', (data) => {
            //                 console.log('sensor manager data -->>', data)
            //                 this.setState({ pedometerData: data.steps }, () => {
            //                     if (data.steps > Number(1)) {
            //                         //this.countStepTime()
            //                         this.setState({
            //                             secondValue: data.steps
            //                         })

            //                     }
            //                     if (data.steps != 0 && Number(this.state.goalSteps) != 0) {
            //                         if (data.steps == Number(this.state.goalSteps)) {
            //                             console.log('steps match ')
            //                             this.setState({
            //                                 showButton: true
            //                             })
            //                         }
            //                     }

            //                 })
            //                 // console.log('user steps -->', data.steps)


            //             });
            //             if (Platform.OS === 'android') {
            //                 const options = {
            //                     scopes: [
            //                         Scopes.FITNESS_ACTIVITY_READ_WRITE,
            //                         Scopes.FITNESS_BODY_READ_WRITE,
            //                     ],
            //                 }

            //                 GoogleFit.authorize(options)
            //                     .then(async (res) => {
            //                         console.log('authorized >>>', res)
            //                         await GoogleFit.observeSteps((res) => {
            //                             console.log(res)
            //                             this.setState({ pedometerData: res.steps }, () => {
            //                                 if (res.steps > Number(1)) {
            //                                     // this.countStepTime()
            //                                     AsyncStorage.setItem('pedometerData', res.steps)
            //                                     this.setState({
            //                                         secondValue: res.steps
            //                                     })
            //                                 }
            //                                 if (res.steps != 0 && Number(this.state.goalSteps) != 0) {
            //                                     if (res.steps == Number(this.state.goalSteps)) {
            //                                         console.log('steps match ');
            //                                         //alert('You Achieve Goal Steps')
            //                                         this.setState({
            //                                             pedometerData: '',
            //                                             showAlert: true
            //                                         })
            //                                         GoogleFit.observeHistory((result) => {
            //                                             console.log('history >>', result)
            //                                         })
            //                                     }
            //                                 }

            //                             })
            //                         })

            //                     })

            //                     .catch((err) => {
            //                         console.log('err >>> ', err)
            //                     })


            //             } else if (Platform.OS === 'ios') {
            //                 const options = {
            //                     scopes: [
            //                         Scopes.FITNESS_ACTIVITY_READ_WRITE,
            //                         Scopes.FITNESS_BODY_READ_WRITE,
            //                     ],
            //                 }

            //                 rnHealthKit.authorize(options)
            //                     .then((res) => {
            //                         // console.log('authorized >>>', res)
            //                         rnHealthKit.observeSteps((res) => {
            //                             // console.log(res)
            //                             this.setState({ pedometerData: res.steps }, () => {
            //                                 if (res.steps > Number(1)) {
            //                                     // this.countStepTime()
            //                                     this.setState({
            //                                         secondValue: res.steps
            //                                     })
            //                                 }
            //                                 if (res.steps != 0 && Number(this.state.goalSteps) != 0) {
            //                                     if (res.steps == Number(this.state.goalSteps)) {
            //                                         console.log('steps match ')
            //                                         // this.setState({
            //                                         //     showButton: true
            //                                         // })
            //                                     }
            //                                 }

            //                             })
            //                         })


            //                     })

            //             }
            //         }
            else if ((currentTime == time1 || currentTime < eightTime)) {
                console.log('1 to 8 Condition Successfully run');
                this.setState({
                    oneToEight: true
                })
            }
            //             // console.log('user string weight >>>', this.state.userCurrentWeight.slice(0, 3))
            //             const userWeight = this.state.userCurrentWeight.slice(0, 3)
            //             // console.log('number weight >>>', userWeight)
            //             this.setState({
            //                 weightNoUnit: userWeight
            //             })

            //             SensorManager.startStepCounter(1000);
            //             DeviceEventEmitter.addListener('StepCounter', (data) => {
            //                 console.log('sensor manager data -->>', data)
            //                 this.setState({ pedometerData: data.steps }, () => {
            //                     if (data.steps > Number(1)) {
            //                         //this.countStepTime()
            //                         this.setState({
            //                             thirdValue: data.steps
            //                         })

            //                     }
            //                     if (data.steps != 0 && Number(this.state.goalSteps) != 0) {
            //                         if (data.steps == Number(this.state.goalSteps)) {
            //                             console.log('steps match ')
            //                             // this.setState({
            //                             //     showButton: true
            //                             // })
            //                         }
            //                     }
            //                 })
            //                 // console.log('user steps -->', data.steps)


            //             });
            //             if (Platform.OS === 'android') {
            //                 const options = {
            //                     scopes: [
            //                         Scopes.FITNESS_ACTIVITY_READ_WRITE,
            //                         Scopes.FITNESS_BODY_READ_WRITE,
            //                     ],
            //                 }

            //                 GoogleFit.authorize(options)
            //                     .then((res) => {
            //                         // console.log('authorized >>>', res)
            //                         GoogleFit.observeSteps((res) => {
            //                             console.log(res)
            //                             this.setState({ pedometerData: res.steps }, () => {
            //                                 if (res.steps > Number(1)) {
            //                                     this.countStepTime()
            //                                     this.setState({
            //                                         thirdValue: res.steps
            //                                     })
            //                                 }
            //                                 if (res.steps != 0 && Number(this.state.goalSteps) != 0) {
            //                                     if (res.steps == Number(this.state.goalSteps)) {
            //                                         console.log('steps match ')
            //                                         // this.setState({
            //                                         //     showButton: true
            //                                         // })
            //                                     }
            //                                 }

            //                             })
            //                         })

            //                     })

            //                     .catch((err) => {
            //                         console.log('err >>> ', err)
            //                     })


            //             } else if (Platform.OS === 'ios') {
            //                 const options = {
            //                     scopes: [
            //                         Scopes.FITNESS_ACTIVITY_READ_WRITE,
            //                         Scopes.FITNESS_BODY_READ_WRITE,
            //                     ],
            //                 }

            //                 rnHealthKit.authorize(options)
            //                     .then((res) => {
            //                         // console.log('authorized >>>', res)
            //                         rnHealthKit.observeSteps((res) => {
            //                             // console.log(res)
            //                             this.setState({ pedometerData: res.steps }, () => {
            //                                 if (res.steps > Number(1)) {
            //                                     //this.countStepTime()
            //                                     this.setState({
            //                                         thirdValue: res.steps
            //                                     })
            //                                 }
            //                                 if (res.steps != 0 && Number(this.state.goalSteps) != 0) {
            //                                     if (res.steps == Number(this.state.goalSteps)) {
            //                                         console.log('steps match ')
            //                                         // this.setState({
            //                                         //     showButton: true
            //                                         // })
            //                                     }
            //                                 }

            //                             })
            //                         })


            //                     })

            //             }

            //         }


        }, 1000)
        this.setState({ matchTimer })
    }

    updateTime = () => {
        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes
        const sec = new Date().getSeconds(); //Current Seconds
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        // console.log('current date >>>', today)
        const currentTime = hours + ':' + min + ':' + sec;
        // console.log('current time >>>', currentTime)
        this.setState({ currntDate: today })
        this.setState({ curTime: currentTime })


    }


    countStepTime = () => {
        let timer = setInterval(() => {

            let num = (Number(this.state.seconds_Counter) + 1).toString(),
                count = this.state.minutes_Counter,
                hour = this.state.hour_Counter;

            if (Number(this.state.seconds_Counter) == 59) {
                count = (Number(this.state.minutes_Counter) + 1).toString();
                this.updateCalories(count)
                num = '00';
            }
            if (Number(this.state.minutes_Counter) == 59) {
                hour = (Number(this.state.hour_Counter) + 1).toString();
                count = '00';
            }
            this.setState({
                hour_Counter: hour.length == 1 ? hour : hour,
                minutes_Counter: count.length == 1 ? '0' + count : count,
                seconds_Counter: num.length == 1 ? '0' + num : num,
                //stepTime:hour_Counter + ': ' + minutes_Counter + ': ' + seconds_Counter
            });
        }, 1000);
        this.setState({ timer });

        this.setState({ startDisable: true })
    }

    componentWillUnmount() {
        clearInterval(this.state.matchTimer);
    }



    updateCalories = (minute) => {
        //console.log('updated state >>>', minute)
        const { params } = this.props.navigation.state;
        const latestWeight = params.currentWeight
        let walkingTime = Number(minute)
        const userWeight = Number(latestWeight)
        // console.log('number weight >>>', userWeight)
        const formula = Math.floor(((2.3 * userWeight) * (walkingTime / 60)))
        // console.log('Calculated Calories >>>', formula)
        this.setState({
            currentCalories: formula
        })
    }

    getDataForPedometer = async () => {
        AsyncStorage.getItem("currentUser").then(value => {
            let dataFromLocalStorage = JSON.parse(value);
            let userId = dataFromLocalStorage._id;
            this.setState({
                userId: userId
            })
        });
        const userObj = {
            userId: this.state.userId
        }
        let userPedometerData = await HttpUtilsFile.post('getpedometerbyid', userObj);
        console.log('userId >>', userPedometerData);
        if (userPedometerData.code == 200) {
            const userContent = userPedometerData.content;
            for (let i in userContent) {
                //console.log(userContent[i])
                const userGoalSteps = userContent[i].dailGoal;
                //console.log(userGoalSteps)
                this.setState({
                    stepGoalCountData: userGoalSteps
                })
            }

        }


    }
    saveGoalSteps = (e) => {
        //const { goalSteps }=this.state;
        console.log('goal steps >>', e)
        AsyncStorage.setItem('goalSteps', JSON.stringify(e));
    }
    render() {
        const {
            date,
            filterData,
            pedometerData,
            currentTime,
            targetTime,
            minutes_Counter,
            seconds_Counter,
            hour_Counter,
            achieve,
            userCurrentWeight,
            currentCalories,
            currentSteps,
            secTime,
            firstValue,
            secondValue,
            thirdValue,
            goalSteps,
            curTime,
            stepGoalCountData,
            tapLoad,
            stepsPercentage
            //currentUserId
        } = this.state;
        //console.log(currentUserId)
        //console.log('pedometer data in number form ', Number(pedometerData))
        //console.log('goal steps database >>',stepGoalCountData)
       
        //console.log(params)
        //console.log('curnt time and data >>>', curTime, date)
        // console.log('login user weight >>>', userCurrentWeight)
        // console.log('seconds >>>', seconds_Counter)
        // console.log('Current Calories >>>', Number(currentCalories))
        const timeData = Number(firstValue);
        //console.log('Time Data >>>',timeData)
        const forSecTime = Number(secondValue);
        const forThirdTime = Number(thirdValue)
        const data1 = [0, 0, timeData, 0, 0,];
        const data2 = [0, 0, forSecTime, 0, 0,];
        const data3 = [0, 0, forThirdTime, 0, 0,];
        // const data2 = [0, 0, currentSteps, 0, 0,]
        // const data3 = [0, 0, currentSteps, 0, 0,]
        return (
            <ScrollView style={{ backgroundColor: '#FFFFFF', height: heightDimension }} contentContainerStyle={{ flexGrow: 1 }}  >

                {/* <View style={{ flex: 2, backgroundColor: 'black', marginHorizontal: 20 }}>
                    <Text style={{ color: 'white', }}>Today Goal Steps</Text>
                    <TextInput
                        onChangeText={text => { this.saveGoalSteps(text), this.setState({ goalSteps: text }) }}
                        placeholder='Set today goal steps...'
                        placeholderTextColor='#7e7e7e'
                        type="number"
                        keyboardType={'numeric'}
                        style={styles.inputTexts}
                    />
                </View> */}
                <View style={styles.mainContainer}>

                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>Today's Step Count</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text>{date}</Text>
                        </View>


                        {/* {achieve && <View style={styles.achieveText}>
                    <Text style={styles.textStyle}>Achieve a day target steps</Text>
                </View>
                } */}

                        <TouchableOpacity
                            style={styles.stepCountContainer}
                            activeOpacity={0.7}
                            onPress={this._startPedometer.bind(this)}
                            //onPress={this.countStepTime}
                            disabled={this.state.startDisable}
                        >
                            <View style={styles.progressWhelContainer} >
                                <Wheelspiner
                                    size={90}
                                    width={12}
                                    color={'#FF6200'}
                                    // progress={pedometerData > 1 && pedometerData < 250 ? 25 :
                                    //     pedometerData > 250 && pedometerData < 500 ? 50 :
                                    //         pedometerData > 500 && pedometerData < 750 ? 75 :
                                    //             pedometerData > 750 && pedometerData <= 10000 ? 100
                                    //                 : 0
                                    // }
                                    progress={stepsPercentage == '' ? 0 : stepsPercentage}
                                    backgroundColor={'gray'}
                                    animateFromValue={0}
                                    fullColor={'#FF6200'}
                                //duration={60000}
                                />
                                {tapLoad ? <Text style={styles.tapLoadText}>Tap to load</Text> : null}
                            </View>
                            <View style={styles.stepCountData}>
                                <View style={{ flexDirection: 'row', marginRight: 50 }}>
                                    <Text style={{
                                        color: '#FF6200',
                                        fontFamily: 'MontserratLight',
                                        fontSize: 11
                                    }}>{pedometerData == '' ? 0 : pedometerData}</Text>
                                    <Text style={{
                                        color: '#a6a6a6',
                                        fontFamily: 'MontserratLight',
                                        fontSize: 11
                                    }}> / {goalSteps == '' ? 0 : goalSteps}</Text>
                                </View>
                                <Text style={{
                                    color: '#a6a6a6',
                                    fontFamily: 'MontserratLight',
                                    fontSize: 11,
                                    marginTop: 4,
                                    marginRight: 50
                                }}>Steps</Text>
                                <Text style={{ borderBottomWidth: 0.5, borderColor: '#FFFFFF', opacity: 0.3, marginRight: 15 }}></Text>
                                <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', fontSize: 11, marginTop: 10, marginRight: 50 }}>{hour_Counter}h  {minutes_Counter}m</Text>
                                <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', fontSize: 11, marginTop: 4, marginRight: 50 }}>
                                    {this.state.startDisable == false ? 'No Active' : 'Active me'}
                                </Text>
                                <Text style={{ marginTop: 4, borderBottomWidth: 0.5, borderColor: '#FFFFFF', opacity: 0.3, marginRight: 15 }}></Text>
                                <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', fontSize: 11, marginTop: 5, marginRight: 50 }}>{currentCalories == '' ? 0 : Number(currentCalories)}</Text>
                                <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', fontSize: 11, marginTop: 4, marginRight: 30, marginBottom: 5, paddingBottom: 5 }}>calories</Text>
                            </View>

                        </TouchableOpacity>

                        {/* <View style={styles.graphContainer}>
                        <Text style={{ color: 'white' }}>Graph Stepcount</Text>
                    </View> */}
                        {/* <Linechart/> */}
                        <View style={{
                            borderWidth: 2,
                            borderColor: 'black', height: 220
                            , marginHorizontal: 30, marginTop: 30,
                            backgroundColor: 'black'
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: 220, width: 100, padding: 20 }}>
                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={data1}
                                        gridMin={0}
                                        svg={{ fill: '#FF6200' }}
                                        spacingInner={0.3}
                                        gridMax={10000}
                                    />

                                </View>
                                <View style={{ height: 220, width: 100, padding: 20 }}>
                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={data2}
                                        gridMin={0}
                                        svg={{ fill: '#FF6200' }}
                                        spacingInner={0.3}
                                        gridMax={10000}
                                    />
                                </View>
                                <View style={{ height: 220, width: 100, padding: 20 }}>
                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={data3}
                                        gridMin={0}
                                        svg={{ fill: '#FF6200' }}
                                        spacingInner={0.3}
                                        gridMax={10000}
                                    />
                                </View>


                            </View>
                            <View style={{ backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#e5e5e5', fontFamily: 'MontserratLight', }}>08:00</Text>
                                <Text style={{ color: '#e5e5e5', fontFamily: 'MontserratLight', }}>16:00</Text>
                                <Text style={{ color: '#e5e5e5', fontFamily: 'MontserratLight', }}>01:00</Text>
                            </View>


                        </View>
                        {
                            this.state.isLoading ?
                                <OverlayLoader /> :
                                null
                        }
                        {
                            this.state.showAlert ?
                                alert('Achieve Steps')
                                :
                                null
                        }
                        <View style={{ flex: 1, width: '100%', height: 30, marginTop: 80 }}>
                            {
                                this.state.showButton ?
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <TouchableOpacity style={{
                                            width: 100, height: 35, backgroundColor: '#FF6200',
                                            borderRadius: 3, justifyContent: 'center'

                                        }} onPress={this.sendDataPedometer}>
                                            <Text style={{ color: 'white', alignSelf: 'center', fontFamily: 'MontserratMedium', }}>Submit</Text>
                                        </TouchableOpacity>
                                    </View>
                                    : null
                            }

                        </View>

                    </View>

                </View>
                <View style={{ marginBottom: 20 }}></View>

            </ScrollView>
        )
    }
}