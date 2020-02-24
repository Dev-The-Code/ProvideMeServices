import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import styles from '../Styling/ChatScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import HttpUtils from '../Services/HttpUtils';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox, PermissionsAndroid } from 'react-native';
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
import firebase from '../Config/Firebase';
import 'firebase/firestore';
const db = firebase.database();

let userNamesData = [];
class ChatInbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageUser: [{
                _id: 'asdfgga',
                code: 'ru3uioioa',
                deviceToken: 'aaassddffaqqwq',
                email: 'sheerazkhan193@gmail.com',
                lastName: 'Khan',
                mobileNo: '03418197966',
                name: 'Muhammad Sheeraz',
                status: 'Online',
                token: 'asdacxcsdqqqwzzc',
            },

            {
                _id: 'asdfgga',
                code: 'ru3uioioa',
                deviceToken: 'aaassddffaqqwq',
                email: 'waqas23@gmail.com',
                lastName: 'Mumtaz',
                mobileNo: '03418197966',
                name: 'M.Arman Ullah Khan ',
                status: 'Online',
                token: 'asdacxcsdqqqwzzc',
            },
            ],
            forTrainnerModal: false,
            currentName: '',
            userEmail: '',
            userNumber: ''
        }
        // this.checkTrainy()
    }

    // async componentWillMount() {
    //     let userData;
    //     let userNamesData = []
    //     await AsyncStorage.getItem('opponentProfile').then((value) => {
    //         userData = JSON.parse(value);

    //     })
    //     console.log('opponent data chatbox >>>', userData)
    //     await db.ref('users').on("value", snapshot => {
    //         let data = snapshot.val();
    //         for (var i in userData) {
    //             for (var j in data) {
    //                 if (userData[i].userId == data[j]._id) {
    //                     userData[i].status = data[j].status
    //                     // if (userNamesData) {
    //                     //     userNamesData = []
    //                     // }
    //                     userNamesData.push(userData[i])
    //                     // console.log(userNamesData, 'data')
    //                 }
    //             }
    //         }
    //         this.setState({
    //             messageUser: userNamesData
    //         })
    //         userNamesData = [];
    //     });

    //     console.log(userNamesData, 'userNamesData')

    // }

    // componentWillUnmount() {
    //     // Remove the event listener
    //     this.focusListener.remove();
    // }
    // checkTrainy = () => {
    //     const { navigation } = this.props;
    //     this.focusListener = navigation.addListener('didFocus', () => {
    //         AsyncStorage.getItem('currentUser').then((value) => {
    //             let userData = JSON.parse(value)
    //             let userName = userData.name + ' ' + userData.lastName;
    //             if (userData.assignTrainner != undefined) {
    //                 this.setState({
    //                     forTrainnerModal: false
    //                 })
    //             }
    //             else if (userData.assignTrainny != undefined) {
    //                 this.setState({
    //                     forTrainnerModal: false
    //                 })
    //             }
    //             else {
    //                 this.setState({
    //                     forTrainnerModal: true,
    //                     currentName: userName,
    //                     userEmail: userData.email,
    //                     userNumber: userData.mobileNo
    //                 })
    //             }
    //         })
    //     });
    // }


    removeModal = () => {
        const { navigate } = this.props.navigation;
        this.setState({
            forTrainnerModal: false
        }, () => { navigate('Homescreen') })

    }


    sendOppentUserData(userData) {
        const { navigate } = this.props.navigation;
        navigate('ChatBox', {
            senderData: userData
        });
    }


    showPackage = () => {
        const { navigate } = this.props.navigation;
        this.setState({
            forTrainnerModal: false
        }, () => {
            navigate('PackagesScreen1', {
                currentName: this.state.currentName,
                userEmail: this.state.userEmail,
                userNumber: this.state.userNumber

            })
        })
    }



    render() {
        const { messageUser, forTrainnerModal, userEmail, currentName, userNumber } = this.state;
        console.log('user message >>>', messageUser)
        // console.log('email >', userEmail, 'name >', currentName, 'number', userNumber)
        const senderName = messageUser && messageUser.map((elem, key) => {
            // console.log(elem, 'elem')
            return (
                <View style={styles.nameMainContainer}>
                    <View style={styles.nameContainer}>
                        {elem.image != undefined ?
                            <Image source={{ uri: `${elem.image}` }} style={styles.profilPicInInboxStyle} />
                            :
                            <Image source={require('../icons/profile.png')} style={styles.profilPicInInboxStyle} />
                        }

                        <View style={{ marginBottom: 5 }}>
                            <TouchableOpacity style={styles.nameOpacity} onPress={this.sendOppentUserData.bind(this, elem)}>
                                <Text style={styles.name}>{elem.name}</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.msgTxt} st> Sent weekly report </Text>
                                <Text> 09:30 </Text>
                            </View>
                        </View>
                        {/* {elem.status == 'Online' ?
                        <View style={styles.userIconView}>
                            <Image source={require('../icons/iconfinder_Circle_Green_34211.png')} style={styles.userIcon} />
                        </View>
                        :
                        elem.status == 'Offline' ?
                            <View style={styles.userIconView}>
                                <Image source={require('../icons/iconfinder_Circle_Red_34214.png')} style={styles.userIcon} />
                            </View>
                            : null
                    } */}


                    </View>


                </View>
            )
        })
        return (
            <View style={styles.mainContainer}>
                <View style={styles.childMainContainer}>
                    <View style={styles.chatProfileContainer}>
                        <Text style={styles.profileNameStyle}>Graveyard</Text>
                    </View>
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>
                        {senderName != '' && senderName}
                    </ScrollView>
                    <Modal
                        // isVisible={this.state.forTrainnerModal}
                        animationIn='zoomIn'
                        //animationOut='zoomOutDown'
                        backdropOpacity={0.8}
                        backdropColor='white'
                        coverScreen={true}
                        animationInTiming={500}
                        animationOutTiming={500}
                    >
                        <View style={styles.withOutTrainerModal}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                                <Text style={styles.textColor}>You dont have a trainer</Text>
                                <TouchableOpacity onPress={this.removeModal} activeOpacity={0.6}>
                                    <Image source={require('../icons/cancel.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.userInstruction}>
                                <Text style={styles.userInsTextStyle}>Get premium account to get a coach</Text>
                                <Text style={styles.userInsTextStyle}>Kindly contact </Text>
                                <Text style={styles.userInsTextStyle}>After trainner successfully assign to you than restart your login process  </Text>
                                <TouchableOpacity
                                    style={styles.sendReqContainer}
                                    activeOpacity={0.7}
                                    //onPress={this.sendRequestAdmin}
                                    onPress={this.showPackage}
                                >
                                    <Text style={styles.sendReqText}>Show Packages</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}
export default ChatInbox;
