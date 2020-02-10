import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity, Picker } from 'react-native';
import styles from '../Styling/MacroStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';


const { HeightDimension } = Dimensions.get('window');

class Macrocalculator extends React.Component {
    static navigationOptions = () => ({
        headerStyle: {
            backgroundColor: 'white'
        },
        headerTintColor: 'gray'
    })
    constructor(props) {
        super(props);
        this.state = {
            dob: '',
            age: '',
            gender: '',
            height: '',
            heightInch: '',
            currentWeight: '',
            goalWeight: '',
            heightUnit: '',
            currentWeightUnit: '',
            goalWeightUnit: '',
            activityLevel: '',
            calculteCalries: '',
            totalDEE: '',
            fatMass: '',
            proteins: '',
            carbohydrates: '',
            userId: '',
            date: '',
            time: '',
            currentDate: '',
            currentMonth: '',
            currentYear: '',
            tdeeObj: { sedentary: 1.2, lightActivity: 1.375, active: 1.55, veryActive: 1.725 },
            dobValidation: false,
            genderValidation: false,
            heightValidation: false,
            currentWeightValidation: false,
            goalWeightValidation: false,
            heightUnitValidation: false,
            currentWeightUnitValidation: false,
            goalWeightUnitValidation: false,
            activityLevelValidation: false,
            male: false,
            female: false,
            moderate: false,
            sedentary: false,
            light: false,
            extreme: false,
            currentCalories: '',
            currentCarbohy: '',
            currentProteins: '',
            currentMass: '',
            showCurrentMacro: false,
            macroArray: [],
            macroResult: '',
            unitValue: '',
            impClick: false,
            metrilClick: false,
            unitValidation: false,
            desiredUnitValue: '',
            normal: false,
            mild: false,
            extremeBtn: false,
            desiredUnitValidation: false,
            fitnessGoal: '',
            showDesiredBtn: true,
            fitnessObj: { normal: 300, mild: 500, extreme: 700 },
            userAllData: [],
            lose: false,
            gain: false,
            maintain: false,
            fitnessResult: '',
            fitnessValidation:false
        }
    }

    componentWillMount() {
        //const { params } = this.props.navigation.state;
        //console.log('params data >>', params)
        let monthNo = new Date().getMonth();
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
        }
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    userId: dataFromLocalStorage._id,
                    currentYear: year,
                    currentDate: date,
                    currentMonth: month,
                    //fitnessGoal: params.fitnessGoal
                }, () => {
                    this.fitnessResultDataGetting();
                    console.log('fitness goal will mount >>', this.state.fitnessGoal)


                })
            }
        });
        this.getMacro();

    }
