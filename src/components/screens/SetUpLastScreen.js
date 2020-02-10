import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../Styling/LastScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn'
import HttpUtils from '../Services/HttpUtils';
import OverlayLoader from '../Loader/OverlaySpinner';
const { heightDimension } = Dimensions.get('window');

class LastSetUpScreen extends React.Component {
    static navigationOptions = {

        headerStyle: {
            backgroundColor: 'black'
        },
        headerTintColor: 'white'
    };
    constructor(props) {
        super(props)
        this.state = {
            activityLevel: '',
            calculteCalries: '',
            totalDEE: '',
            fatMass: '',
            proteins: '',
            carbohydrates: '',
            tdeeObj: { sedentary: 1.2, lightActivity: 1.375, active: 1.55, veryActive: 1.725 },
            activityLevelValidation: false,
            sedentary: false,
            lightActivity: false,
            active: false,
            veryActive: false
        }
    }
    activityLevel(activity) {
        if (activity == 'lightActivity') {
            this.setState({
                sedentary: false,
                lightActivity: true,
                active: false,
                veryActive: false,
                activityLevel: 'lightActivity'
            })
        }
        else if (activity == 'sedentary') {
            this.setState({
                sedentary: true,
                lightActivity: false,
                active: false,
                veryActive: false,
                activityLevel: 'sedentary'
            })
        }
        else if (activity == 'active') {
            this.setState({
                sedentary: false,
                lightActivity: false,
                active: true,
                veryActive: false,
                activityLevel: 'active'
            })
        }
        else if (activity == 'veryActive') {
            this.setState({
                sedentary: false,
                lightActivity: false,
                active: false,
                veryActive: true,
                activityLevel: 'veryActive'
            })
        }
    }
    calulateMacro = async () => {
        const { tdeeObj, activityLevel } = this.state;
        const { dob, gender, date, time, userId, height, currentWeight, goalWeight, heightUnit, currentWeightUnit, goalWeightUnit } = this.props.navigation.state.params;
        let age;
        let macroObj = {
            dob: dob,
            gender: gender,
            height: height,
            heightUnit: heightUnit,
            currentWeight: currentWeight,
            currentWeightUnit: currentWeightUnit,
            goalWeight: goalWeight,
            goalWeightUnit: goalWeightUnit,
            activityLevel: activityLevel,
            date: date,
            time: time,
            userId: userId
        };
        let year = new Date().getFullYear(); //Current Year
        //let ageyear = new Date(this.props.navigation.state.params.dob).getFullYear();
        let ageyear = this.props.navigation.state.params.dob.slice(6,10)
        age = year - ageyear;
        if (gender == 'male') {
            let calculteCalries = 10 * currentWeight + 6.25 * height - 5 * age + 5;
            // get tdee value
            let tdee = calculteCalries * tdeeObj[activityLevel]
            //calculate fat
            let fatCalries = tdee * 0.25;
            let fat = fatCalries / 9
            //calculate protein
            let proteinCalries = calculteCalries * 0.25;
            let protein = proteinCalries / 4;
            //calculate carbohydrate
            let carbohydratesCalries = calculteCalries - (fatCalries + proteinCalries);
            let carbohydrate = carbohydratesCalries / 4;
            //convert to string 
            let calries = Math.round(calculteCalries.toString());
            let tde = tdee.toString()
            let fatVal = Math.round(fat.toString());
            let proteinVal = Math.round(protein.toString());
            let carbohydratesVal = Math.round(carbohydrate.toString());
            //set the state
            this.setState({
                calculteCalries: calries,
                totalDEE: tde,
                fatMass: fatVal,
                proteins: proteinVal,
                carbohydrates: carbohydratesVal
            })
            //add properties to object
            macroObj.age = age;
            macroObj.totalDEE = tde;
            macroObj.fatMass = fatVal;
            macroObj.calculteCalries = calries;
            macroObj.proteins = proteinVal;
            macroObj.carbohydrates = carbohydratesVal;
            let dataUser = await HttpUtils.post('macrodata', macroObj)
            console.log(dataUser, 'dataUser')
            if (dataUser.code == 200) {
                this.props.navigation.navigate('Login')
              //console.log('success data user')
            }


        }
        else if (gender == 'female') {
            let calculteCalries = 10 * currentWeight + 6.25 * height - 5 * age - 161;
            // get tdee value
            let tdee = calculteCalries * tdeeObj[activityLevel];
            //calculate fat
            let fatCalries = tdee * 0.25;
            let fat = fatCalries / 9
            //calculate protein
            let proteinCalries = calculteCalries * 0.25;
            let protein = proteinCalries / 4;
            //calculate carbohydrate
            let carbohydratesCalries = calculteCalries - (fatCalries + proteinCalries);
            let carbohydrate = carbohydratesCalries / 4;
            //convert to string 
            let calries = calculteCalries.toString();
            let tde = tdee.toString();
            let fatVal = fat.toString();
            let proteinVal = protein.toString();
            let carbohydratesVal = carbohydrate.toString();
            //set the state
            this.setState({
                calculteCalries: calries,
                totalDEE: tde,
                fatMass: fatVal,
                proteins: proteinVal,
                carbohydrates: carbohydratesVal
            })
            //add properties to object
            macroObj.age = age;
            macroObj.totalDEE = tde;
            macroObj.fatMass = fatVal;
            macroObj.calculteCalries = calries;
            macroObj.proteins = proteinVal;
            macroObj.carbohydrates = carbohydratesVal;
            let dataUser = await HttpUtils.post('macrodata', macroObj)
            console.log(dataUser, 'dataUser')
            //this.props.navigation.navigate('BottomTabe')
            this.props.navigation.navigate('Login')
        }
    }

