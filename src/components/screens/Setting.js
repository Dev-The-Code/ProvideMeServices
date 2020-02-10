import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import firebase from '../Config/Firebase'
import styles from '../Styling/SettingScreenStyle';
const db = firebase.database();

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    logout = () => {
        const { navigate } = this.props.navigation;
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let userData = JSON.parse(value);
                userData.status = 'Offline'

                // db.ref(`users/${userData._id}`).update(userData);
                
            }
        })
        firebase.auth().signOut().then(()=>{
            console.log('signout successfully')
          }).catch((error)=>{
            console.log('signout error >>>', error)
          });
        AsyncStorage.clear();
        navigate('Login')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.childContainer}>
                    <View style={styles.settingHaider}>
                        <Text style={styles.settingTextStyle}>Setting</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.items} onPress={() => { navigate('ResetpasswordScreen') }}>
                            <Text style={styles.forText}>Reset Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.items}
                            onPress={this.logout}
                        >
                            <Text style={styles.forText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

