import React from 'react';
import { 
    Text, 
    Alert,
    View, 
    ScrollView, 
    Button, 
    Image, 
    Dimensions, 
    TextInput, 
    TouchableOpacity, 
    Picker, 
    StyleSheet,
    ActivityIndicator,
    } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import styles from '../Styling/BMICalculatorStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import InputImgsScreen from '../screens/InputImgs';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';
import ToastComponent from '../Toasts/nativeToast';
import OverlayLoader from '../Loader/OverlaySpinner'
const { heightDimension } = Dimensions.get('window');

class BMICalculator extends React.Component {
    static navigationOptions = () => ({
        headerStyle: {
            backgroundColor: 'white'
        },
        headerTintColor: 'gray'
    })
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            weight: 0,
            bmi: '',
            heightUnit: '',
            weightUnit: '',
            showMgs: '',
            userId: '',
            date: '',
            time: '',
            mgs: false,
            hitApi: false,
            heightValidation:false,
            heightUnitValidation:false,
            weightValidation:false,
            weightUnitValidation:false,
            isLoading:false,
            position: 'top',
            style:{},
            toast:false
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
                    userId: dataFromLocalStorage._id
                })
            }
        });
    }

    //increament the  height
    increamentHeight = () => {
        const height = Number(this.state.height) + 1
        let heightVal = height.toString()
        this.setState({
            height: heightVal
        })
    }
    //increament the  Weight
    increamentWeight = () => {
        const weight = Number(this.state.weight) + 1
        let weightVal = weight.toString()
        this.setState({
            weight: weightVal
        })
    }
    // decrement the Height
    decrementHeight = () => {
        const height = Number(this.state.height) - 1
        let heightVal = height.toString()
        this.setState({
            height: heightVal
        })
    }
    // decrement the weight
    decrementWeight = () => {
        const weight = Number(this.state.weight) - 1
        let weightVal = weight.toString()
        this.setState({
            weight: weightVal
        })
    }
    //update height unit
    updateHeight = (e) => {
        this.setState({
            heightUnit: e
        })
    }
    //update Weight unit
    updateWeight = (e) => {
        this.setState({
            weightUnit: e
        })
    }

    //calculate the BMI
    toastFunction=(text , position , duration ,withStyle )=>{
        this.setState({
            position: position,
        })
        if(withStyle){
            this.refs.toastWithStyle.show(text, duration);
        }else {
            this.refs.toast.show(text, duration);
        }
    }

    calculateBmi = async () => {
        const { height, weight, heightUnit, weightUnit, userId, date, time, hitApi } = this.state;
        this.setState({isLoading:true})
        let bmiData = {};
        let bmiValue;
        bmiData.height = height
        bmiData.weight = weight
        bmiData.heightUnit = heightUnit
        bmiData.weightUnit = weightUnit
        bmiData.userId = userId;
        bmiData.date = date;
        bmiData.time = time;
        if(height == 0){
            this.setState({
                heightValidation:true,
                isLoading:false
            })
        }
        if(heightUnit == 0){
            this.setState({
             heightUnitValidation:true ,
             isLoading:false  
            })
        }
        if(weight == 0){
          this.setState({
              weightValidation:true,
              isLoading:false
          })
        }
        if(weightUnit == 0){
        this.setState({
            weightUnitValidation:true,
            isLoading:false
        })
        }
        
       else if (heightUnit == 'inches' && weightUnit == 'pound') {
            bmiValue = (weight / height / height) * 703
            let bmiVal = Math.round(bmiValue.toString());
            bmiData.bmi = bmiVal;
            console.log('bmiValue >>>',bmiVal)

            this.setState({
                bmi: bmiVal,
                mgs: false,
                hitApi: true
            })
             //AsyncStorage.setItem('bmiData',JSON.stringify(bmiVal))
            let dataUser = await HttpUtils.post('bmilogs', bmiData)
            console.log(dataUser, 'dataUser');
            let userCode = dataUser.code;
            let userMsg = dataUser.msg;
            if(userCode){
               this.setState({
                   isLoading:false
               }, ()=>{
                  this.toastFunction(userMsg,this.state.position , DURATION.LENGTH_LONG,true)
                  //this.setState({toast:true})
               })
               
            }
        }
        
        else if (heightUnit == 'centimeter' && weightUnit == 'kg') {
            bmiValue = (weight / height / height) * 10000
            let bmiVal = Math.round(bmiValue.toString());
            bmiData.bmi = bmiVal;
            console.log('bmiValue >>>',bmiVal)
            this.setState({
                bmi: bmiVal,
                mgs: false,
                hitApi: true
            })
            let dataUser = await HttpUtils.post('bmilogs', bmiData)
            console.log(dataUser, 'dataUser');
            let userCode = dataUser.code;
            let userMsg = dataUser.msg;
            if(userCode){
               this.setState({
                   isLoading:false
               }, ()=>{
                this.toastFunction(userMsg,this.state.position , DURATION.LENGTH_LONG,true)
                //this.setState({toast:true})
               })
               
            }
        }
        else if (heightUnit == 'inches' && weightUnit == 'kg') {
            this.setState({
                showMgs: "Select Weight Unit In Pounds",
                mgs: true,
                bmi: '',
                hitApi: false,
                isLoading:false
            })
        }
        else if (heightUnit == 'centimeter' && weightUnit == 'pound') {
            this.setState({
                showMgs: "Select Weight Unit In KG,s",
                mgs: true,
                bmi: '',
                hitApi: false,
                isLoading:false
            })
        }

        // console.log(hitApi , 'hitApi')
        // if (hitApi) {
        //     let dataUser = await HttpUtils.post('bmilogs', bmiData)
        //     console.log(dataUser, 'dataUser')
        // }
    }
    render() {
        const { 
            showMgs, 
            mgs,
            heightValidation,
            heightUnitValidation,
            weightValidation,
            weightUnitValidation,
            isLoading,
            toast ,
            bmi
           } = this.state;
           console.log('state bmi >>>',Number(bmi))
        return (
            // <View style={styles.mainContainer}>
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: heightDimension }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.mainContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            BMI Calculator
                            </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>Enter your height and weight below to calculate your BMI </Text>
                    </View>
                    <View style={styles.inputMainContainer}>
                    <Text style={styles.textStyle}>Height</Text>
                    <View style={styles.heightContainer}>
                        <View style={styles.inputContainer}>
                           <View style={styles.container}>
                           <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                       onPress={this.decrementHeight}
                                        >
                                        <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                    <View style={styles.textInputContainer}>
                                        <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                            type="number"
                                            onChangeText={(height) => this.setState({ height: height })}
                                            value={this.state.height}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                        onPress={this.increamentHeight}>
                                        
                                        <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ borderRadius: 4, borderColor: '#e5e5e5', overflow: 'hidden', marginTop: 5, height: 40 }}>
                                <Picker selectedValue={this.state.heightUnit}
                                    onValueChange={this.updateHeight}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="Inches" value="inches" />
                                    <Picker.Item label="Centimeter" value="centimeter" />
                                </Picker>
                            </View>
                    </View>
                    <View style={styles.showValidationContainer}>
                            {heightValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please fill your height
                                    </Text>

                                : null}
                            {heightUnitValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select height unit
                                    </Text>
                                : null}
                        </View>
                        <Text style={styles.textStyle}>Weight</Text>
                        <View style={styles.currentWeightContainer}>
                            <View style={styles.inputContainer}>
                                <View style={styles.container}>
                                    <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                        onPress={this.decrementWeight}>
                                        <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                    <View style={styles.textInputContainer}>
                                        <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                            type="number"
                                            onChangeText={(weight) => this.setState({ weight: weight })}
                                            value={this.state.weight}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                        onPress={this.increamentWeight}>
                                        <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderRadius: 4, borderColor: '#e5e5e5', overflow: 'hidden', marginTop: 5, height: 40 }}>
                            <Picker selectedValue={this.state.weightUnit}
                                    onValueChange={this.updateWeight}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                    <Picker.Item label="Pound" value="pound" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.showValidationContainer}>
                        {weightValidation ?
                                    <Text style={styles.validationInstruction}>
                                        Please fill your weight
                                    </Text>
                                : null}
                                {weightUnitValidation ?
                                <Text style={styles.validationInstruction}>
                                        Please select weight unit
                                    </Text>
                                : null}
                                {mgs ?
                            <Text style={styles.validationInstruction}>
                                {showMgs}
                            </Text>
                            : null}
                        </View>


                        
                    </View>
                    <View>
                        {/* {mgs ?
                            <Text>
                                {showMgs}
                            </Text>
                            : null} */}
                    </View>
                    <Text style={styles.bmiTextStyle}>BMI</Text>
                    <View style={styles.bmiInputContainer}>
                        {/* <TextInput placeholder="c.g 22"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputStyle}
                            value={this.state.bmi}
                        /> */}
                        <Text style={styles.inputStyle}>
                            {bmi}
                        </Text>
                    </View>
                    {isLoading ? <OverlayLoader/>: null}
                    <View style={styles.buttonContainer}>
                        {/* {toast ? <ToastComponent pressFunc={this.toastFunction.bind(this, 'Success',this.state.position , DURATION.LENGTH_LONG,true)}/> : null} */}
                    <CaloriesSetupBtn title="Calculate BMI"
                            onPress={this.calculateBmi}
                            caloriesBtnStyle={styles.caloriesBtnStyle} />
                    </View>
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
            </ScrollView>
        )
    }

}

export default BMICalculator;


