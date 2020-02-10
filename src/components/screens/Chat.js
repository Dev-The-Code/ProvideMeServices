import React from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  TextInput,
  Linking,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage
} from 'react-native';
import styles from '../Styling/ChatScreenStyle';
import ImagePicker from 'react-native-image-picker';
import FilePickerManager from 'react-native-file-picker';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import HttpUtils from '../Services/HttpUtils';
import VideoPlayer from 'react-native-video-player';
import Modal from "react-native-modal";
import ChartScreen from '../BarChart/BarChart';
import Spinner from 'react-native-loading-spinner-overlay';
import { YellowBox } from 'react-native';
import firebasePushNotification from 'react-native-firebase';


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

console.disableYellowBox = true;
console.ignoredYellowBox = ['Remote debugger'];

const db = firebase.database();
const CryptoJS = require('crypto-js');

class Chatscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessage: '',
      chatMessages: [],
      sendIcon: true,
      micIcon: true,
      micOrange: false,
      sendBtnContainer: true,
      orangeMicContainer: false,
      recodringBody: false,
      messagContainer: false,
      attachGray: true,
      attachOrange: false,
      shareFiles: false,
      avatarSource: null,
      expand: false,
      todayDate: '',
      time: '',
      userId: '',
      opponentId: '',
      opponnetAvatarSource: '',
      name: '',
      isVisibleModal: false,
      imagePath: '',
      monthName: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      weekExcercise: [],
      weekAgoDateDataWeights: [],
      currentDateDataWeights: [],
      loseWeight: '',
      lastWeek: '',
      cureentWeek: 0,
      gainWeight: '',
      forTrainnerModal: false,
      senderData: '',
      isLoading: false,
      fileUpLoading: false,
      forVideoModal: false,
      smallVideo: true,
      largeSizeVideo: false,
      showReport: false,
      yesterdayDate: '',
      deviceToken: '',
      userToken: '',
      yesterdayDate: '',
      chatDates: [],
      chatMonths: [],
      chatYear: [],
      // yesterdayDate: '',
      // deviceToken: '',
      // userToken: ''

    }
  }

  componentDidMount() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    let min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    let time;
    if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
      month = `0${month}`
    }
    if (date == 1 || date == 2 || date == 3 || date == 4 || date == 5 || date == 6 || date == 7 || date == 8 || date == 9) {
      date = `0${date}`
    }
    if (min == 0 || min == 1 || min == 2 || min == 3 || min == 4 || min == 5 || min == 6 || min == 7 || min == 8 || min == 9) {
      min = `0${min}`
    }
    if (hours == 12 || hours == 13 || hours == 14 || hours == 15 || hours == 16 || hours == 17 || hours == 18 || hours == 19 || hours == 20 || hours == 21 ||
      hours == 22 || hours == 23) {
      if (hours == 12) {
        time = `12:${min} PM`;
      } else if (hours == 13) {
        time = `1:${min} PM`;
      } else if (hours == 14) {
        time = `2:${min} PM`;
      } else if (hours == 15) {
        time = `3:${min} PM`;
      } else if (hours == 16) {
        time = `4:${min} PM`;
      } else if (hours == 17) {
        time = `5:${min} PM`;
      } else if (hours == 18) {
        time = `6:${min} PM`;
      } else if (hours == 19) {
        time = `7:${min} PM`;
      } else if (hours == 20) {
        time = `8:${min} PM`;
      } else if (hours == 21) {
        time = `9:${min} PM`;
      } else if (hours == 22) {
        time = `10:${min} PM`;
      } else if (hours == 23) {
        time = `11:${min} PM`;
      }
    }
    else {
      if (hours == "00") {
        time = `12:${min} AM`;
      }
      else {
        time = `${hours}:${min} AM`;
      }
    }
    console.log(time, 'time with am or pm')
    let yesterdayDate = Number(date) - 1;
    this.setState({
      todayDate: month + '-' + date + '-' + year,
      yesterdayDate: month + '-' + yesterdayDate.toString() + '-' + year,
      time: time
    })

    this.createNotificationListeners();
  }
  componentWillMount() {
    const { senderData } = this.props.navigation.state.params;
    let chatArrayTemp = [];
    let dataFromLocalStorage;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        dataFromLocalStorage = JSON.parse(value);
        console.log('localStorage Data >>', dataFromLocalStorage);
        // this.setState({
        //   deviceToken: dataFromLocalStorage.deviceToken,
        //   userToken: dataFromLocalStorage.token
        // })
        db.ref('chatRoom').on("value", snapshot => {
          let data = snapshot.val()
          for (let i in data) {
            let firbaseData = data[i];
            if (firbaseData.reciverId == dataFromLocalStorage._id && firbaseData.senderId == senderData.userId) {
              chatArrayTemp.push(firbaseData);
            }
            if (firbaseData.senderId == dataFromLocalStorage._id && firbaseData.reciverId == senderData.userId) {
              chatArrayTemp.push(firbaseData);
            }
          }
          this.setState({
            userId: dataFromLocalStorage._id,
            deviceToken: dataFromLocalStorage.deviceToken,
            userToken: dataFromLocalStorage.token,
            chatMessages: chatArrayTemp,
            opponentId: senderData.userId,
            opponnetAvatarSource: senderData.image,
            name: senderData.name,
          })
          chatArrayTemp = [];
        });
      }
    });
    this.getWeekReportData()
  }

  componentWillUnmount() {
    //this.notificationListener();
    this.notificationOpenedListener();
  }


  uplaodDataOnFirebase = (userMessage, type) => {
    const { senderData } = this.props.navigation.state.params;

    const { todayDate, time, deviceToken, userToken } = this.state;

    //const { todayDate, time } = this.state;

    let mgs = {}
    let data;
    let key = 'AAAAOul6SiM:APA91bG9tHwis-DD10R65-mTAHVfungDvlr57tZicYctREGqmRd04mJXS4OP0_tSpsxg9jlfOhLh_WmnxPWJGIiMOA46yj6zNB77nfUGV1e0oRJeDppAtbJBXV3y0N1_v_K-oL2QZ4Ai';
    let toSend = deviceToken;
    //console.log('key token >',userToken , 'device token >', toSend)
    // //token

    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        data = JSON.parse(value);
        if (data.assignTrainner != undefined && data.trainnerId != undefined) {
          mgs.message = userMessage;
          mgs.assignTrainner = data.assignTrainner;
          mgs.reciverId = data.trainnerId;
          mgs.name = data.name;
          mgs.senderId = data._id;
          mgs.date = todayDate;
          mgs.time = time;
          mgs.type = type;
          //Add firebase push notification
          let body = {
            to: deviceToken,
            data: {
              custom_notification: {
                title: "New Message",
                body: userMessage,
              }
            },
          };
          fetch('https://fcm.googleapis.com/fcm/send', {
            'method': 'POST',
            'headers': {
              'Authorization': 'key=' + key,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify(body)
          }).then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.error(error);
          });

          db.ref(`chatRoom/`).push(mgs);
        }
        else if (data.assignTrainny != undefined && data.tainnyId != undefined) {
          mgs.message = userMessage;
          mgs.assignTrainny = senderData.name;
          mgs.reciverId = senderData.userId;
          mgs.name = data.name;
          mgs.senderId = data._id;
          mgs.date = todayDate;
          mgs.time = time;
          mgs.type = type;
          //Add firebase push notification
          let body = {
            to: deviceToken,
            data: {
              custom_notification: {
                title: "New Message",
                body: userMessage,
              }
            },
          };
          fetch('https://fcm.googleapis.com/fcm/send', {
            'method': 'POST',
            'headers': {
              'Authorization': 'key=' + key,
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify(body)
          }).then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.error(error);
          });

          db.ref(`chatRoom/`).push(mgs);
        }
      }
    });
  }
  sendMessage = async () => {
    const { textMessage } = this.state;
    let type = 'text';
    //message send on firebase
    this.uplaodDataOnFirebase(textMessage, type, 'text')
    this.setState({
      textMessage: '',
      messagContainer: true,
    })
  }


  choosePhotoFunc = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    }
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        //console.log('User cancelled image picker');
      }
      else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let timestamp = (Date.now() / 1000 | 0).toString();
        let api_key = '878178936665133'
        let api_secret = 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
        let cloud = 'dxk0bmtei'
        let hash_string = 'timestamp=' + timestamp + api_secret
        let signature = CryptoJS.SHA1(hash_string).toString();
        let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/upload'
        let xhr = new XMLHttpRequest();
        xhr.open('POST', upload_url);
        xhr.onload = () => {
          let uploadData = JSON.parse(xhr._response)
          this.uplaodDataOnFirebase(uploadData, 'image')
        };
        let formdata = new FormData();
        formdata.append('file', { uri: response.uri, type: response.type, name: response.fileName });
        formdata.append('timestamp', timestamp);
        formdata.append('api_key', api_key);
        formdata.append('signature', signature);
        xhr.send(formdata);
        // You can also display the image using data:
        this.setState({
          attachOrange: true,
          shareFiles: true
        });
      }
    })
  }

  fileUpload = async (e) => {
    const options = {
      noData: true,
      mediaType: 'file'
    }
    FilePickerManager.showFilePicker(options, async (response) => {
      if (response.didCancel) {
        //console.log('User cancelled file picker');
      }
      else if (response.error) {
        //console.log('FilePickerManager Error: ', response.error);
      }
      else {
        this.setState({
          isLoading: true,
          fileUpLoading: true
        })
        let timestamp = (Date.now() / 1000 | 0).toString();
        let api_key = '878178936665133'
        let api_secret = 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
        let cloud = 'dxk0bmtei'
        let hash_string = 'timestamp=' + timestamp + api_secret
        let signature = CryptoJS.SHA1(hash_string).toString();
        let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/upload'
        let xhr = new XMLHttpRequest();
        xhr.open('POST', upload_url);
        xhr.onload = () => {
          let type = response.path.substring(response.path.lastIndexOf(".") + 1);
          let uploadData = JSON.parse(xhr._response)
          this.uplaodDataOnFirebase(uploadData, type)
          if (uploadData) {
            this.setState({
              isLoading: false,
              fileUpLoading: false
            })
          }
        };
        let formdata = new FormData();
        formdata.append('file', { uri: response.uri, type: response.type, name: response.fileName });
        formdata.append('timestamp', timestamp);
        formdata.append('api_key', api_key);
        formdata.append('signature', signature);
        xhr.send(formdata);
      }
    });
  }

  weeklyReport = () => {
    const { weekAgoDateDataWeights, currentDateDataWeights, loseWeight, lastWeek, cureentWeek, gainWeight } = this.state;
    let weight = {
      weekAgoDateDataWeights: weekAgoDateDataWeights,
      currentDateDataWeights: currentDateDataWeights,
      loseWeight: loseWeight,
      lastWeek: lastWeek,
      cureentWeek: cureentWeek,
      gainWeight: gainWeight
    }
    let obj = {
      weekExcercise: this.state.weekExcercise,
      weight: weight
    }
    this.uplaodDataOnFirebase(obj, 'weeklyReport')
  }

  expandImg = (e) => {
    this.setState({
      expand: true,
      isVisibleModal: true,
      imagePath: e
    })
  }
  backToPage = () => {
    this.setState({
      expand: false,
      isVisibleModal: false
    })
  }



  fileOpner(e, type) {
    const FilePath = e; // path of the file
    Linking.openURL(
      FilePath
    ).then((msg) => {
      console.log(msg, 'success!!')
    }, (err) => {
      console.log(err, 'error!!')
    });

  }
  changeIcon = () => {
    this.setState({
      sendIcon: true,
      micIcon: false
    })
  }

  grayIconAttachFielFunc = () => {
    this.setState({
      attachGray: false,
      attachOrange: true,
      shareFiles: true
    })
  }
  orangeIconAttachFielFunc = () => {
    this.setState({
      attachGray: true,
      attachOrange: false,
      shareFiles: false
    })
  }
  checkProfile = () => {
    const { senderData } = this.props.navigation.state.params;
    this.props.navigation.navigate('Profile', {
      opponentProfile: true,
      senderData: senderData
    })
  }

  //get data from database
  getWeekReportData = async () => {
    const { monthName } = this.state;
    //create varibale for useage
    let dataExcersiceArr = [];
    let userId;
    let weekBefore;
    let cureentWeekData;
    let loseWeight;
    let userType;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        let dataFromLocalStorage = JSON.parse(value);
        userId = dataFromLocalStorage._id;
      }
    });
    //getting api complete data excersice or weight mearsment
    let dataExcersice = await HttpUtils.get('getallexerciselog');
    let data = dataExcersice.content;
    let dataWeight = await HttpUtils.get('getweightlog');
    let weightData = dataWeight.content;
    //gettibg curent date
    const currentDayOfWeek = new Date().getDay() + 1;
    const currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    if (currentMonth == 1 || currentMonth == 2 || currentMonth == 3 || currentMonth == 4 || currentMonth == 5 ||
      currentMonth == 6 || currentMonth == 7 || currentMonth == 8 || currentMonth == 9) {
      currentMonth = `0${currentMonth}`
    }
    //getting weekly excersices 
    if (data) {
      for (var i in data) {
        let dataApi = data[i];
        if (dataApi.userId == userId) {
          //get month name
          // console.log(dataApi.month.slice(1))
          let getMonthNo = dataApi.month;
          let getMontName = monthName[getMonthNo];
          dataApi.monthName = getMontName;
          //check week of the month
          let checkDate = Number(dataApi.dayOfMonth) - currentDate;
          let checkMonth = Number(dataApi.month) - currentMonth;
          let checkYear = Number(dataApi.year) - currentYear;
          if (checkDate == 0 || checkDate == -1 || checkDate == -2 || checkDate == -3 || checkDate == -4 || checkDate == -5 ||
            checkDate == -6 || checkDate == -7 && checkMonth == 0 && checkYear == 0) {
            dataExcersiceArr = [...dataExcersiceArr, dataApi];
            this.setState({
              weekExcercise: dataExcersiceArr
            })
          }
        }
      }
    }
    // //get week wise data and show bar chart line 
    for (var i in weightData) {
      let dataApi = weightData[i];
      if (dataApi.userId == userId) {
        //check week of the month
        let checkWeekDay = (Math.abs(currentDayOfWeek - dataApi.dayOfWeek));
        let checkDate = Number(dataApi.dayOfMonth) - currentDate;
        let checkMonth = Number(dataApi.month) - currentMonth;
        let checkYear = Number(dataApi.year) - currentYear;
        //condition check week ago data
        if (checkWeekDay == 0 && checkDate != 0 && checkMonth == 0 && checkYear == 0) {
          weekBefore = dataApi
          this.setState({
            weekAgoDateDataWeights: weekBefore
          })
        }
        //if data not has week ago then check a last week any day data
        if (checkWeekDay != 0 && checkMonth == 0 && checkYear == 0) {
          if (checkWeekDay == 1 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          }
          else if (checkWeekDay == 2 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          }
          else if (checkWeekDay == 3 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          }
          else if (checkWeekDay == 4 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          } else if (checkWeekDay == 5 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          } else if (checkWeekDay == 6 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          } else if (checkWeekDay == 7 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          }
        }
        //current date data
        if (checkDate == 0 && checkMonth == 0 && checkYear == 0) {
          cureentWeekData = dataApi
          this.setState({
            currentDateDataWeights: cureentWeekData
          })
        }
      }
    }

    // availbe current date and week ago ago data then get lose or gain wieght
    if (cureentWeekData != undefined && weekBefore != undefined) {
      let weekAgoWieght = weekBefore.weight.substring(0, weekBefore.weight.length - 2);
      let currentWeekWieght = cureentWeekData.weight.substring(0, cureentWeekData.weight.length - 2);
      loseWeight = weekAgoWieght - currentWeekWieght;
    }
    //lose weight
    if (loseWeight > 0) {
      this.setState({
        loseWeight: loseWeight,
        lastWeek: 6,
        cureentWeek: 5
      })
    }
    //gain weight
    else if (loseWeight < 0) {
      let gainWeight = Math.abs(loseWeight);
      this.setState({
        lastWeek: 5,
        cureentWeek: 6,
        gainWeight: gainWeight
      })
    }
    //not gain or lose weight
    else if (loseWeight == 0) {
      this.setState({
        loseWeight: loseWeight,
        lastWeek: 6,
        cureentWeek: 6
      })
    }
    //not availeble today data
    else if (cureentWeekData == undefined) {
      this.setState({
        loseWeight: 0,
        lastWeek: 6,
        cureentWeek: 0
      })
    }
    // weekAgoDateDataWeights, currentDateDataWeights, loseWeight, lastWeek, cureentWeek, gainWeight
    if (weekBefore && this.state.weekAgoDateDataWeights && (this.state.loseWeight > 0 || this.state.cureentWeek > 0
      || this.state.gainWeight != '')) {
      this.setState({
        showReport: true
      })
    }
    else {
      this.setState({
        showReport: false
      })
    }
  }

  //Push Notification Methods here 

  createNotificationListeners = async () => {
    console.log('Create Notification Listeners run ')
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    // this.notificationListener = firebasePushNotification.notifications().onNotification((notification) => {
    //   const { title, body } = notification;
    //   this.showAlert(title, body);
    // });

    /*
* If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
* */
    this.notificationOpenedListener = firebasePushNotification.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      // this.showAlert(title, body);
      console.log('title >>', title, 'body >>', body)
    });

    /*
      * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
      * */
    const notificationOpen = await firebasePushNotification.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log('title >>', title, 'body >>', body)

      // this.showAlert(title, body);
    }

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebasePushNotification.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  // showAlert(title, body) {
  //   Alert.alert(
  //     title, body,
  //     [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ],
  //     { cancelable: false },
  //   );
  // }

  // showAlert(title, body) {
  //   Alert.alert(
  //     title, body,
  //     [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ],
  //     { cancelable: false },
  //   );
  // }


  render() {
    const { textMessage, sendIcon, sendBtnContainer, recodringBody, attachGray, attachOrange, shareFiles,
      expand, userId, opponentId, opponnetAvatarSource, name, imagePath, monthName, yesterdayDate, todayDate } = this.state;
    let dateNum;
    let month;
    let year;
    let showDate;
    // console.log('image path >>', imagePath)

    const chatMessages = this.state.chatMessages.map((message, key) => {
      if (dateNum == undefined) {
        if (Number(message.date.slice(3, 5)) == Number(todayDate.slice(3, 5)) && Number(message.date.slice(0, 2)) == Number(todayDate.slice(0, 2))
          && Number(message.date.slice(6)) == Number(todayDate.slice(6))) {
          showDate = "Today";
        }
        else {
          showDate = `${Number(message.date.slice(3, 5))}-${monthName[Number(message.date.slice(0, 2))]}-${Number(message.date.slice(6))}`
        }
      }
      else {
        if (dateNum == Number(message.date.slice(3, 5)) && month == Number(message.date.slice(0, 2))
          && year == Number(message.date.slice(6))) {
          showDate = ''
        }
        else {
          if (Number(message.date.slice(3, 5)) == Number(todayDate.slice(3, 5)) && Number(message.date.slice(0, 2)) == Number(todayDate.slice(0, 2))
            && Number(message.date.slice(6)) == Number(todayDate.slice(6))) {
            showDate = "Today";
          }
          else if (Number(message.date.slice(3, 5)) == Number(yesterdayDate.slice(3, 5)) && Number(message.date.slice(0, 2)) == Number(yesterdayDate.slice(0, 2))
            && Number(message.date.slice(6)) == Number(yesterdayDate.slice(6))) {
            showDate = "Yesterday";
          }
          else {
            showDate = `${Number(message.date.slice(3, 5))}-${monthName[Number(message.date.slice(0, 2))]}-${Number(message.date.slice(6))}`
          }
        }
      }
      dateNum = Number(message.date.slice(3, 5));
      month = Number(message.date.slice(0, 2));
      year = Number(message.date.slice(6));

      return (
        <View>
          {showDate != '' ?
            <View style={styles.dateView}>
              <Text style={styles.dateTxt}>{showDate}</Text>
            </View>
            : null
          }
          {message.senderId == userId && message.type == 'text' ?
            <View style={styles.messagesContainer}>
              <Text key={key} style={styles.msgsTextStyle}>
                {message.message}
              </Text>
              <Text style={styles.timeText}>{message.time}</Text>
            </View>
            :
            message.senderId == userId && message.type == 'image' ?
              <TouchableOpacity activeOpacity={0.5}
                style={styles.showPhotoContainer}
                onPress={this.expandImg.bind(this, message.message.secure_url)}
              >
                <Image key={key} style={styles.mgsImges} source={{
                  uri: `${message.message.secure_url}`
                }} />
                <Text style={styles.timeText}>{message.time}</Text>
              </TouchableOpacity>
              :
              message.senderId == userId && message.type == 'pdf' ?
                <View>
                  <TouchableOpacity activeOpacity={0.5}
                    style={styles.mgsTouctable}
                    onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                  >
                    <View>
                      <View style={styles.fileTagStyle}>
                        <View style={styles.extensionFile}>
                          <Image style={styles.thumbnailImageStyle} source={require('../icons/pdf.png')} />
                        </View>
                        <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                      </View>
                      {/* <View style={{ backgroundColor: 'black' }}> */}
                      {/* </View> */}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.timeText}>{message.time}</Text>
                </View>
                :
                message.senderId == userId && message.type == 'txt' ?
                  <View>
                    <TouchableOpacity activeOpacity={0.5}
                      style={styles.mgsTouctable}
                      onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                    >
                      <View style={styles.fileTagStyle}>
                        <View style={styles.extensionFile}>
                          <Image style={styles.thumbnailImageStyle} source={require('../icons/txt.png')} />
                        </View>
                        <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                      </View>

                    </TouchableOpacity>
                    <Text style={styles.timeTextReply}>{message.time}</Text>
                  </View>
                  :
                  message.senderId == userId && message.type == 'docx' ?
                    <View>
                      <TouchableOpacity activeOpacity={0.5}
                        style={styles.mgsTouctable}
                        onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                      >
                        <View style={styles.fileTagStyle}>
                          <View style={styles.extensionFile}>
                            <Image style={styles.thumbnailImageStyle} source={require('../icons/docx.png')} />
                          </View>
                          <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                        </View>
                        <Text style={styles.timeText}>{message.time}</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    message.senderId == userId && message.type == 'doc' ?
                      <View>
                        <TouchableOpacity activeOpacity={0.5}
                          style={styles.mgsTouctable}
                          onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                        >
                          <View style={styles.fileTagStyle}>
                            <View style={styles.extensionFile}>
                              <Image style={styles.thumbnailImageStyle} source={require('../icons/doc.png')} />
                            </View>
                            <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                          </View>
                          <Text style={styles.timeText}>{message.time}</Text>
                        </TouchableOpacity>
                      </View>
                      :
                      message.senderId == userId && message.type == 'pptx' ?
                        <View>
                          <TouchableOpacity activeOpacity={0.5}
                            style={styles.mgsTouctable}
                            onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                          >
                            <View style={styles.fileTagStyle}>
                              <View style={styles.extensionFile}>
                                <Image style={styles.thumbnailImageStyle} source={require('../icons/ppt.png')} />
                              </View>
                              <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                            </View>
                            <Text style={styles.timeText}>{message.time}</Text>
                          </TouchableOpacity>
                        </View>
                        :
                        message.senderId == userId && message.type == 'mp3' ||
                          message.senderId == userId && message.type == 'wma' ?
                          <View>
                            <TouchableOpacity activeOpacity={0.5}
                              style={styles.mgsTouctable}
                              onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                            >
                              <View style={styles.fileTagStyle}>
                                <View style={styles.extensionFile}>
                                  <Image style={styles.thumbnailImageStyle} source={require('../icons/audio.png')} />
                                </View>
                                <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                              </View>
                            </TouchableOpacity>
                            <Text style={styles.timeText}>{message.time}</Text>
                          </View>
                          :
                          message.senderId == userId &&
                            message.type == 'mp4'
                            ?
                            <View style={styles.videoTagMgs}>
                              <VideoPlayer
                                //videoWidth={300}
                                //videoHeight={this.state.video.height}
                                duration={message.message.duration}
                                video={{ uri: `${message.message.secure_url}` }}
                                ref={r => this.player = r}
                                style={styles.backgroundVideo}
                              />
                              <Text style={styles.timeText}>{message.time}</Text>
                            </View>
                            :
                            message.senderId == userId && message.type == 'weeklyReport'
                              ?
                              <View style={styles.cardRight}>
                                <View style={styles.totalExerciseContainer}>
                                  <Text style={styles.totalExercisHeading}>Total exercise{'\n'}done</Text>
                                  {
                                    message.message.weekExcercise.map((elem, key) => {
                                      return (
                                        <View style={styles.exerciseResultCard}>
                                          <Text style={styles.resultHeading}>
                                            {elem.exerciseName}
                                          </Text>
                                          <View style={styles.dataResultParent}>
                                            <View style={styles.timeShowContainer}>
                                              <Text style={styles.timeShow}>
                                                {`${elem.exerciseAmount} ${elem.exerciseUnit}`}
                                              </Text>
                                            </View>
                                            <View style={styles.dateAndMonth}>
                                              <Text maxLength={3} style={styles.dateAndMonthShow}>
                                                {elem.monthName}
                                              </Text>
                                              <Text style={styles.dateNumber}>
                                                {elem.dayOfMonth}
                                              </Text>
                                              <Text style={styles.superScriptTextStyle}>
                                                {elem.dayOfMonth == 1 ? 'st' : elem.dayOfMonth == 2 ? '2nd' : elem.dayOfMonth == 3 ? 'rd' : 'th'}
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                      )
                                    })
                                  }
                                </View>
                                <View style={styles.weightStatus}>
                                  <Text style={styles.headingText}>Weight{'\n'}status</Text>
                                  <View style={styles.statusGraphContainer}>
                                    <View style={styles.midBox}>
                                      <ChartScreen lastWeek={message.message.weight.lastWeek} cureentWeek={message.message.weight.cureentWeek} />
                                    </View>
                                    <View style={styles.borderLines1}>
                                      <Text style={styles.kgTextOne}>
                                        {message.message.weight.currentDateDataWeights.weight}
                                      </Text>
                                      <Text style={styles.kgTextTwo}>
                                        {message.message.weight.weekAgoDateDataWeights.weight}
                                      </Text>
                                    </View>
                                    <View style={styles.weeksTextContainer}>
                                      <Text style={styles.thisWeek}>This week</Text>
                                      <Text style={styles.lastWeek}>Last week</Text>
                                    </View>
                                    {message.message.weight.loseWeight || message.message.weight.loseWeight == 0
                                      || message.message.weight.loseWeight != undefined ?
                                      <View>
                                        <Text style={styles.lostKg}>{`${message.message.weight.loseWeight} KG`} </Text>
                                        <Text style={styles.lostText}>Lost</Text>
                                      </View>
                                      :
                                      <View>
                                        <Text style={styles.lostKg}>{`${message.message.weight.gainWeight} KG`} </Text>
                                        <Text style={styles.lostText}>Gain</Text>
                                      </View>
                                    }
                                  </View>
                                </View>
                                <Text style={styles.timeText}>{message.time}</Text>
                              </View>
                              : null
          }


          {message.senderId == opponentId && message.type == 'text' ?
            <View style={styles.replyMessageContainer}>
              <Text key={key} style={styles.replyMessagesStyle}>
                {message.message}
              </Text>
              <Text style={styles.timeTextReply}>{message.time}</Text>
            </View>
            :
            message.senderId == opponentId && message.type == 'image' ?
              <TouchableOpacity activeOpacity={0.5}
                style={styles.replyshowPhotoContainer}
                onPress={this.expandImg.bind(this, message.message.secure_url)}
              >
                <Image key={key} style={styles.replymgsImges} source={{
                  uri: `${message.message.secure_url}`
                }} />
                <Text style={styles.timeTextReply}>{message.time}</Text>
              </TouchableOpacity>
              :
              message.senderId == opponentId && message.type == 'pdf' ?
                <View>
                  <TouchableOpacity activeOpacity={0.5}
                    style={styles.replymgsTouctable}
                    onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                  >
                    <View style={styles.replyfileTagStyle}>
                      <View style={styles.replyextensionFile}>
                        <Image style={styles.replythumbnailImageStyle} source={require('../icons/pdf.png')} />
                      </View>
                      <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                    </View>
                    <Text style={styles.timeTextReply}>{message.time}</Text>
                  </TouchableOpacity>
                </View>
                :
                message.senderId == opponentId && message.type == 'txt' ?
                  <View>
                    <TouchableOpacity activeOpacity={0.5}
                      style={styles.replymgsTouctable}
                      onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                    >
                      <View style={styles.replyfileTagStyle}>
                        <View style={styles.replyextensionFile}>
                          <Image style={styles.replythumbnailImageStyle} source={require('../icons/txt.png')} />
                        </View>
                        <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.timeTextReply}>{message.time}</Text>
                  </View>
                  :
                  message.senderId == opponentId && message.type == 'docx' ?
                    <View>
                      <TouchableOpacity activeOpacity={0.5}
                        style={styles.replymgsTouctable}
                        onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                      >
                        <View style={styles.replyfileTagStyle}>
                          <View style={styles.replyextensionFile}>
                            <Image style={styles.replythumbnailImageStyle} source={require('../icons/docx.png')} />
                          </View>
                          <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                        </View>
                        <Text style={styles.timeTextReply}>{message.time}</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    message.senderId == opponentId && message.type == 'doc' ?
                      <View>
                        <TouchableOpacity activeOpacity={0.5}
                          style={styles.replymgsTouctable}
                          onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                        >
                          <View style={styles.replyfileTagStyle}>
                            <View style={styles.replyextensionFile}>
                              <Image style={styles.replythumbnailImageStyle} source={require('../icons/doc.png')} />
                            </View>
                            <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                          </View>
                          <Text style={styles.timeTextReply}>{message.time}</Text>
                        </TouchableOpacity>
                      </View>
                      :
                      message.senderId == opponentId && message.type == 'pptx' ?
                        <View>
                          <TouchableOpacity activeOpacity={0.5}
                            style={styles.replymgsTouctable}
                            onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                          >
                            <View style={styles.replyfileTagStyle}>
                              <View style={styles.replyextensionFile}>
                                <Image style={styles.replythumbnailImageStyle} source={require('../icons/ppt.png')} />
                              </View>
                              <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                            </View>
                            <Text style={styles.timeTextReply}>{message.time}</Text>
                          </TouchableOpacity>
                        </View>
                        :
                        message.senderId == opponentId && message.type == 'mp3' ||
                          message.senderId == opponentId && message.type == 'wma' ?
                          <View>
                            <TouchableOpacity activeOpacity={0.5}
                              style={styles.replymgsTouctable}
                              onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                            >
                              <View style={styles.replyfileTagStyle}>
                                <View style={styles.replyextensionFile}>
                                  <Image style={styles.replythumbnailImageStyle} source={require('../icons/audio.png')} />
                                </View>
                                <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                              </View>
                            </TouchableOpacity>
                            <Text style={styles.timeTextReply}>{message.time}</Text>
                          </View>
                          :
                          message.senderId == opponentId &&
                            message.type == 'mp4'
                            ?
                            <View style={styles.replyvideoTagMgs}>
                              <VideoPlayer
                                // videoWidth={this.state.video.width}
                                // videoHeight={this.state.video.height}
                                duration={message.message.duration}
                                video={{ uri: `${message.message.secure_url}` }}
                                ref={r => this.player = r}
                                style={styles.backgroundVideo}
                              // fullScreen={true}
                              />
                              <Text style={styles.timeTextReply}>{message.time}</Text>
                            </View>
                            :
                            message.senderId == opponentId && message.type == 'weeklyReport'
                              ?
                              <View style={styles.replycardRight}>
                                <View style={styles.replytotalExerciseContainer}>
                                  <Text style={styles.replytotalExercisHeading}>Total exercise{'\n'}done</Text>
                                  {
                                    message.message.weekExcercise.map((elem, key) => {
                                      return (
                                        <View style={styles.replyexerciseResultCard}>
                                          <Text style={styles.replyresultHeading}>
                                            {elem.exerciseName}
                                          </Text>
                                          <View style={styles.replydataResultParent}>
                                            <View style={styles.replytimeShowContainer}>
                                              <Text style={styles.replytimeShow}>
                                                {`${elem.exerciseAmount} ${elem.exerciseUnit}`}
                                              </Text>
                                            </View>
                                            <View style={styles.replydateAndMonth}>
                                              <Text maxLength={3} style={styles.replydateAndMonthShow}>
                                                {elem.monthName}
                                              </Text>
                                              <Text style={styles.replydateNumber}>
                                                {elem.dayOfMonth}
                                              </Text>
                                              <Text style={styles.replysuperScriptTextStyle}>
                                                {elem.dayOfMonth == 1 ? 'st' : elem.dayOfMonth == 2 ? '2nd' : elem.dayOfMonth == 3 ? 'rd' : 'th'}
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                      )
                                    })
                                  }
                                </View>
                                <View style={styles.replyweightStatus}>
                                  <Text style={styles.replyheadingText}>Weight{'\n'}status</Text>
                                  <View style={styles.replystatusGraphContainer}>
                                    <View style={styles.replymidBox}>
                                      <ChartScreen lastWeek={message.message.weight.lastWeek} cureentWeek={message.message.weight.cureentWeek} />
                                    </View>
                                    <View style={styles.replyborderLines1}>
                                      <Text style={styles.replykgTextOne}>
                                        {message.message.weight.currentDateDataWeights.weight}
                                      </Text>
                                      <Text style={styles.replykgTextTwo}>
                                        {message.message.weight.weekAgoDateDataWeights.weight}
                                      </Text>
                                    </View>
                                    <View style={styles.replyweeksTextContainer}>
                                      <Text style={styles.replythisWeek}>This week</Text>
                                      <Text style={styles.replylastWeek}>Last week</Text>
                                    </View>
                                    {message.message.weight.loseWeight || message.message.weight.loseWeight == 0
                                      || message.message.weight.loseWeight != undefined ?
                                      <View>
                                        <Text style={styles.replylostKg}>{`${message.message.weight.loseWeight} KG`} </Text>
                                        <Text style={styles.replylostText}>Lost</Text>
                                      </View>
                                      :
                                      <View>
                                        <Text style={styles.replylostKg}>{`${message.message.weight.gainWeight} KG`} </Text>
                                        <Text style={styles.replylostText}>Gain</Text>
                                      </View>
                                    }
                                  </View>
                                </View>
                                <Text style={styles.timeTextReply}>{message.time}</Text>
                              </View >
                              : null
          }
        </View>)
    })
    console.log(chatMessages, 'chatMessages')
    return (
      <View style={styles.mainContainer}>
        <View style={styles.childMainContainer}>
          {opponnetAvatarSource != undefined ?
            <View style={styles.chatProfileContainer}>
              <Text style={styles.profileNameStyle}>{name}</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Profile')}>
                <Image source={{ uri: `${opponnetAvatarSource}` }} style={styles.profilPicStyle} />
              </TouchableOpacity>
            </View>
            :
            <View style={styles.chatProfileContainerChatScr}>
              <Text style={styles.profileNameStyleChat}>{name}</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={this.checkProfile}>
                <Image source={require('../icons/profile.png')} style={styles.profilPicStyle} />
              </TouchableOpacity>
            </View>
          }
          <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}>
            <View style={styles.container}>
              {recodringBody && <View style={styles.recordingContainer}>
              </View>}
              {/* {chatMessages} */}


              {/* Sender and Reciever styling Starts From Here */}
              <View style={styles.messagesContainer}>
                <Text style={styles.msgsTextStyle}>
                  aur bhai kaisa h tu?
              </Text>
              </View>
              <Text style={styles.timeText}> 10:34</Text>

              <View style={styles.replyMessageContainer}>
                <Text style={styles.replyMessagesStyle}>
                  Main theek tum Btao kia horaha h ?
              </Text>
              </View>
              <Text style={styles.timeTextReply}>10:35</Text>

              <View>
                <TouchableOpacity activeOpacity={0.5}
                  style={styles.mgsTouctable}>
                  {/* onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)} */}

                  <View>
                    <View style={styles.fileTagStyle}>
                      <View style={styles.extensionFile}>
                        <Image style={styles.thumbnailImageStyle} source={require('../icons/pdf.png')} />
                      </View>
                      <Text style={styles.thumbnailNameTextStyle}>yeh lo fileasdasd asda s asa asdas d</Text>
                    </View>
                    {/* <View style={{ backgroundColor: 'black' }}> */}
                    {/* </View> */}
                  </View>

                </TouchableOpacity>
              </View>

              <Text style={styles.timeText}>10:40</Text>

              <View>
                <TouchableOpacity activeOpacity={0.5}
                  style={styles.replymgsTouctable}
                // onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                >
                  <View style={styles.replyfileTagStyle}>
                    <View style={styles.replyextensionFile}>
                      <Image style={styles.replythumbnailImageStyle} source={require('../icons/pdf.png')} />
                    </View>
                    <Text style={styles.replythumbnailNameTextStyle}>yeh lo meri treaf s bhi lo tm asds sda</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.timeTextReply}>10:41</Text>


              {expand ?
                <Modal
                  isVisible={this.state.isVisibleModal}
                  animationIn='bounce'
                  backdropOpacity={0.7}
                  backdropColor='white'
                  coverScreen={true}
                  animationInTiming={800}
                  animationOutTiming={500}
                  onBackdropPress={() => this.setState({ isVisibleModal: false })}
                >
                  <View style={styles.cardContainer}>
                    {/* <View style={styles.dateWithCancelIcon}>
                      <TouchableOpacity onPress={this.backToPage} activeOpacity={0.6}>
                        <Image source={require('../icons/cancel.png')} />
                      </TouchableOpacity>
                    </View> */}
                    <View style={{ width: '100%' }}>
                      <Image
                        style={styles.expandImges} source={{
                          uri: `${imagePath}`
                        }}
                        resizeMode='contain'
                      />
                    </View>

                  </View>
                </Modal>
                : null
              }
              {shareFiles && <View style={styles.sendFielsTypeContainer}>
                <Text style={styles.shareTextStyle}>Share...</Text>
                <View style={styles.filesContainer}>
                  <TouchableOpacity onPress={this.choosePhotoFunc}>
                    <Image source={require('../icons/attach-photo.png')}
                      style={styles.attachFilesStyle}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.fileUpload}>
                    <Image source={require('../icons/attach-file.png')}
                      style={styles.attachFilesStyle}
                    />
                  </TouchableOpacity>
                  {
                    this.state.showReport ?
                      <TouchableOpacity onPress={this.weeklyReport}>
                        <Image source={require('../icons/attach-report.png')}
                          style={styles.attachFilesStyle}
                        />
                      </TouchableOpacity>
                      :
                      null
                  }

                </View>
              </View>}
            </View>
          </ScrollView>

          {this.state.isLoading == true ?
            <View style={styles.spinnerContainer}>
              <Spinner
                //visibility of Overlay Loading Spinner
                visible={this.state.fileUpLoading}
                //Text with the Spinner 
                textContent={'File Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
                color={'#FF6200'}

              />
            </View>
            : null
          }

          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={(textMessage) => { this.setState({ textMessage }) }}
              autoCorrect={false}
              placeholder="Type message here..."
              //onKeyPress={() => { this.changeIcon() }}
              value={textMessage}
              style={styles.inputStyle}
            />
            <View style={styles.fileAttachContainer}>
              {attachGray && <TouchableOpacity
                onPress={this.grayIconAttachFielFunc}>
                <Image source={require('../icons/attach-gray.png')}
                  style={styles.attachFileIcon}
                />
              </TouchableOpacity>}
              {attachOrange && <TouchableOpacity
                onPress={this.orangeIconAttachFielFunc}
                style={styles.orangeAttachFiel}>
                <Image source={require('../icons/attach-orange.png')}
                  style={styles.attachFileIcon}
                />
              </TouchableOpacity>}
            </View>
            {textMessage == '' ? <View style={styles.sentBtnDisableStyle}>

              <TouchableOpacity disabled={true}>
                <Image source={require('../icons/send-btn.png')} style={styles.sendIconStyle} />
              </TouchableOpacity>
            </View>
              :
              <View style={styles.sentBtnContainer}>
                <TouchableOpacity onPress={this.sendMessage}>
                  <Image source={require('../icons/send-btn.png')} style={styles.sendIconStyle} />
                </TouchableOpacity>
              </View>
            }

            {/* {micIcon && <TouchableOpacity onPress={this.toggelMic}>
                <Image source={require('../icons/mic.png')} style={styles.micIconStyle} />
              </TouchableOpacity>}
            </View>}
            {orangeMicContainer && <View style={styles.orangeMicContainer}>
              {micOrange && <TouchableOpacity onPress={this.toggelMicOrange}>
                <Image source={require('../icons/mic-orange.png')} style={styles.micIconStyle} />
              </TouchableOpacity>} */}
            {/* When user does not assign trainer show this modal*/}



          </View>

        </View>
      </View>
    );
  }
}
export default Chatscreen;
