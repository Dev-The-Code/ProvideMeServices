import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import styles from '../Styling/InvoicesScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtilsFile from '../Services/HttpUtils';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import MonthSelectorCalendar from 'react-native-month-selector';
// import moment from 'react-native';
// console.log('moment', moment)

const { height } = Dimensions.get('window');
const columsNum = 2;

class Invoices extends React.Component {
    static navigationOptions = (navigation) => {
        //const { params = {} } = navigation.state;
        const { navigate } = navigation.navigation.navigate
        return {
            // headerRight:
            //      <TouchableOpacity style={styles.headerIconContainer}>
            //          <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon}/>
            //      </TouchableOpacity>,

            headerStyle: {
                backgroundColor: 'white'

            },
            headerTintColor: 'gray',
        }

    }
    constructor(props) {
        super(props);

        this.state = {
            allDataUser: [],
            invoiceData: [],
            isVisibleModal: false,
            receipt_img: '',
            month: '',
            date: "",
            time: '',
            showPicker: false,
            monthArr: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            fullDate: '',
            allDataShow: true,
            monthRelatedData: false,
            renderMonthData: '',
            noFound: false,
            releaseMonth: '',
            noInvoices: '',
            showNullInvoices: false,
            notMatch: false,
            showalert: false,
            matchArr: false
        }

    }

    componentWillMount() {
        this.dataRetrieve()
        // let monthNo = new Date().getMonth();
        // this.setState({ month: monthNo })
    }



    dataRetrieve = async () => {
        const getData = await AsyncStorage.getItem("currentUser");
        const parsForm = JSON.parse(getData)
        let userObj = {
            userId: parsForm._id
        }
        try {
            const userData = await HttpUtilsFile.post('invoice', userObj)
            const userContent = userData.content;
            if (userData.code == 200) {
                if (userContent.length == 0) {
                    this.setState({
                        noInvoices: userData.msg,
                        showNullInvoices: true
                    })
                }
                else {

                    this.setState({
                        invoiceData: userContent,
                        allDataUser:userContent
                    })
                }
            }

        }
        catch (error) {
            console.log(error)
        }


    }

    openModal = (data) => {
        console.log('receipt image >>', data)
        this.setState({
            receipt_img: data,

        }, () =>
            this.setState({ isVisibleModal: true, })
        )
    }
    closeModal = () => {
        this.setState({
            isVisibleModal: false
        })
    }


    // renderFullData = ({ item }) => {
    //     return (
    //         <View style={styles.bodyContainer}>
    //             <View style={styles.cardLeft}>
    //                 <View style={styles.childContainer}>
    //                     <View style={styles.cardNumberContainer}>
    //                         <Text style={styles.cardNumberStyle}>{item.serviceName == undefined ?
    //                             'Online Payment'
    //                             : item.serviceName
    //                         }</Text>
    //                         {item.serviceName != undefined ?
    //                             <View style={styles.checkReceipt}>
    //                                 <Text style={styles.checkReceiptText}>Check Receipt</Text>
    //                                 <TouchableOpacity onPress={this.openModal.bind(this, item.receiptImg)}>
    //                                     <Image source={require('../icons/attach-orange.png')}

    //                                         style={styles.iconStyle}
    //                                         resizeMode='cover'
    //                                     />
    //                                 </TouchableOpacity>
    //                             </View>
    //                             : null
    //                         }
    //                         <Text style={styles.priceDetail}>
    //                             Rs. {item.amount}
    //                         </Text>
    //                         <Text style={styles.textStyle}>Coach fees</Text>
    //                         <View style={styles.dateMonthContainer}>
    //                             <Text style={styles.monthName}>
    //                                 {item.paymentMonth}
    //                             </Text>
    //                         </View>
    //                         <Text style={styles.textStyle}>Issue date</Text>
    //                         <View style={styles.paymentStatusContainer}>
    //                             <Text style={styles.unpaidTextStyle}>paid</Text>
    //                             <Text style={styles.textStyle}>Payment status</Text>
    //                         </View>
    //                     </View>

    //                 </View>
    //             </View>
    //         </View>
    //     )
    // }

    _keyExtractor = (item, index) => item.id;

    renderDataItems = ({ item }) => {
        //console.log('data items >>', item)
        return (
            <View style={styles.bodyContainer}>
                <View style={styles.cardLeft}>
                    <View style={styles.childContainer}>
                        <View style={styles.cardNumberContainer}>
                            <Text style={styles.cardNumberStyle}>{item.serviceName == undefined ?
                                'Online Payment'
                                : item.serviceName
                            }</Text>
                            {item.serviceName != undefined ?
                                <View style={styles.checkReceipt}>
                                    <Text style={styles.checkReceiptText}>Check Receipt</Text>
                                    <TouchableOpacity onPress={this.openModal.bind(this, item.receiptImg)}>
                                        <Image source={require('../icons/attach-orange.png')}

                                            style={styles.iconStyle}
                                            resizeMode='cover'
                                        />
                                    </TouchableOpacity>
                                </View>
                                : null
                            }
                            <Text style={styles.priceDetail}>
                                Rs. {item.amount}
                            </Text>
                            <Text style={styles.textStyle}>Coach fees</Text>
                            <View style={styles.dateMonthContainer}>
                                <Text style={styles.monthName}>
                                    {item.paymentMonth}
                                </Text>
                            </View>
                            <Text style={styles.textStyle}>Issue date</Text>
                            <View style={styles.paymentStatusContainer}>
                                <Text style={styles.unpaidTextStyle}>paid</Text>
                                <Text style={styles.textStyle}>Payment status</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        )
    }





