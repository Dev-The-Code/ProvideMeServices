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
    FlatList,

} from 'react-native';
// import Toast, {DURATION} from 'react-native-easy-toast'
import styles from '../Styling/ShowMeasurementsStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';
import ToastComponent from '../Toasts/nativeToast';
import OverlayLoader from '../Loader/OverlaySpinner'
import HttpUtilsFile from '../Services/HttpUtils';
import LogMeasurementsDetailedView from '../MeasurDetailed/detailedViewLogMeasuremnts';
import showMeasureStyles from '../Styling/ShowMeasurementsStyle';
import Modal from "react-native-modal";

const { height } = Dimensions.get('window');


const columsNum = 2;
class ShowMeasurementsScreen extends React.Component {
    static navigationOptions = (navigation) => {
        const { params = {} } = navigation.navigation.state;
        console.log(params);
        let headerRight = <TouchableOpacity style={styles.headerIconContainer}
            onPress={
                params.addMeasurements
            }>
            <Image source={require('../icons/plus-gray.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        return {
            headerRight,
        }
    }        

    constructor(props) {
        super(props);

        this.state = {
            userData: '',
            allDataUser: [],
            blureShow: false,
            flatListShow: true,
            detailCardShow: false,
            detailData: {},
            isVisibleModal: false,
            modalVisible: false
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({
            addMeasurements: this.addMeasurements,
            
        })
    }
    addMeasurements=()=>{
        this.props.navigation.navigate('LogMeasurementsScreen')
    }

    async componentWillMount() {
        await this.getData()
    }

    getData = async () => {
        try {
            let dataUser = await HttpUtilsFile.get('getweightlog')
            console.log(dataUser, 'dataUser');
            let code = dataUser.code;
            if (code) {
                let getUserData = await AsyncStorage.getItem('currentUser');
                let dataArr = [];
                //console.log(b);
                let parseUserData = JSON.parse(getUserData);
                //console.log(parseUserData._id);
                let loginUserId = parseUserData._id;
                //console.log(dataUser.content)
                let checkId = dataUser.content;
                for (const i in checkId) {
                    //console.log(checkId[i])
                    let data = checkId[i];
                    if (data.userId == loginUserId) {
                        dataArr = [...dataArr, data]
                        this.setState({
                            allDataUser: dataArr
                        })
                    }
                }

            }
            else {
                console.log('User Not Login')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    _keyExtractor = (item, index) => item.id;

    

    renderDataItems = ({ item }) => {
        //console.log(item)
        return (
            <View style={styles.bodyChildOne}>
                <TouchableOpacity
                    style={styles.cardLeft}
                    activeOpacity={0.7}
                    onPress={this.showBlureScreen.bind(this, item)}
                
                >
                    <View style={styles.childContainer}>
                        <View style={styles.cardNumberContainer}>
                            <Text style={styles.cardDateStyle}>{item.date}</Text>
                            <Text style={styles.weightTextStyle}>{item.weight}</Text>
                            <Text style={styles.textStyle}>Weight</Text>

                            <Text style={styles.waistTextStyle}>{item.waist}</Text>
                            <Text style={styles.textStyle}>Waist</Text>

                            <View style={styles.detailViewContainer}>
                                <Text style={styles.detailViewTextStyle}>View detailed</Text>

                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

        )

    }

    showBlureScreen(e) {
        this.setState({
            detailData: e,
            isVisibleModal: true
        })
    }

    backToPage = () => {
        this.setState({
            isVisibleModal: false,

        })
    }

    render() {
        const {
            allDataUser,
            blureShow,
            flatListShow,
            detailCardShow,
            detailData,
            openModal
        } = this.state;
        //console.log('detailData -->>', detailData)
        return (
            <View style={styles.mainContainer}>
                <View style={styles.smallChildContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>Log Measurements</Text>
                    </View>

                    {allDataUser.length > 0 ?
                        <FlatList
                            data={allDataUser}
                            renderItem={this.renderDataItems}
                            keyExtractor={this._keyExtractor}
                            numColumns={columsNum}
                        />
                    :
                    <View
                    style={{justifyContent:'center',alignItems:'center'}}
                    >
                        <Text style={{color: '#FF6200', fontFamily: "MontserratMedium"}}>No Found Measurements</Text>
                   </View>
                    }

                </View>
                <Modal
                    isVisible={this.state.isVisibleModal}
                    animationIn='zoomIn'
                    //animationOut='zoomOutDown'
                    backdropOpacity={0.8}
                    backdropColor='white'
                    coverScreen={true}
                    animationInTiming={700}
                    animationOutTiming={300}
                >

                    <LogMeasurementsDetailedView
                        userDetailData={detailData}
                        backToPage={this.backToPage}
                    />


                </Modal>

            </View>
        )
    }

}

export default ShowMeasurementsScreen; 
