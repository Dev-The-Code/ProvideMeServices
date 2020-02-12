import React from 'react';
import styles from '../Styling/CartStyle';
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
const { heightDimension } = Dimensions.get('window').height;
import HttpUtils from '../Services/HttpUtils';
import DatePicker from 'react-native-datepicker';
import Toast, { DURATION } from 'react-native-easy-toast';

class Cart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            date: "",
            showPickerCheck: false,
            time: "06:12",

        }
    }

    showPicker = () => {
        if (this.state.showPickerCheck) {
            this.setState({
                showPickerCheck: true
            })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (

            // <View style={styles.container2}>
            //     <Text style={{ marginLeft: 50 }}> Cart </Text>
            //     <ScrollView>
            //         <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>

            //             <View style={{ borderColor: 'black', marginHorizontal: 30, borderWidth: 1 }}>
            //                 <Text >Graveyard</Text>


            //                 <TouchableOpacity style={styles.monthlyPlan}>
            //                     <View style={styles.plan}>
            //                         <Text style={styles.monthlyText}>Quran Khuwani</Text>
            //                         <View style={{ flexDirection: 'row', }}>
            //                             <Text style={{ color: 'black', marginRight: 5 }}>Rs.1200</Text>
            //                         </View>
            //                     </View>
            //                 </TouchableOpacity>
            //             </View>
            //         </View>
            //     </ScrollView>
            // </View>

            <View style={styles.container2}>
                <ScrollView style={{ flex: 1, height: heightDimension, paddingBottom: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View styles={styles.container}>
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>Cart</Text>
                        </View>

                        <TouchableOpacity style={styles.monthlyPlan}>
                            <View style={styles.plan}>
                                <Text style={styles.monthlyText}>Quran Khuwani</Text>
                                <View style={{ flexDirection: 'row', marginLeft: 180, }}>
                                    <TouchableOpacity activeOpacity={0.6}>
                                        <Image source={require('../icons/cancel.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.priceText}>
                                Rs. 20,000
                            </Text>
                            <Text style={styles.priceTextHead}>
                                Price
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                <View>
                                    <Text style={{ color: '#E5E5E5', }}>
                                        {this.state.time}
                                    </Text>

                                    <Text style={styles.priceTextHead}>
                                        Time
                                     </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.showPicker()}>
                                        <DatePicker
                                            style={{ width: 100, color: '#E5E5E5', textAlign: 'center', marginBottom: 10, borderColor: 'black', }}
                                            date={this.state.time}
                                            mode="time"
                                            display="clock"
                                            placeholder="Change"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    display: 'none',
                                                },
                                                dateInput: {
                                                    borderRadius: 50,
                                                    borderColor: '#447BBE',
                                                    height: 30,
                                                    marginBottom: 10
                                                }
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(time) => { this.setState({ time: time }) }}
                                        />

                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <View>
                                    <Text style={{ color: '#E5E5E5', }}>
                                        {this.state.date}
                                    </Text>
                                    <Text style={styles.priceTextHead}>
                                        Date
                            </Text>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.showPicker()}>
                                        <DatePicker
                                            style={{ width: 100, color: '#E5E5E5', textAlign: 'center', marginBottom: 10 }}
                                            date={this.state.date}
                                            mode="date"
                                            placeholder="Select"
                                            format="YYYY-MM-DD"
                                            minDate="2016-05-01"
                                            maxDate="2090-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    display: 'none',
                                                },
                                                dateInput: {

                                                    borderRadius: 50,
                                                    borderColor: '#447BBE',
                                                    height: 30,
                                                    marginBottom: 10
                                                }
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(date) => { this.setState({ date: date }) }}
                                        />


                                    </TouchableOpacity>

                                </View>

                            </View>
                            <View>
                                <Text style={styles.priceText}>
                                    Rs. 20,000
                            </Text>
                                <Text style={styles.priceTextHead}>
                                    Total
                            </Text>
                            </View>

                        </TouchableOpacity>

                        {/* 2ndCard work */}

                        <TouchableOpacity style={styles.monthlyPlan}>
                            <View style={styles.plan}>
                                <Text style={styles.monthlyText}>Biryani Charity</Text>
                                <View style={{ flexDirection: 'row', marginLeft: 180, }}>
                                    <TouchableOpacity activeOpacity={0.6}>
                                        <Image source={require('../icons/cancel.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.priceText}>
                                Rs. 300
                            </Text>
                            <Text style={styles.priceTextHead}>
                                Price per person
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                                <View>
                                    <Text style={{ color: '#E5E5E5', }}>
                                        50
                                </Text>

                                    <Text style={styles.priceTextHead}>
                                        Qunatity
                                </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ margin: 1, }}>
                                        <Text style={{ color: 'black', borderColor: '#447BBE', textAlign: 'center', borderRadius: 15, borderWidth: 1, padding: 5, width: 40, height: 30 }}>
                                            +
                                    </Text>
                                    </TouchableOpacity >
                                    <View style={{ margin: 10 }}>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={{ color: 'black', borderColor: '#447BBE', borderRadius: 15, borderWidth: 1, textAlign: 'center', padding: 5, width: 40, height: 30 }}>
                                            -
                                                </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <View>
                                    <Text style={{ color: '#E5E5E5', }}>
                                        {this.state.date}
                                    </Text>
                                    <Text style={styles.priceTextHead}>
                                        Date
                            </Text>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.showPicker()}>
                                        <DatePicker
                                            style={{ width: 100, color: '#E5E5E5', textAlign: 'center', marginBottom: 10 }}
                                            date={this.state.date}
                                            mode="date"
                                            placeholder="Select"
                                            format="YYYY-MM-DD"
                                            minDate="2016-05-01"
                                            maxDate="2090-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    display: 'none',
                                                },
                                                dateInput: {

                                                    borderRadius: 50,
                                                    borderColor: '#447BBE',
                                                    height: 30,
                                                    marginBottom: 10
                                                }
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(date) => { this.setState({ date: date }) }}
                                        />


                                    </TouchableOpacity>

                                </View>

                            </View>
                            <View>
                                <Text style={styles.priceText}>
                                    Rs. 15,000
                            </Text>
                                <Text style={styles.priceTextHead}>
                                    Total
                            </Text>
                            </View>

                        </TouchableOpacity>

                        {/* 3rdCard Work */}

                        <TouchableOpacity style={styles.monthlyPlan}>
                            <View style={styles.plan}>
                                <Text style={styles.monthlyText}>Grave Maintinance</Text>
                                <View style={{ flexDirection: 'row', marginLeft: 60, }}>
                                    <TouchableOpacity activeOpacity={0.6}>
                                        <Image source={require('../icons/cancel.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.priceText}>
                                Rs. 1500
                            </Text>
                            <Text style={styles.priceTextHead}>
                                Price per month
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <View>
                                    <Text style={{ color: '#E5E5E5', }}>
                                        Bahria Town Graveyard
                                    </Text>
                                    <Text style={styles.priceTextHead}>
                                        Graveyard
                                    </Text>
                                </View>

                                <View >
                                    <TouchableOpacity style={{ borderColor: '#447BBE', borderWidth: 1, borderRadius: 50, width: 80, }}>
                                        <Text style={{ textAlign: 'center', color: '#E5E5E5', padding: 5, }}>
                                            Change
                                            </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'space-between', marginTop: 20 }}>
                                <Text style={{ color: '#E5E5E5', }}>
                                    Grave Number
                                    </Text>
                                <Text style={styles.priceTextHead}>
                                    Grave number Clue
                            </Text>
                            </View>

                            <View>
                                <Text style={styles.priceText}>
                                    Rs. 15,000
                            </Text>
                                <Text style={styles.priceTextHead}>
                                    Total
                            </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ marginVertical: 10 }}>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.cartMainCon}>
                    <TouchableOpacity style={styles.cartCont} onPress={() => navigate('Payment')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                            <Text style={{ color: 'white', marginBottom: 10, marginTop: 10, fontSize: 18, fontWeight: 'bold' }}> Book these services </Text>
                        </View>
                        <View style={{ paddingTop: 5 }}>
                            <View style={styles.counterCont2}>
                                <Text style={{ color: '#447BBE', textAlign: 'center', fontWeight: 'bold' }}> Rs. 36,000 </Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>

            </View>


        )
    }
}

export default Cart;