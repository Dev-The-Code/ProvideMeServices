import React from 'react';
import { 
  Alert, 
  Text, 
  View, 
  TextInput, 
  Dimensions, 
  ScrollView,
  ActivityIndicator,
  TouchableOpacity, 
  Image 
} from 'react-native';
import styles from '../Styling/ConfirmResetPasswordStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import HttpUtilsFile from '../Services/HttpUtils';
import OverlayLoader from '../Loader/OverlaySpinner';
console.log(HttpUtilsFile)
const { height } = Dimensions.get('window');


class ConfirmResetPassword extends React.Component {
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
      newPassword:'',
      newPasswordValidate:true,
      retypePassword:'',
      retypePasswordValidate:true,
      emailCode:'',
      psswrdInstruction:false,
      passNotMatch:false,
      isLoading:false,
      emailCodeNotValid:false,
      successPassChange:'',
      changePassword:false

    }


  }

  confirmResetPassword=async ()=>{
    const {navigate}=this.props.navigation;
    const {newPassword,retypePassword,emailCode,newPasswordValidate,retypePasswordValidate,isLoading}=this.state;
    if(newPassword == '' || retypePassword == '' || emailCode == ''){
      Alert.alert('Please fill input field')
      if(newPasswordValidate != true || retypePasswordValidate != true){
         Alert.alert('Please correct input field')
      }
    }
  else {
      this.setState({
         isLoading:true
      })
      const userObj={
        code:emailCode,
        password:newPassword
      }
      try{
         let userData = await HttpUtilsFile.post('changepassword',userObj)
        console.log(userData);
        let userDataRespons = userData.code;
       if(userDataRespons){
        this.setState({
          isLoading:false,
          emailCode:'',
          newPassword:'',
          retypePassword:'',
          successPassChange:userData.msg,
          changePassword:true
        })
        setTimeout(()=>{
          navigate('Login')
        },5000)

       }
       else if(userData == undefined){
        this.setState({
          isLoading:false,
          emailCodeNotValid:true,
          emailCode:'',
          newPassword:'',
          retypePassword:''
        })
         
       } 
           
         
      }
      catch(error){
        console.log(error)
        if(error){
          this.setState({
            isLoading:false,
            emailCode:'',
           newPassword:'',
           retypePassword:''
          })
          Alert.alert('Something went wrong');
        }
      }
      this.setState({
        emailCode:'',
        newPassword:'',
        retypePassword:''
      })  
    ss
  }
  
  }



  newPasswrdInputValueHandle=(text)=>{
      this.setState({
        newPassword:text
      },()=>{
        const {newPassword ,retypePassword }=this.state;
        if (newPassword.length < 4) {
          this.setState({
            newPasswordValidate: false,
              psswrdInstruction: true
          })
      }
      if (newPassword.length >= 4) {
          this.setState({
            newPasswordValidate: true,
              psswrdInstruction: false
          })
      }
      if (newPassword.length > 9) {
          this.setState({
            newPasswordValidate: false,
            psswrdInstruction: true
          })
      }

      if (retypePassword != newPassword) {
          this.setState({
              passNotMatch: true,
              passMatch: false
          })
      }
      if (retypePassword == newPassword) {
          this.setState({
              passNotMatch: false,
              passMatch: true
          })
      }

      if (retypePassword == '') {
          this.setState({
              passNotMatch: false,
              passMatch: false
          })
      }
      })
  }

  retypePasswordInputHandle=(text)=>{
     this.setState({
      retypePassword:text
     },()=>{
       const {retypePassword , newPassword}=this.state;
       if (retypePassword.length < 4) {
        this.setState({
          retypePasswordValidate: false,

            // psswrdInstruction:true
        })
    }
    if (retypePassword.length >= 4) {
        this.setState({
          retypePasswordValidate: true,
            //    psswrdInstruction:false
        })
    }

    if (retypePassword.length > 9) {
        this.setState({
          retypePasswordValidate: false,
            //    psswrdInstruction:true
        })
    }
    if (retypePassword != newPassword) {
        this.setState({
            passNotMatch: true,
            passMatch: false
        })
    }
    if (retypePassword == newPassword) {
        this.setState({
            passNotMatch: false,
            passMatch: true
        }
        , () => {
            setTimeout(() => {
                this.setState({
                    passMatch: false
                })
            }, 5000)

        }
        )
    }



     })
  }
 

  render() {
    
    const {
      newPassword,
      retypePassword,
      psswrdInstruction,
      passNotMatch,
      passMatch,
      isLoading,
      emailCode,
      emailCodeNotValid,
      successPassChange,
      changePassword
    }=this.state;
      
    // console.log('new password--->',newPassword , 'retype password--->',retypePassword, 'email code--->',emailCode)

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={{backgroundColor: 'black', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
          <View style={styles.container}>
            <View style={styles.heading}>
              <Text style={styles.headingStyle}>Set New Password</Text>
            </View>
            <View style={styles.firstPara}>
              <Text style={styles.firstParaStyle}>
                Enter a new password for your GetFitAthletic account .
            </Text>
           
            </View>
            <Text style={styles.emailCodeText}>Email Code</Text>
            <View style={styles.emailCodeContainer}>
              {/* <Text>For new password input</Text> */}

              <TextInput
                onChangeText={(text)=>{this.setState({emailCode:text})}}
                keyboardType="numeric"
                placeholder="e.g:4567"
                placeholderTextColor="#7e7e7e"
                value={emailCode}
                style={styles.emailCodeInputStyle} />

            </View>
             <View>
              {emailCodeNotValid && <Text style={styles.emailNotValidTextStyle}>
                Email Code Not Valide
              </Text>}
             </View>
            <Text style={styles.newPasswordText}>New Password</Text>
            <View style={styles.newPasswordField}>

              <TextInput
                onChangeText={text => this.newPasswrdInputValueHandle(text)}
                secureTextEntry={true}
                placeholder="type new password"
                placeholderTextColor='#7e7e7e'
                value={newPassword}
                style={[styles.newPasswordFieldStyle, !this.state.newPasswordValidate ? styles.errorInput : null]} />

            </View>
            {psswrdInstruction && <View style={styles.passwrdInstructionContainer}>
                        <Text style={styles.instructionStyle}>
                            {/* Input Password and Submit [7 to 15 characters which contain only characters,
                          numeric digits, underscore and first character must be a letter] */}
                            Password strength is required maximum 9 and greater then 4
                         </Text>
                    </View>}
            <Text style={styles.newPasswordText}>Retype new password</Text>
            <View style={styles.retypePasswrdField}>

              <TextInput
                onChangeText={(text)=>{this.retypePasswordInputHandle(text)}}
                secureTextEntry={true}
                placeholder="retype new password"
                placeholderTextColor='7e7e7e'
                value={retypePassword}
                style={[styles.newPasswordFieldStyle,!this.state.retypePasswordValidate ? styles.errorInput : null]}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.passMatchContainer}>
            {passNotMatch &&<Text style={styles.passNotMatchStyle}>
                            Password Not Match
                       </Text>}
                    </View>
                    <View style={styles.passMatchContainer}>
                    {passMatch &&  <Text style={styles.passMatchStyle}>
                            Password Match
                       </Text>}
                    </View>
                    {/* {isLoading && <View style={[styles.spinerContainer, styles.horizontal]}>
                        <ActivityIndicator size='large' color="#FF6200" />
                    </View>} */}
              <View style={styles.passMatchContainer}>
              {changePassword && <Text style={styles.passChangeTextStyle}>
                {successPassChange}
              </Text>}
            </View>   
            {isLoading ? <OverlayLoader /> : null}     
            
            <View style={styles.btnContainer}>
              <CaloriesSetupBtn
                title='Reset Password'
                caloriesBtnStyle={styles.caloriesBtnStyle}
                onPress={this.confirmResetPassword}
              />
            </View>

          </View>
          
        </ScrollView>
      </View>
    )
  }

}

export default ConfirmResetPassword;