    render() {
        const { activityLevelValidation, sedentary, lightActivity, active, veryActive,
            calculteCalries, fatMass, proteins, carbohydrates } = this.state;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'black', height: heightDimension }} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>Set Up Your App</Text>
                    </View>
                    <View style={styles.paraContainer}>
                        <Text style={styles.paraStyle}>GetFitAthletic needs the following info to help you with your fitness journey</Text>
                    </View>
                    <Text style={styles.paraStyle}>Activity Level</Text>
                    <View style={styles.activityContainer}>
                        <TouchableOpacity style={sedentary ? styles.sedetaryContainer : styles.touchOpacityStyle}
                            onPress={this.activityLevel.bind(this, 'sedentary')}>
                            <Text style={styles.headerTextStyle}>Sedentary</Text>
                            <Text style={styles.textStyle}>Desk job very little activity.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={lightActivity ? styles.moderateContainer : styles.touchOpacityStyle}
                            onPress={this.activityLevel.bind(this, 'lightActivity')}
                        >
                            <Text style={styles.headerTextStyle}>Light Activity</Text>
                            <Text style={styles.textStyle}>Some Standing and moving.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scndActivity}>
                        <TouchableOpacity style={active ? styles.lightTouchableStyle : styles.touchOpacityStyle}
                            onPress={this.activityLevel.bind(this, 'active')}
                        >
                            <Text style={styles.headerTextStyle}>Active</Text>
                            <Text style={styles.textStyle}>Mostly standing and moving.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={veryActive ? styles.extremTouchableStyle : styles.touchOpacityStyle}
                            onPress={this.activityLevel.bind(this, 'veryActive')}
                        >
                            <Text style={styles.headerTextStyle}>Very Active</Text>
                            <Text style={styles.textStyle}>Heavy moving and lifting heavy stuff.</Text>
                        </TouchableOpacity>
                    </View>
                    {activityLevelValidation ?
                        <View style={{ marginBottom: 10, alignItems: 'center' }}>
                            <Text style={styles.validationInstruction}>
                                Please select activity level
                            </Text>
                        </View>
                        : null}
                    <Text style={styles.paraStyle}>Your Daily Macros*</Text>
                    <View style={styles.macrosContainer}>
                        <TextInput placeholder="1640 Kcal calories" placeholderTextColor='black' style={styles.textInputOne} value={calculteCalries + ' Kcal calories'} />
                        <TextInput placeholder="159 g Carbohyd. " placeholderTextColor='black' style={styles.textInputTwo} value={fatMass + ' g Carbohyd.'} />
                        <TextInput placeholder="107 g Proteins" placeholderTextColor='black' style={styles.textInputThree} value={proteins + ' g Proteins'} />
                        <TextInput placeholder="51 g Fat " placeholderTextColor='black' style={styles.textInputFour} value={carbohydrates + ' g Fat'} />
                    </View>
                    <Text style={styles.paraStyle}>*This is the daily calories limit as calculated by the app using the above information . If
                        your coach has set another limit for you , please enter it above.
                    </Text>
                    <View style={styles.btnContainer}>
                        <CaloriesSetupBtn title="Set Up & Use App"
                            onPress={this.calulateMacro}
                            caloriesBtnStyle={styles.caloriesBtnStyle} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default LastSetUpScreen;
