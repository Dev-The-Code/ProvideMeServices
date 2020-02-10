import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity, Picker } from 'react-native';
import styles from '../Styling/AddExerciseStyle';
import BriskScreen from '../screens/BriskScreen';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast'

const { height } = Dimensions.get('window');
let exercise;
let exerciseArry = [];
let uniqeArray;

class AddExercise extends React.Component {
    static navigationOptions = (navigation) => {
        const { params = {} } = navigation.navigation.state;
        console.log(params);
        let headerRight = <TouchableOpacity style={styles.headerIconContainer}
            onPress={
                params.addExercise
            }>
            <Image source={require('../icons/tick.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        return {
            headerRight,
            headerStyle: {
            },
            headerTintColor: 'gray',
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            showCard: false,
            jogging: false,
            pushups: false,
            bicep: false,
            crunch: false,
            iconShow: false,
            logExercise: false,
            reverseCrunch: false,
            verticalLegCrunch: false,
            bicycleEx: false,
            rollingEx: false,
            walking: false,
            running: false,
            joggingEx: false,
            exerciseName: '',
            exerciseAmount: [],
            exerciseUnit: '',
            dayOfMonth: '',
            month: '',
            year: '',
            date: '',
            time: '',
            allExerciseName: '',
            briskExerciseAmount: '',
            exerciseArr: [],
            inputs: {},
            amountExcercise: '',
            indexNumber: {},
            units: {},
            incInputValue: '',
            position: 'top',

        }
    }


    componentDidMount() {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    dayOfMonth: date,
                    month: month,
                    year: year,
                    userId: dataFromLocalStorage._id
                })
            }

        });
        this.props.navigation.setParams({
            addExercise: this.addExercise,
        })
    }
    gettingDropDownValues = () => {
        const { exerciseArr } = this.state;
        exercise = exerciseArr.map((elem, i) => {
        })
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

    addExercise = async () => {
        const { inputs, units, date, time, userId, dayOfMonth, month, year } = this.state;
        const { navigate } = this.props.navigation;
        let dataArr = [];
        for (let i in uniqeArray) {
            const exerciseObj = {};
            exerciseObj.date = date;
            exerciseObj.time = time;
            exerciseObj.dayOfMonth = dayOfMonth;
            exerciseObj.month = month;
            exerciseObj.year = year;
            exerciseObj.userId = userId;
            exerciseObj['exerciseName'] = uniqeArray[i];
            exerciseObj['exerciseAmount'] = inputs[uniqeArray[i]];
            exerciseObj['exerciseUnit'] = units[uniqeArray[i]];
            dataArr.push(exerciseObj)
        }
        if (dataArr.length >= 0) {
            AsyncStorage.setItem('logExercises', JSON.stringify(dataArr))
            this.toastFunction('Data Save Successfully', this.state.position, DURATION.LENGTH_LONG, true);
            navigate('Exerciselog');
            exerciseArry = [];
        }
        else {
            alert('Please Add Exercise')
        }
    }

    exerciseLog = () => {
        this.setState({ show: false, logExercise: true })
    }

    backToHome(e, val) {
        exerciseArry = exerciseArry.filter(function (item) {
            return item !== e
        })
        this.setState({
            exerciseArr: exerciseArry
        })
    }



    setAmount = (index, text) => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [index]: text,

            }
        })
    }
    increamentVal(data, item) {
        // let emptyArr={}
        // console.log('inc data >',Number(data))
        // console.log('item value >', item)
        const inputValue = Number(data) + 1;
        const incValue = inputValue.toString();
        console.log(incValue);
        // const a=this.state.inputs;
        // this.setState({
        //     incInputValue:incValue
        // })
        // for(var i in this.state.inputs){
        //    console.log(this.state.inputs[i])
        //    const a =this.state.inputs[i];
        //    this.setState({
        //        inputs:incValue
        //    })
        // }
        // console.log([item]);
        //console.log('increment value',incValue)
        //const a =this.state.inputs(...)
        // this.setState({
        //     inputs:{
        //         [item]:incValue

        //     }
        // })
        // if(data == 'Brisk Walk'){
        //     for(var i in this.state.inputs){
        //             console.log(this.state.inputs[i])
        //           const inputValue =  this.state.inputs[i]
        //           const a= Number(inputValue)+ 1;
        //           const amountVal = a.toString()
        //           console.log(a)
        //           this.setState({
        //               inputs:{
        //                   [data]:amountVal
        //               }
        //           })
        //         //     if(data == this.state.inputs[i]){
        //         //         console.log('true')
        //         //     }
        //      }

    }

    //     else if (data == 'High paced jogging') {
    //         for(var i in this.state.inputs){
    //             console.log(this.state.inputs[i])
    //           const inputValue =  this.state.inputs[i]
    //           const a= Number(inputValue)+ 1;
    //           const amountVal = a.toString()
    //           console.log(a)
    //           this.setState({
    //               inputs:{
    //                   [data]:amountVal
    //               }
    //           })
    //         //     if(data == this.state.inputs[i]){
    //         //         console.log('true')
    //         //     }
    //      }

    //  }
    //     //  allObjArr.push(...this.state.inputs);
    //  console.log('all objects >', allObjArr)
    // console.log('state value >>', this.state.inputs ,'data >', data)
    // 


    // console.log('inc value >>',data === 'Brisk Walk', 'index >>',index == 0)
    // if (data == 0) {
    //     console.log('exercise amount >>', this.state.exerciseAmount)
    //     console.log('amount', this.state)
    // const { exerciseAmount } = this.state;
    // const amount = Number(exerciseAmount) + 1
    // let amountVal = amount.toString()
    // this.setState({
    //     exerciseAmount: amountVal
    // })
    //}
    // else if( )

    //}
    decrementVal = () => {
        const { exerciseAmount } = this.state;
        const amount = Number(exerciseAmount) - 1
        let amountVal = amount.toString()
        this.setState({
            exerciseAmount: amountVal
        })
    }
    updateUnit = (data, text) => {
        this.setState({
            units: {
                ...this.state.units,
                [data]: text
            }
        })
    }

    selectExercise = (data) => {
        if (data !== "0") {
            exerciseArry.push(data);
            this.setState({
                allExerciseName: data,
                exerciseArr: exerciseArry,
                inputs: {
                    ...this.state.inputs,
                    [data]: '',

                },
                units: {
                    ...this.state.units,
                    [data]: ''
                }
            })
        }
    }

    render() {
        const { indexNumber } = this.state;

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        uniqeArray = exerciseArry.filter(onlyUnique);

        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.childContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            Add Exercise
                        </Text>
                    </View>
                    <View style={{ height: 50, borderWidth: 2, borderColor: '#e5e5e5', borderRadius: 3 }}>
                        <Picker
                            selectedValue={this.state.allExerciseName}
                            style={{ height: 50, width: '100%', }}
                            onValueChange={this.selectExercise}
                        >
                            <Picker.Item label='Select an options...' value='0' />
                            <Picker.Item label="Brisk Walk" value="Brisk Walk" />
                            <Picker.Item label="High paced jogging" value="High paced jogging" />
                            <Picker.Item label="Push ups" value="Push ups" />
                            <Picker.Item label="Bicep curls" value="Bicep curls" />
                            <Picker.Item label="Side Crunch" value="Side Crunch" />
                            <Picker.Item label="Reverse Crunches" value="Reverse Crunches" />
                            <Picker.Item label="Vertical Leg Crunch" value="Vertical Leg Crunch" />
                            <Picker.Item label="Bicycle Exercise" value="Bicycle Exercise" />
                            <Picker.Item label="Rolling Plank Exercise" value="Rolling Plank Exercise" />
                            <Picker.Item label="Walking" value="Walking" />
                            <Picker.Item label="Running" value="Running" />
                            <Picker.Item label="Jogging" value="Jogging" />
                        </Picker>
                    </View>
                    {
                        uniqeArray.length >= 0 ?
                            uniqeArray.map((item, index) => {
                                return (
                                    <View style={{ marginTop: 20 }} key={index}>
                                        <BriskScreen title={item}
                                            backFunc={this.backToHome.bind(this, item)}
                                            setAmount={(text) => this.setAmount(item, text)}
                                            value={this.state.inputs[item]}
                                            increamentVal={this.increamentVal.bind(this, this.state.inputs[item], item)}
                                            //decrementVal={this.decrementVal}
                                            updateUnit={(text) => this.updateUnit(item, text)}
                                            indexNumber={indexNumber}
                                            unit={this.state.units[item]} />
                                    </View>
                                )
                            })
                            :
                            null
                    }
                    <Toast ref="toastWithStyle"
                        style={{ backgroundColor: '#FF6200' }}
                        position={this.state.position}
                        positionValue={50}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white', fontFamily: 'MontserratLight', }}
                    />
                    <View style={{ flex: 2 }}>
                    </View>
                </View>
                <View style={{ flex: 1.2 }}>
                </View>
            </ScrollView>
        )
    }
}

export default AddExercise;

