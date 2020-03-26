import React from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import styles from '../Styling/LoginScreenStyle';
import HttpUtilsFile from '../Services/HttpUtils';
import firebase from '../Config/Firebase';
const db = firebase.database();
// console.log('firebase credential >>>', firebase)
// import firebasePushNotification from 'react-native-firebase';
import OverlayLoader from '../Loader/OverlaySpinner';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';

import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
// import 'firebase/firestore';

const { height } = Dimensions.get('window');
class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValidate: true,
      password: '',
      passwrdValidate: true,
      psswrdInstruction: false,
      isLoading: false,
      passwordNotMatch: '',
      psswrdNotMatchShow: false,
      emailAndPasswrd: false,
      deviceToken: '',
      errorMessage: '',
      loggedIn: false,
      userInfo: {}
    }
    //this.checkUserLogin()
  }
  componentWillMount() {
    this.checkUserLogin();
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  // async componentDidMount() {
  //   this._configureGoogleSignIn();
  //   await this._getCurrentUser();
  // }

  // _configureGoogleSignIn() {
  //   GoogleSignin.configure({
  //     webClientId: "130141256378-3f9k024bjv0aeniq5ta4d7k5rrfqhmul.apps.googleusercontent.com",
  //     offlineAccess: false,
  //   });
  // }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '130141256378-3f9k024bjv0aeniq5ta4d7k5rrfqhmul.apps.googleusercontent.com',
      androidClientId: '130141256378-dsrgcm1cp71068jba42vo1f5h3n3d8tq.apps.googleusercontent.com',
      //offlineAccess: true,
      // hostedDomain: '', 
      // forceConsentPrompt: true, 
    });
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const currentUser = GoogleSignin.getTokens().then((res) => {
        console.log(res.accessToken);
      });
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo, loggedIn: true });
      console.log('Userinfo>>', userInfo)
    }
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('error', error.toString())
        Alert.alert('error', error.toString())
      }
    }

  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      //this.setState({ userInfo });
      console.log('userinfo>>', userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({ currentUser });
    console.log('currentUser>>', currentUser)
  };



  // Facebook Functions
  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name, first_name, last_name, email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({ userInfo: result });
          console.log('result:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  }

  // Start here firebase push notification
  // getTokenPermission=()=>{
  //   const { navigation } = this.props;
  //     this.focusListener = navigation.addListener('didFocus', () => {
  //       this.checkPermission();
  //     });
  // }
  //  componentDidMount() {
  //   this.checkPermission();

  // }

  //1
  //  checkPermission = async () =>{
  //   //  console.log('permission function run here')
  //   const enabled = await firebasePushNotification.messaging().hasPermission();
  //   if (enabled) {
  //       this.getToken();
  //   } else {
  //       this.requestPermission();
  //   }
  // }

  //  //3
  //   getToken = async ()=>{
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //       fcmToken = await firebasePushNotification.messaging().getToken();
  //       if (fcmToken) {
  //           // user has a device token
  //           this.setState({
  //             deviceToken:fcmToken
  //           })
  //           await AsyncStorage.setItem('fcmToken', fcmToken);
  //       }
  //   }
  //   else {
  //     this.setState({
  //       deviceToken:fcmToken
  //     })
  //     await AsyncStorage.setItem('fcmToken', fcmToken);
  //   }
  // }

  //   //2
  //  requestPermission= async ()=>{
  //   try {
  //       await firebasePushNotification.messaging().requestPermission();
  //       // User has authorised
  //      // console.log('request permission user authorised');
  //       this.getToken();
  //   } catch (error) {
  //       // User has rejected permissions
  //       console.log('permission rejected');
  //   }
  // }

  alreadyUserLogin = () => {
    const { navigate } = this.props.navigation;
    const user = firebase.auth().currentUser;
    console.log('user >>', user)
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        navigate('BottomTabe')
        // let userData = JSON.parse(value);
        // userData.status = 'Offline'
        // db.ref(`users/${userData._id}`).update(userData);
      }
    })
  }

  checkUserLogin = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      console.log('Login user !!!')
      this.alreadyUserLogin()
    });
  }


  loginFunc = async () => {
    const { navigate } = this.props.navigation;
    const { email, password, emailValidate, passwrdValidate, deviceToken } = this.state;
    // let userObj= {}
    if (email == '' || password == '') {
      Alert.alert('Please Fill All Fields')
      if (emailValidate !== true || passwrdValidate !== true) {
        Alert.alert('Fill Correct Fields')
      }
    }
    else {
      this.setState({
        isLoading: true
      })
      // userObj.email = email;
      // userObj.password = password
      const userObj = {
        email: email,
        password: password,
        //deviceToken:deviceToken
        // type:'trainny'
      }
      console.log('Object data>>>', userObj)
      try {
        let sendData = await HttpUtilsFile.post('signin', userObj);
        console.log('DataSend >>>', sendData)
        if (sendData.code == 200) {
          this.setState({
            isLoading: false
          }, () => {
            navigate('BottomTabe')
          })

        }
      }

      catch (err) {
        console.log(err)

      }




      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(() =>
      //     AsyncStorage.setItem('currentUser', JSON.stringify(userObj)),
      //   this.setState({ isLoading: false }, () => navigate('Usertype'))
      //   )
      //   .catch(error => this.setState({
      //     errorMessage: error.message,
      //     emailAndPasswrd: true,
      //     isLoading: false
      //})
      //)

      // }
      // catch (error) {
      //   console.log(error)
      //   this.setState({
      //     isLoading: false,
      //     emailAndPasswrd: true,
      //   })
      //   setTimeout(() => {
      //     this.setState({
      //       emailAndPasswrd: false
      //     })
      //   }, 5000)
      // }
      this.setState({
        password: ''
      })
    }
  }

  checkValidateFunc = (text, type) => {
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

  passwordHandle = (text) => {
    this.setState({
      password: text
    }, () => {
      const { password } = this.state;
      if (password.length < 4) {
        this.setState({
          passwrdValidate: false,
          psswrdInstruction: true
        })

      }
      else if (password.length >= 4) {
        this.setState({
          passwrdValidate: true,
          psswrdInstruction: false
        })
      }
    })
  }



  render() {
    const { navigate } = this.props.navigation;
    const { email, password, psswrdInstruction, isLoading, passwordNotMatch, psswrdNotMatchShow, emailAndPasswrd } = this.state;
    //console.log('error >>', this.state.errorMessage)
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
        <View style={styles.loginTextContainer}>
          <Text style={styles.textLogin}>
            Login
          </Text>
        </View>
        <View style={styles.logoContainer}>
          {/* <Image source={require('../icons/logo.png')} style={styles.forImages} resizeMode='contain' /> */}
          <Text style={styles.graveyard}>GRAVEYARD</Text>
          <Text style={styles.application}>APPLICATION</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={styles.paraContainer}>
          <Text style={styles.paraText}>
            Enter your Provide Me Service email and password below to login
                 </Text>
        </View>
        <View style={{ flex: 0.2 }}></View>
        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
          {/* <Text style={styles.textsStyles}>Email</Text> */}
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 5 }}>
          <Text style={styles.textsStyles}>Email</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput
            onChangeText={text => {
              this.checkValidateFunc(text, 'email'),
                this.setState({ email: text })
            }}
            keyboardType='email-address'
            placeholder="email@gmail.com"
            placeholderTextColor="#7e7e7e"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            style={[styles.inputTexts, !this.state.emailValidate ? styles.errorInput : null]}
          />
        </View>
        <View style={{ flex: 0.5 }}></View>
        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
          {/* <Text style={styles.textsStyles}>Password</Text> */}

        </View><View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 5 }}>
          <Text style={styles.textsStyles}>Password</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput
            onChangeText={(text) => this.passwordHandle(text)}
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="#7e7e7e"
            value={password}
            style={[styles.inputTexts, !this.state.passwrdValidate ? styles.errorInput : null]} />
        </View>
        {/* {isLoading && <View style={[styles.spinerContainer, styles.horizontal]}>
          <ActivityIndicator size='large' color="#FF6200" />
        </View>} */}
        {isLoading ? <OverlayLoader /> : null}
        {psswrdNotMatchShow ? <View style={styles.passMatchContainer}>
          <Text style={styles.passNotMatchStyle}>
            {passwordNotMatch}
          </Text>
        </View> : null}
        {emailAndPasswrd ?
          <View style={styles.passMatchContainer}>
            <Text style={styles.passNotMatchStyle}>
              {this.state.errorMessage}
            </Text>
          </View> : null}

        {psswrdInstruction && <View style={styles.passwrdInstructionContainer}>
          <Text style={styles.instructionStyle}>
            Password strength is required maximum 9 and greater then 4
            </Text>
        </View>}
        <View style={{ flex: 1 }}></View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity style={styles.loginButtonContainer} onPress={this.loginFunc}>
            <Text style={styles.loginButton}>Log In</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>

        <View style={{ flex: 1 }}></View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}></View>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress}
          />
          <View style={{ flex: 1 }}></View>
        </View>


        {/* Facebook Work */}

        <View style={{ flex: 1 }}></View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}></View>

          <LoginButton
            permissions={['public_profile', 'email']}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  const accessToken = data.accessToken.toString();
                  this.getInfoFromToken(accessToken);
                  console.log("Token>>", accessToken)
                });
              }
            }}
            onLogoutFinished={() => {
              console.log("logout")
              this.setState({ userInfo: {} })
            }

            }
          />
          <View style={{ flex: 1 }}></View>
        </View>

        {/* <LoginButton
            permissions={['public_profile', 'email']}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              }
              else {
                AccessToken.getCurrentAccessToken()
                  .then((user) => {
                    console.log("Facebook accessToken:\n" + user.accessToken + "\n\nuserID: " + user.userID)
                    console.log(user);
                    return user
                  })
                  .then((user) => {
                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error)
                        console.log('Error fetching data: ' + error.toString());
                      } else {
                        console.log(result)
                        console.log('id: ' + result.id + '\n\nname: ' + result.name + '\n\nfirst_name: ' + result.first_name + '\n\nlast_name: ' + result.last_name + '\n\nemail: ' + result.email);
                      }
                    }

                    const infoRequest = new GraphRequest('/me', {
                      accessToken: user.accessToken,
                      parameters: {
                        fields: {
                          string: 'email,name,first_name,last_name'
                        }
                      }
                    }, responseInfoCallback);

                    // Start the graph request.
                    new GraphRequestManager()
                      .addRequest(infoRequest)
                      .start()
                  })
              }
            }}
            onLogoutFinished={() =>
              console.log("logout.")
              //  this.setState({ userInfo: {} })
            }
          /> */}

        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 35, marginBottom: 12 }}>
          <TouchableOpacity style={styles.resetPassContainer} onPress={() => { navigate('ResetpasswordScreen') }} >
            <Text style={styles.resetPasswrdTextStyle}>Forgot password ? </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ flex: 2 }}></View>
        <View style={styles.btnContainer}>
          <Text style={styles.accountText}>Don't have account?</Text>
          <TouchableOpacity onPress={() => { navigate('Signup') }}><Text style={styles.registerText}>Register here.</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 3 }}></View>
      </ScrollView>
    );
  }
}

export default Login;