    showMonthPicker = () => {
        this.setState({
            showPicker: true
        })

    }
    monthSelect = (date) => {
        const { allDataUser, month } = this.state;
        let arr = [];
        const firstSlashIndex = date._i.indexOf('-');
        let lastSlashIndex = date._i.lastIndexOf('-')
        let monthNo = Number(date._i.slice(firstSlashIndex + 1, lastSlashIndex));
        const getYear = date._i.slice(lastSlashIndex + 1, 10);
        const getMonthName = this.state.monthArr[monthNo];
        const concatMonthYear = `${getMonthName}, ${getYear}`;
        // console.log(concatMonthYear, 'concatMonthYear')
        for (var i in allDataUser) {
            // console.log(allDataUser[i], 'data')
            if (allDataUser[i].paymentMonth == concatMonthYear) {
                arr.push(allDataUser[i]);                
            }
        }
        this.setState({
            invoiceData: arr,
            showPicker: false,
            matchArr: false
        })
        // console.log(arr, 'arr')
    }

    render() {
        const { navigate } = this.props.navigation;
        const {
            allDataUser,
            date,
            month,
            showPicker,
            allDataShow,
            monthRelatedData,
            releaseMonth,
            noInvoices,
            showNullInvoices,
            showalert,
            invoiceData,
            matchArr
            //allDataUser


        } = this.state;

        //console.log('invoice data >>>', invoiceData);
        // console.log('Receipt image >>>', this.state.receipt_img);

        return (

            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.textStyleOne}>Invoices</Text>

                </View>
                <View style={styles.arrowContainer}>
                    {/* { */}
                        {/* invoiceData.length > 0 ? */}
                            <TouchableOpacity onPress={this.showMonthPicker}><Text>Filter By Month</Text></TouchableOpacity>
                            {/* :
                            null
                    }  */}
                </View>
                <ScrollView style={{ flex: 1, backgrousndColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }} >

                    {
                        showPicker ?
                            <MonthSelectorCalendar
                                //selectedDate={}
                                onMonthTapped={(e) => this.monthSelect(e)}

                            />
                            : null
                    }


                    {
                        showNullInvoices ?
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center', alignSelf: 'center',
                                alignContent: 'center'
                            }}>
                                <Text style={{ color: '#FF6200', fontFamily: "MontserratMedium" }}>{noInvoices}</Text>
                            </View>
                            :
                            null
                    }

                    {/* {
                        this.state.notMatch ?
                        // <View><Text>Not Found Data</Text></View>
                        Alert.alert('Title','No Found Data',
                                [
                                    {
                                        text: 'OK', onPress: () =>
                                            this.setState({
                                                allDataShow: true,
                                                notMatch: false
                                            })
                                    },
                                ],
                            )
                        :
                        null
                    } */}
                    {/* {
                        allDataShow && allDataUser.length >= 0 ?
                        <FlatList
                           data={allDataUser}
                            renderItem={this.renderFullData}
                            keyExtractor={this._keyExtractor}
                            numColumns={columsNum}
                        />
                        :
                        null
                    } */}




                    {invoiceData.length > 0 ?
                        <FlatList
                            data={invoiceData}
                            renderItem={this.renderDataItems}
                            keyExtractor={this._keyExtractor}
                            numColumns={columsNum}
                        />

                        :
                        <View
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ color: '#FF6200', fontFamily: "MontserratMedium" }}>No Found Invoices</Text>
                        </View>

                    }
                    {/* {
                        matchArr ?
                        <View
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ color: '#FF6200', fontFamily: "MontserratMedium" }}>No Found Invoices</Text>
                            </View>
                       :
                       null     
                    } */}


                    <Modal
                        isVisible={this.state.isVisibleModal}
                        animationIn='bounce'
                        animationOut='fadeInDown'
                        //animationOut='zoomOutDown'
                        backdropOpacity={0.8}
                        backdropColor='white'
                        coverScreen={true}
                        animationInTiming={100}
                        animationOutTiming={100}

                        onBackdropPress={() => this.setState({ isVisibleModal: false })}
                    >

                        <View style={{ justifyContent: 'center', alignSelf: 'center', height: 300, width: '100%' }}>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#FF6200' }}>Receipt Image</Text>
                                <TouchableOpacity onPress={this.closeModal}>
                                    <Image source={require('../icons/cancel.png')}
                                    />
                                </TouchableOpacity>
                            </View> */}
                            <Image source={{ uri: this.state.receipt_img }}
                                resizeMode='contain'
                                style={styles.receiptImgStyle}
                            />
                        </View>


                    </Modal>




                </ScrollView>
            </View>
        )
    }

}

export default Invoices;