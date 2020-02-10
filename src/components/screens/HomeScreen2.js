import React from 'react';
import styles from '../Styling/ChatScreenStyle';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Picker,
    Option,
} from 'react-native';
import Modal from "react-native-modal";
import HttpUtils from '../Services/HttpUtils';
const { heightDimension } = Dimensions.get('window').height;

class HomeScreen2 extends React.Component {


    constructor() {
        super()



    }

    removeModal = () => {
        const { navigate } = this.props.navigation;
        this.setState({
            forTrainnerModal: false
        }, () => { navigate('Homescreen') })

    }
    render() {

        return (
            <View style={styles.mainContainer}>
                <View style={styles.childMainContainer}>
                    <View style={styles.chatProfileContainer}>
                        <Text style={styles.profileNameStyle}>Inbox</Text>
                        <TouchableOpacity onPress={this.removeModal} activeOpacity={0.6}>
                            <Image source={require('../icons/cancel.png')} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>
                        {senderName != '' && senderName}
                    </ScrollView>
                    <Modal
                        isVisible={this.state.forTrainnerModal}
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

export default HomeScreen2;