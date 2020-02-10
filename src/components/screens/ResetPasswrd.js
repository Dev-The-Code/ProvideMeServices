import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    
} from 'react-native';
import styles from '../Styling/ResetPasswordScreenStyle';
//import TextInputs from '../textInputs/TextInputs'
import CaloriesSetupBtn from '../buttons/setUpBtn';
import HttpUtilsFile from '../Services/HttpUtils';
import OverlayLoader from '../Loader/OverlaySpinner';
//console.log(HttpUtilsFile);
const { height } = Dimensions.get('window');

class ResetpasswordScreen extends React.Component {
    static navigationOptions = {
        //title: 'Reset Password',
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTintColor: 'white'
    };
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            emailValidate: true,
            isLoading: false,
            emailNotExist: false,
            emailMatched: false
        }


    }

    resetPassword = async () => {
        const { email, emailValidate } = this.state;
        const { navigate } = this.props.navigation;
        
        console.log('on press')
        if (email == '') {
            Alert.alert('Please fill input field')
            if (emailValidate !== true) {
                Alert.alert('Please enter correct field')
            }
         this.setState({
             emailValidate:false
         })   
        }
        else {
            this.setState({ isLoading: true })
            const userEmail = {
                email: email
            }
            console.log(userEmail)

            try {
                
                let getEmails = await HttpUtilsFile.get('getuseremail')
                console.log('allusers emails >>>',getEmails);
                let emailCode = getEmails.code;
                const emailContents = getEmails.content;
                console.log('email contents >>>',emailContents)
                const dataUser = await HttpUtilsFile.post('postemail', userEmail)
                console.log(dataUser)
                let resetCode = dataUser.code; 
                let emailSentMsg = dataUser.data;
                if (emailCode) {
                    this.setState({
                        isLoading: false
                    })

                    const databaseEmails = emailContents.map((items, index) => {
                        return items;
                    })
                    //console.log(databaseEmails, 'total emails')
                    //console.log(email)
                    for (var i = 0; i < databaseEmails.length; i++) {
                        console.log(databaseEmails[i])
                        if (email == databaseEmails[i]) {
                            //console.log('email matched')
                            this.setState({
                                emailNotExist: false,
                                isLoading:false
                            })
                            navigate('ConfirmResetPassword')
                            this.setState({
                                email:''
                            })
                            break;
                        }
                        else if (email != databaseEmails[i]) {
                            //console.log('email not matched')
                            this.setState({
                                emailNotExist: true,
                                isLoading:false
                            })
                            setTimeout(()=>{
                                this.setState({
                                    emailNotExist: false
                                })
                               },5000) 
                        }


                        }


                }
                
                if(resetCode && !this.state.emailNotExist){
                    this.setState({
                        isLoading: false
                    })
                    
                    navigate('ConfirmResetPassword');
                    

                }


            }

            catch (error) {
                if (error) {
                    this.setState({
                        isLoading: false
                    })
                    console.log(error);

                }

            }
            this.setState({
                email: '',
        
            })

        }

    }



    resetPasswordCheckValidate = (text, type) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (type === 'email') {
            if (reg.test(text)) {
                this.setState({
                    emailValidate: true,
                })
            }
            else {
                this.setState({
                    emailValidate: false
                })
            }
        }
    }

    emailHandleFunc = (text) => {
        //console.log(text)
        this.setState({
            email: text
        })



    }


    render() {

        const { email, isLoading, emailNotExist } = this.state;
        //console.log(email);
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{backgroundColor: 'black', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={styles.container}>
                        <View style={styles.resetPasswrdContainer}>
                            <Text style={styles.resetTextStyle}>Reset Password</Text>
                        </View>
                        <Text style={styles.textsStyles}>Enter your GetFitAthletic email to reset password</Text>
                        
                        <Text style={styles.emailTextStyle}>Email</Text>
                        <View style={styles.inputFields}>
                            <TextInput
                                onChangeText={(text) => {
                                    this.emailHandleFunc(text),
                                    this.resetPasswordCheckValidate(text, 'email')
                                }}
                                placeholder="email@gmail.com"
                                placeholderTextColor="#7e7e7e"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={email}
                                style={[styles.inputTextStyle, !this.state.emailValidate ? styles.errorInput : null]}
                            />
                        </View>
                        
                        {emailNotExist && <View style={styles.emailExistContainer}>
                            <Text style={styles.emailNotExistStyle}>
                                Email is not registerd
                       </Text>
                        </View>}
                        <View style={styles.btnContainer}>
                            <CaloriesSetupBtn
                                title='Send Reset Instructions'
                                caloriesBtnStyle={styles.caloriesBtnStyle}
                                onPress={() => { this.resetPassword() }}
                            />
                        </View>
                        
                    </View>
                    {isLoading ? <OverlayLoader /> : null}
                </ScrollView>
            </View>

        )
    }
}

export default ResetpasswordScreen;