//  componentDidMount(){
//     this.macroGet();
//  }   
    getMacro = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.macroGet();
        });
    }

    calulateMacro = async () => {
        const { dob, gender, height, heightInch, currentWeight, currentWeightUnit,
            activityLevel, tdeeObj, date, time, currentYear, currentDate, currentMonth, userId,
            unitValue, desiredUnitValue, fitnessObj, fitnessGoal,fitnessValidation } = this.state;
        let age;
        let macroObj = {
            dob: dob,
            gender: gender,
            height: height,
            heightInch: heightInch,
            currentWeight: currentWeight,
            currentWeightUnit: currentWeightUnit,
            // goalWeight: goalWeight,
            // goalWeightUnit: goalWeightUnit,
            activityLevel: activityLevel,
            date: date,
            time: time,
            userId: userId
        };

        //conditions for validations
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
        if (gender == '') {
            this.setState({
                genderValidation: true
            })
        }
        else {
            this.setState({
                genderValidation: false
            })
        }
        if (height == '') {
            this.setState({
                heightValidation: true
            })
        }

        else {
            this.setState({
                heightValidation: false
            })
        }
        if (currentWeight == '') {
            this.setState({
                currentWeightValidation: true
            })
        }
        else {
            this.setState({
                currentWeightValidation: false
            })
        }
        if(fitnessGoal == ''){
            this.setState({
                fitnessValidation:true
            })
        }
        else {
            this.setState({
                fitnessValidation:false
            })
        }
        
        if (heightInch == '') {
            this.setState({
                heightUnitValidation: true
            })
        }
        else {
            this.setState({
                heightUnitValidation: false
            })
        }
        if (currentWeightUnit == '' || currentWeightUnit == '0') {
            this.setState({
                currentWeightUnitValidation: true
            })
        }
        else {
            this.setState({
                currentWeightUnitValidation: false
            })
        }
        
        if (activityLevel == '') {
            this.setState({
                activityLevelValidation: true
            })
        }
        else {
            this.setState({
                activityLevelValidation: false
            })
        }
        if (unitValue == '') {
            this.setState({
                unitValidation: true
            })
        }
        else {
            this.setState({
                unitValidation: false
            })
        }
        if (desiredUnitValue == '') {
            this.setState({
                desiredUnitValidation: true
            })
        }
        else {
            this.setState({
                desiredUnitValidation: false
            })
        }
        if (dob != '') {
            const dobYear = dob.slice(6, 10);
            age = currentYear - dobYear;
        }
        if (gender == 'male' && unitValue == 'imperial') {
            if (dob != '' && height != '' && heightInch != '' && currentWeight != '' &&
                currentWeightUnit != '' && currentWeightUnit != '0' && activityLevel != '' && unitValue != '') {
                const heightCentimeter = height * 30.48;
                const heightInchCentimeter = heightInch * 2.54;
                const totalHeightCentimeter = Math.round(heightCentimeter + heightInchCentimeter);
                const userWeight = Math.round(currentWeight * 0.454);
                //console.log('user weight >>', userWeight)
                let BMR = (10 * userWeight) + (6.25 * totalHeightCentimeter) - (5 * age) + 5;
                //console.log('calories >>', BMR)
                if (activityLevel == 'sedentary' || activityLevel == 'active' || activityLevel == 'lightActivity' || activityLevel == 'veryActive') {

                    if (fitnessGoal == 'lose weight') {
                        // let caloriesResult = Math.round(tdee - fitnessObj[desiredUnitValue]);
                        // console.log('fitness result lose>>', caloriesResult);
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        let addBMR = Math.round(finalBMR - fitnessObj[desiredUnitValue]);
                        //console.log('minus bmr >', addBMR)
                        let fatCalries = finalBMR * 0.30;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = addBMR * 0.30;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        // let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = addBMR * 0.40;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: addBMR,
                            totalDEE: addBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = addBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = addBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')


                    }
                    else if (fitnessGoal == 'gain weight') {
                        // let caloriesResultGain = Math.round(tdee + fitnessObj[desiredUnitValue]);
                        // console.log('fitness result gain>>', caloriesResultGain);
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        let addBMR = Math.round(finalBMR + fitnessObj[desiredUnitValue]);
                        let fatCalries = finalBMR * 0.30;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = addBMR * 0.30;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        // let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = addBMR * 0.40;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: addBMR,
                            totalDEE: addBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = addBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = addBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')

                    }
                    else if (fitnessGoal == 'maintain weight') {
                        // get tdee value
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        //calculate fat
                        let fatCalries = finalBMR * 0.30;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = BMR * 0.30;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        //let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = finalBMR * 0.40;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: finalBMR,
                            totalDEE: finalBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = finalBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = finalBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')
                    }


                }
            }
        }
        else if (gender == 'male' || unitValue == '' || unitValue == 'metric') {
            //console.log('run condition')
            if (dob != '' && height != '' && currentWeight != '' &&
                currentWeightUnit != '' && currentWeightUnit != '0' && activityLevel != '') {
                // console.log('user weight >>', userWeight)
                let BMR = (10 * currentWeight) + (6.25 * height) - (5 * age) + 5;
                console.log('calories >>', BMR)
                if (activityLevel == 'sedentary' || activityLevel == 'active' || activityLevel == 'lightActivity' || activityLevel == 'veryActive') {
                    if (fitnessGoal == 'lose weight') {
                        // let caloriesResult = Math.round(tdee - fitnessObj[desiredUnitValue]);
                        // console.log('fitness result lose>>', caloriesResult);
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        //console.log('final bmr >',finalBMR)
                        let addBMR = Math.round(finalBMR - fitnessObj[desiredUnitValue]);
                        //console.log('minus bmr >', addBMR)
                        let fatCalries = addBMR * 0.30;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = addBMR * 0.30;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        // let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = addBMR * 0.40;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        // console.log('fat value >>', fatVal);
                        // console.log('protein value >>', proteinVal);
                        // console.log('carbohyderates >>', carbohydratesVal)
                        //set the state
                        this.setState({
                            calculteCalries: addBMR,
                            totalDEE: addBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = addBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = addBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')


                    }
                    else if (fitnessGoal == 'gain weight') {
                        // let caloriesResultGain = Math.round(tdee + fitnessObj[desiredUnitValue]);
                        // console.log('fitness result gain>>', caloriesResultGain);
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        let addBMR = Math.round(finalBMR + fitnessObj[desiredUnitValue]);
                        let fatCalries = finalBMR * 0.30;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = addBMR * 0.30;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        // let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = addBMR * 0.40;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: addBMR,
                            totalDEE: addBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = addBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = addBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')



                    }
                    else if (fitnessGoal == 'maintain weight') {
                        // get tdee value
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        //calculate fat
                        let fatCalries = finalBMR * 0.30;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = BMR * 0.30;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        //let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = finalBMR * 0.40;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: finalBMR,
                            totalDEE: finalBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = finalBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = finalBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')
                    }
                }
            }

        }
        else if (gender == 'female' && unitValue == 'imperial') {
            if (dob != '' && height != '' && heightInch != '' && currentWeight != '' &&
                currentWeightUnit != '' && currentWeightUnit != '0' && activityLevel != '') {
                const heightCentimeter = height * 30.48;
                const heightInchCentimeter = heightInch * 2.54;
                const userWeight = Math.round(currentWeight * 0.454);
                const totalHeightCentimeter = Math.round(heightCentimeter + heightInchCentimeter);
                let BMR = (10 * userWeight) + (6.25 * totalHeightCentimeter) - (5 * age) - 161;
                if (activityLevel == 'sedentary' || activityLevel == 'active' || activityLevel == 'lightActivity' || activityLevel == 'veryActive') {
                    if (fitnessGoal == 'lose weight') {
                        // let caloriesResult = Math.round(tdee - fitnessObj[desiredUnitValue]);
                        // console.log('fitness result lose>>', caloriesResult);
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        //console.log('final bmr >',finalBMR)
                        let addBMR = Math.round(finalBMR - fitnessObj[desiredUnitValue]);
                        //console.log('minus bmr >', addBMR)
                        let fatCalries = addBMR * 0.25;
                        let fat = fatCalries / 9;
                        //console.log('femail fat >>', fat);
                        //calculate protein
                        let proteinCalries = addBMR * 0.25;
                        let protein = proteinCalries / 4;
                        //console.log('femail protein >>', protein)
                        //calculate carbohydrate
                        // let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = addBMR * 0.50;
                        let carbohydrate = carbohydratesCalries / 4;
                        //console.log('femail carbohydrates >>', carbohydrate)
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        // console.log('fat value >>', fatVal);
                        // console.log('protein value >>', proteinVal);
                        // console.log('carbohyderates >>', carbohydratesVal)
                        //set the state
                        this.setState({
                            calculteCalries: addBMR,
                            totalDEE: addBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = addBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = addBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')


                    }
                    else if (fitnessGoal == 'gain weight') {
                        // let caloriesResultGain = Math.round(tdee + fitnessObj[desiredUnitValue]);
                        // console.log('fitness result gain>>', caloriesResultGain);
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        let addBMR = Math.round(finalBMR + fitnessObj[desiredUnitValue]);
                        let fatCalries = finalBMR * 0.25;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = addBMR * 0.25;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        // let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = addBMR * 0.50;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: addBMR,
                            totalDEE: addBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = addBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = addBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')



                    }

                    else if (fitnessGoal == 'maintain weight') {
                        // get tdee value
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        //calculate fat
                        let fatCalries = finalBMR * 0.25;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = BMR * 0.25;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        //let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = finalBMR * 0.50;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: finalBMR,
                            totalDEE: finalBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = finalBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = finalBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')
                    }
                }

            }
        }
        else if (gender == 'female' || unitValue == 'metric' || unitValue == '') {
            if (dob != '' && height != '' && heightInch != '' && currentWeight != '' &&
                currentWeightUnit != '' && currentWeightUnit != '0' && activityLevel != '') {
                let BMR = (10 * currentWeight) + (6.25 * height) - (5 * age) - 161;
                if (activityLevel == 'sedentary' || activityLevel == 'active' || activityLevel == 'lightActivity' || activityLevel == 'veryActive') {
                    if (fitnessGoal == 'lose weight') {
                        // let caloriesResult = Math.round(tdee - fitnessObj[desiredUnitValue]);
                        // console.log('fitness result lose>>', caloriesResult);
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        //console.log('final bmr >',finalBMR)
                        let addBMR = Math.round(finalBMR - fitnessObj[desiredUnitValue]);
                        //console.log('minus bmr >', addBMR)
                        let fatCalries = addBMR * 0.25;
                        let fat = fatCalries / 9;
                        //console.log('femail fat >>', fat);
                        //calculate protein
                        let proteinCalries = addBMR * 0.25;
                        let protein = proteinCalries / 4;
                        // console.log('femail protein >>', protein)
                        //calculate carbohydrate
                        // let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = addBMR * 0.50;
                        let carbohydrate = carbohydratesCalries / 4;
                        //console.log('femail carbohydrates >>', carbohydrate)
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        // console.log('fat value >>', fatVal);
                        // console.log('protein value >>', proteinVal);
                        // console.log('carbohyderates >>', carbohydratesVal)
                        //set the state
                        this.setState({
                            calculteCalries: addBMR,
                            totalDEE: addBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = addBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = addBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')


                    }
                    else if (fitnessGoal == 'gain weight') {
                        // let caloriesResultGain = Math.round(tdee + fitnessObj[desiredUnitValue]);
                        // console.log('fitness result gain>>', caloriesResultGain);
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        let addBMR = Math.round(finalBMR + fitnessObj[desiredUnitValue]);
                        let fatCalries = finalBMR * 0.25;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = addBMR * 0.25;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        // let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = addBMR * 0.50;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: addBMR,
                            totalDEE: addBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = addBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = addBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        //console.log(dataUser, 'dataUser')



                    }

                    else if (fitnessGoal == 'maintain weight') {
                        // get tdee value
                        let finalBMR = Math.round(BMR * tdeeObj[activityLevel]);
                        //calculate fat
                        let fatCalries = finalBMR * 0.25;
                        let fat = fatCalries / 9
                        //calculate protein
                        let proteinCalries = BMR * 0.25;
                        let protein = proteinCalries / 4;
                        //calculate carbohydrate
                        //let carbohydratesCalries = BMR - (fatCalries + proteinCalries);
                        let carbohydratesCalries = finalBMR * 0.50;
                        let carbohydrate = carbohydratesCalries / 4;
                        //convert to string 
                        //let calries = Math.round(calculteCalries.toString());
                        //console.log('calries value >>>',calries)

                        //let tde = Math.round(tdee.toString())
                        //let tde = Number(tdee);
                        //console.log('tdee value >>>',tde)

                        //let tde = tdee.toString()

                        let fatVal = Math.round(fat.toString());
                        let proteinVal = Math.round(protein.toString());
                        let carbohydratesVal = Math.round(carbohydrate.toString());
                        //set the state
                        this.setState({
                            calculteCalries: finalBMR,
                            totalDEE: finalBMR,
                            fatMass: fatVal,
                            proteins: proteinVal,
                            carbohydrates: carbohydratesVal
                        })
                        //add properties to object
                        macroObj.age = age;
                        macroObj.totalDEE = finalBMR;
                        macroObj.fatMass = fatVal;
                        macroObj.calculteCalries = finalBMR;
                        macroObj.proteins = proteinVal;
                        macroObj.carbohydrates = carbohydratesVal;
                        let dataUser = await HttpUtils.post('macrodata', macroObj)
                        // console.log(dataUser, 'dataUser')
                    }

                }
            }
        }


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

    activityLevel(activity) {
        if (activity == 'active') {
            this.setState({
                moderate: false,
                sedentary: false,
                light: true,
                extreme: false,
                activityLevel: 'active'
            })
        }
        else if (activity == 'sedentary') {
            this.setState({
                moderate: false,
                sedentary: true,
                light: false,
                extreme: false,
                activityLevel: 'sedentary'
            })
        }
        else if (activity == 'lightActivity') {
            this.setState({
                moderate: true,
                sedentary: false,
                light: false,
                extreme: false,
                activityLevel: 'lightActivity'
            })
        }
        else if (activity == 'veryActive') {
            this.setState({
                moderate: false,
                sedentary: false,
                light: false,
                extreme: true,
                activityLevel: 'veryActive'
            })
        }
    }

    increamentVal(value) {
        const { height, heightInch, currentWeight, goalWeight } = this.state;
        if (value == 'height') {
            const heightNum = Number(height) + 1
            let heightVal = heightNum.toString()
            this.setState({
                height: heightVal
            })
        }
        else if (value == 'heightInch') {
            const heightInches = Number(heightInch) + 1
            let heightInchVal = heightInches.toString()
            this.setState({
                heightInch: heightInchVal
            })
        }
        else if (value == 'currentWeight') {
            const currentWeightNum = Number(currentWeight) + 1
            let currentWeightVal = currentWeightNum.toString()
            this.setState({
                currentWeight: currentWeightVal
            })
        }
        else if (value == 'goalWeight') {
            const goalWeightNum = Number(goalWeight) + 1
            let goalWeightVal = goalWeightNum.toString()
            this.setState({
                goalWeight: goalWeightVal
            })
        }
    }

    decrementVal(value) {
        const { height, heightInch, currentWeight, goalWeight } = this.state;
        if (value == 'height') {
            const heightNum = Number(height) - 1
            let heightVal = heightNum.toString()
            this.setState({
                height: heightVal
            })
        }
        else if (value == 'heightInch') {
            const heightInches = Number(heightInch) - 1
            let heightInchVal = heightInches.toString()
            this.setState({
                heightInch: heightInchVal
            })
        }
        else if (value == 'currentWeight') {
            const currentWeightNum = Number(currentWeight) - 1
            let currentWeightVal = currentWeightNum.toString()
            this.setState({
                currentWeight: currentWeightVal
            })
        }
        else if (value == 'goalWeight') {
            const goalWeightNum = Number(goalWeight) - 1
            let goalWeightVal = goalWeightNum.toString()
            this.setState({
                goalWeight: goalWeightVal
            })
        }
    }

    updateUnits(e, givenUnit) {
        //console.log('unit >', givenUnit)
        if (e == "height Unit") {
            this.setState({
                heightUnit: givenUnit
            })
        }
        else if (e == 'current weight Unit') {
            this.setState({
                currentWeightUnit: givenUnit
            })
        }
        else if (e == 'goal weight Unit') {
            this.setState({
                goalWeightUnit: givenUnit
            })
        }

    }

    macroGet = async () => {
        const { userId } = this.state;
        let userObj = {
            userId: userId
        }
        const specificMacro = await HttpUtils.post('getmacros', userObj);
        if (specificMacro.code == 200) {
            this.setState({
                macroArray: specificMacro.content
            }, () => {
                const userMacroData = this.state.macroArray;
                for (var i in userMacroData) {
                    this.setState({
                        showCurrentMacro: true,
                        currentCalories: userMacroData[i].calculteCalries,
                        currentCarbohy: userMacroData[i].carbohydrates,
                        currentProteins: userMacroData[i].proteins,
                        currentMass: userMacroData[i].fatMass
                    })
                }
            })
        }
    }

    fitnessResultDataGetting = async () => {
        let obj = {
            userId: this.state.userId
        }
        console.log(obj)
        let retrieveData = await HttpUtils.post('getgoal', obj);
        console.log('retrieve data >>>', retrieveData)
        if (retrieveData.code == 200) {
            this.setState({
                userAllData: retrieveData.content
            }, () => {
                //console.log(this.state.userAllData)
                const userData = this.state.userAllData;
                for (var i in userData) {
                    //console.log(userData[i].currentWeight)
                    this.setState({
                        fitnessGoal: userData[i].fitnessGoal
                    }, () => {
                        if (this.state.fitnessGoal == 'maintain weight') {
                            this.setState({
                                showDesiredBtn: false
                            })
                        }
                        else {
                            this.setState({
                                showDesiredBtn: true
                            })
                        }
                    })
                }
            })
        }
    }

   
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    getUnit(data) {
        if (data == 'metric') {
            this.setState({
                unitValue: 'metric',
                impClick: false,
                metrilClick: true
            })
        }
        else if (data == 'imperial') {
            this.setState({
                unitValue: 'imperial',
                impClick: true,
                metrilClick: false
            })
        }
        else if (data == 'normal') {
            this.setState({
                desiredUnitValue: 'normal',
                normal: true,
                mild: false,
                extremeBtn: false
            })
        }
        else if (data == 'mild') {
            this.setState({
                desiredUnitValue: 'mild',
                normal: false,
                mild: true,
                extremeBtn: false
            })
        }
        else if (data == 'extreme') {
            this.setState({
                desiredUnitValue: 'extreme',
                normal: false,
                mild: false,
                extremeBtn: true
            })
        }
    }
    datepick(date) {
        console.log(date, 'date')
    }

    fitnessFun(result) {
        if (result == 'lose') {
            this.setState({
                lose: true,
                gain: false,
                maintain: false,
                fitnessGoal: 'lose weight',
                showDesiredBtn:true
            })
        }
        else if (result == 'gain') {
            this.setState({
                lose: false,
                gain: true,
                maintain: false,
                fitnessGoal: 'gain weight',
                showDesiredBtn:true
            })
        }
        else if (result == 'maintain') {
            this.setState({
                lose: false,
                gain: false,
                maintain: true,
                fitnessGoal: 'maintain weight',
                showDesiredBtn:false

            })
        }
    }


    render() {
        const { dobValidation, genderValidation, heightValidation, currentWeightValidation, goalWeightValidation,
            heightUnitValidation, currentWeightUnitValidation, goalWeightUnitValidation, activityLevelValidation,
            male, female, moderate, sedentary, light, extreme, calculteCalries, fatMass, proteins, carbohydrates,
            dob, date, currentCalories, currentCarbohy, currentProteins, currentMass, showCurrentMacro,
            impClick, metrilClick, unitValue, unitValidation, height, mild, extremeBtn, normal, desiredUnitValue, desiredUnitValidation,
            fitnessGoal, showDesiredBtn,fitnessValidation,lose,gain,maintain,currentDate
        } = this.state;
        console.log('date >>>', date)
        console.log('fitness goal >', fitnessGoal)
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: HeightDimension }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.mainContainer}>
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Macro Calculator
                        </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>Enter your height and weight below to re-calculate
                        your daily macro limit </Text>
                        </View>
                        {
                            showCurrentMacro ?
                                <View>
                                    <Text style={styles.currentMacroText}>Your Current Macro *</Text>
                                    <View style={styles.inputCaloriesContainer}>
                                        <TextInput placeholder={"e.g 1640 Kcl\nCalories"} style={styles.inputCaloriesStyleOne} value={currentCalories + ' Kcal calories'} />
                                        <TextInput placeholder={"e.g 149 g\nCarbohydrates"} style={styles.inputCaloriesStyleTwo} value={currentCarbohy + ' g Carbohyderates'} />
                                        <TextInput placeholder={"e.g 107 g\Protein"} style={styles.inputCaloriesStyleThree} value={currentProteins + ' g Proteins'} />
                                        <TextInput placeholder={"e.g 51 g\nFat"} style={styles.inputCaloriesStyleFour} value={currentMass + ' g Fat'} />

                                    </View>
                                </View>
                                :
                                null
                        }
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.unitPara}>Please choose your prefer to unit</Text>
                        </View>
                        <View style={styles.unitValueContainer}>
                            <TouchableOpacity
                                onPress={this.getUnit.bind(this, 'metric')}
                                style={metrilClick ? styles.metrilClick : styles.maleTouchableOpacity}
                            >
                                <Text style={styles.maleTextStyle}>Metric </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.getUnit.bind(this, 'imperial')}
                                style={impClick ? styles.impClick : styles.femaleContainer}
                            >
                                <Text style={styles.maleTextStyle}>Imperial </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            < View style={{ marginTop: 3 }}>
                                {unitValidation ?
                                    <Text style={styles.validationInstruction}>
                                        Please choose your unit
                                </Text>
                                    : null}
                            </View>

                        }
                        {/* Set fitness goal here  */}

                        <Text style={styles.genderTextStyle}>Select fitness goal</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                            <TouchableOpacity style={lose ? styles.weightStatusClicked : styles.weightStatusBtn} onPress={this.fitnessFun.bind(this, 'lose')}>
                                <Text style={styles.fitnessTextStyle}>
                                    Lose Weight
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={gain ? styles.weightStatusClicked : styles.weightStatusBtn} onPress={this.fitnessFun.bind(this, 'gain')}>
                                <Text style={styles.fitnessTextStyle}>
                                    Gain Weight</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={maintain ? styles.weightStatusClicked : styles.weightStatusBtn} onPress={this.fitnessFun.bind(this, 'maintain')}>
                                <Text style={styles.fitnessTextStyle}>
                                    Maintain Weight</Text>
                            </TouchableOpacity>
                        </View>
                        {fitnessValidation ?
                            <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                <Text style={styles.validationInstruction}>
                                    Please select fitness goal
                                    </Text>
                            </View>
                            :
                            null
                        }


                        {
                            showDesiredBtn ?
                                <View>
                                    <View style={{ marginTop: 8 }}>
                                        <Text style={styles.unitPara}>What is your desired deficit</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <TouchableOpacity
                                            onPress={this.getUnit.bind(this, 'normal')}
                                            style={normal ? styles.clickedButton : styles.buttonStyle}
                                        >
                                            <Text style={styles.maleTextStyle}>Normal</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={this.getUnit.bind(this, 'mild')}
                                            style={mild ? styles.clickedButton : styles.buttonStyle}
                                        >
                                            <Text style={styles.maleTextStyle}>Mild</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={this.getUnit.bind(this, 'extreme')}
                                            style={extremeBtn ? styles.clickedButton : styles.buttonStyle}
                                        >
                                            <Text style={styles.maleTextStyle}>Exreme</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                null
                        }
                        {
                            desiredUnitValidation && showDesiredBtn ?
                                <Text style={styles.validationInstruction}>
                                    Please choose your desired
                          </Text>
                                :
                                null
                        }

                        <View style={styles.dateBirth}>
                            <Text style={styles.textStyle}>Date Of Birth</Text>
                        </View>
                        <View style={styles.ageInputContainer}>
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
                                        width: 1,
                                        height: 1,
                                    },
                                    dateInput: {
                                        backgroundColor:'white',
                                        //opacity:0.4
                                        color:'black'
                                    }
                                }}
                                onDateChange={
                                    // (date) => this.datepick.bind(this, date)
                                    (date) => { this.setState({ dob: date }) }
                                }
                            />
                        </View>
                        {dobValidation ?
                            <View style={styles.validationContainer}>
                                <Text style={styles.validationInstruction}>
                                    Please Pick date of birth
                            </Text>
                            </View>
                            : null}
                        <Text style={styles.genderTextStyle}>Gender</Text>
                    </View>
                    <View style={styles.genderContainer}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={male ? styles.clickedMale : styles.maleTouchableOpacity} onPress={this.getGender.bind(this, 'male')}>
                                <Text style={styles.maleTextStyle}>
                                    Male
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={female ? styles.clickedFemale : styles.femaleContainer} onPress={this.getGender.bind(this, 'female')}>
                                <Text style={styles.maleTextStyle}>Female</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 30, marginTop: 3 }}>
                            {genderValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select the gender
                                </Text>
                                : null}
                        </View>



                        {
                            unitValue == 'imperial' ?
                                <View>
                                    <View style={{ flexDirection: 'row', marginRight: 50, justifyContent: 'space-between' }}>
                                        <Text style={styles.styleForLabel}>Height (fit)</Text>
                                        <Text style={styles.styleForLabel}>Height (Inch)</Text>
                                    </View>
                                    <View style={styles.heightContainer}>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.container}>
                                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                                    onPress={this.decrementVal.bind(this, 'height')}>
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
                                                    onPress={this.increamentVal.bind(this, 'height')}>
                                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={styles.inputContainer}>
                                            <View style={styles.container}>
                                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                                    onPress={this.decrementVal.bind(this, 'heightInch')}>
                                                    <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                                </TouchableOpacity>
                                                <View style={styles.textInputContainer}>
                                                    <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                                        type="number"
                                                        onChangeText={(height) => this.setState({ heightInch: height })}
                                                        value={this.state.heightInch}
                                                    />
                                                </View>
                                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                                    onPress={this.increamentVal.bind(this, 'heightInch')}>
                                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.showValidationContainer}>
                                        {heightValidation ?
                                            <Text style={styles.validationInstruction}>
                                                Please fill your height fit
                                </Text>

                                            : null}
                                        {heightUnitValidation ?
                                            <Text style={styles.validationInstruction}>
                                                Please select height inches
                                </Text>
                                            : null}
                                    </View>
                                </View>

                                :
                                <View>
                                    <Text style={styles.styleForLabel}>Height in centimeter</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TextInput
                                            style={styles.textInputStyleParent}
                                            type="number"
                                            keyboardType='numeric'
                                            onChangeText={(height) => this.setState({ height: height })}
                                            value={this.state.height}
                                        />
                                    </View>
                                </View>

                        }
                        {
                            unitValue == 'imperial' ?
                                <View>
                                    <Text style={styles.styleForLabel}>Current Weight</Text>
                                    <View style={styles.currentWeightContainer}>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.container}>
                                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                                    onPress={this.decrementVal.bind(this, 'currentWeight')}>
                                                    <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                                </TouchableOpacity>
                                                <View style={styles.textInputContainer}>
                                                    <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                                        type="number"
                                                        onChangeText={(currentWeight) => this.setState({ currentWeight: currentWeight })}
                                                        value={this.state.currentWeight}
                                                    />
                                                </View>
                                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                                    onPress={this.increamentVal.bind(this, 'currentWeight')}>
                                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ borderRadius: 4, borderColor: '#e5e5e5', overflow: 'hidden', marginTop: 15, height: 40 }}>
                                            <Picker selectedValue={this.state.currentWeightUnit}
                                                onValueChange={this.updateUnits.bind(this, 'current weight Unit')}
                                                style={styles.pickerStyle}>
                                                <Picker.Item label='Select an option...' value='0' />
                                                <Picker.Item label="LBS" value="lbs" />
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={styles.showValidationContainer}>
                                        {currentWeightValidation ?
                                            <Text style={styles.validationInstruction}>
                                                Please fill your weight
                                </Text>
                                            : null}
                                        {currentWeightUnitValidation ?
                                            <Text style={styles.validationInstruction}>
                                                Please select weight unit
                                </Text>
                                            : null}
                                    </View>
                                </View>
                                :
                                <View>
                                    <Text style={styles.styleForLabel}>Current Weight</Text>
                                    <View style={styles.currentWeightContainer}>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.container}>
                                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                                    onPress={this.decrementVal.bind(this, 'currentWeight')}>
                                                    <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                                </TouchableOpacity>
                                                <View style={styles.textInputContainer}>
                                                    <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                                        type="number"
                                                        onChangeText={(currentWeight) => this.setState({ currentWeight: currentWeight })}
                                                        value={this.state.currentWeight}
                                                    />
                                                </View>
                                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                                    onPress={this.increamentVal.bind(this, 'currentWeight')}>
                                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ borderRadius: 4, borderColor: '#e5e5e5', overflow: 'hidden', marginTop: 15, height: 40 }}>
                                            <Picker selectedValue={this.state.currentWeightUnit}
                                                onValueChange={this.updateUnits.bind(this, 'current weight Unit')}
                                                style={styles.pickerStyle}>
                                                <Picker.Item label='Select an option...' value='0' />
                                                <Picker.Item label="KG" value="kg" />
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={styles.showValidationContainer}>
                                        {currentWeightValidation ?
                                            <Text style={styles.validationInstruction}>
                                                Please fill your weight
                                </Text>
                                            : null}
                                        {currentWeightUnitValidation ?
                                            <Text style={styles.validationInstruction}>
                                                Please select weight unit
                                </Text>
                                            : null}
                                    </View>
                                </View>

                        }


                        {/* <Text style={styles.styleForLabel}>Goal Weight</Text>
                        <View style={styles.goalWeightContainer}>
                            <View style={styles.inputContainer}>
                                <View style={styles.container}>
                                    <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                        onPress={this.decrementVal.bind(this, 'goalWeight')}>
                                        <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                    <View style={styles.textInputContainer}>
                                        <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                            type="number"
                                            onChangeText={(goalWeight) => this.setState({ goalWeight: goalWeight })}
                                            value={this.state.goalWeight}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                        onPress={this.increamentVal.bind(this, 'goalWeight')}>
                                        <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ borderRadius: 4, borderColor: '#e5e5e5', overflow: 'hidden', marginTop: 5, height: 40 }}>
                                <Picker selectedValue={this.state.goalWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'goal weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.showValidationContainer}>
                            {goalWeightValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please fill your goal weight
                                </Text>
                                : null}
                            {goalWeightUnitValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select weight unit
                                </Text>
                                : null}
                        </View> */}

                        <Text style={styles.styleForLabel}>Activity Level</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={sedentary ? styles.clickSedetary : styles.sedetaryContainer}
                                onPress={this.activityLevel.bind(this, 'sedentary')}>
                                <Text style={styles.activityChildsTextStyle}>
                                    Sedentary
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={moderate ? styles.clickModerate : styles.moderateContainer}
                                onPress={this.activityLevel.bind(this, 'lightActivity')}>
                                <Text style={styles.activityChildsTextStyle}>
                                    Light Activity
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                            <TouchableOpacity style={light ? styles.clickedLightStyle : styles.lightTouchableStyle}
                                onPress={this.activityLevel.bind(this, 'active')}>
                                <Text style={styles.lightTextStyle}>
                                    Active
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={extreme ? styles.clickedExtremTouchableStyle : styles.extremTouchableStyle}
                                onPress={this.activityLevel.bind(this, 'veryActive')}>
                                <Text style={styles.lightTextStyle}>
                                    Very Active
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.activityLevelInstruction}>

                            {activityLevelValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select activity level
                                </Text>
                                : null}
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.macroTextStyle}>Your Daily Macros*</Text>
                    </View>
                    <View style={styles.inputCaloriesContainer}>
                        <TextInput placeholder={"e.g 1640 Kcl\nCalories"} style={styles.inputCaloriesStyleOne} value={calculteCalries + ' Kcal calories'} />
                        <TextInput placeholder={"e.g 149 g\nCarbohydrates"} style={styles.inputCaloriesStyleTwo} value={carbohydrates + ' g Carbohyderates'} />
                        <TextInput placeholder={"e.g 107 g\Protein"} style={styles.inputCaloriesStyleThree} value={proteins + ' g Proteins'} />
                        <TextInput placeholder={"e.g 51 g\nFat"} style={styles.inputCaloriesStyleFour} value={fatMass + ' g Fat'} />

                    </View>
                    <View style={styles.lastParaContainer}>
                        <Text style={styles.lastParaStyle}>
                            *This is the daily calories limit as calculated by the app using the above infromation.
                            If your coach has set another limit for you, please enter it above.
                        </Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <CaloriesSetupBtn title='Calculate Macro'
                            caloriesBtnStyle={styles.caloriesBtnStyle}
                            onPress={this.calulateMacro}
                        />
                    </View>
                    <View style={{ flex: 2, marginBottom: 30 }}>
                    </View>
                </View>
            </ScrollView >
        )
    }

}

export default Macrocalculator;