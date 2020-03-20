import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Picker,
    Option
} from 'react-native';

import { SearchBar } from 'react-native-elements';
const { heightDimension } = Dimensions.get('window').height;
import styles from '../Styling/PackagesScreenStyle';
import HttpUtilsFile from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast';

import CaloriesSetupBtn from '../buttons/setUpBtn';
import MySearch from '../SearchBar/MySearchBar';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';


class PackagesScreen1 extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            shortPrice: true,
            medical: true,
            transformation: true,
            partum: true,
            name: '',
            email: '',
            number: '',
            position: 'top',
            card1Color: false,
            card2Color: false,
            card3Color: false,
            card4Color: false,
            forTrainnerModal: false,
            addCartColor: false,
            date: "",
            showPickerCheck: false,

            foodItems: [{
                value: 'Biryani',
            },
            {
                value: 'Qorma',
            },
            {
                value: 'Kofty',
            },

            ],

        }
    }

    ChangeBgColor = (values) => {
        console.log('values check >>', values)
        if (values === 'card1') {
            this.setState({
                card1Color: true,
            })
        }

        else if (values === 'card2') {
            this.setState({
                card2Color: true,
            })
        }

        else if (values === 'card3') {
            this.setState({
                card3Color: true,
            })
        }

        else if (values === 'card4') {
            this.setState({
                card4Color: true,
            })
        }
    }

    changeColor = (values) => {
        if (values === 'addCart') {
            this.setState({
                addCartColor: !this.state.addCartColor,
            })
        }
    }

    setModalVisible = (isVisible) => {
        this.setState({ forTrainnerModal: isVisible });
    }

    showPicker = () => {
        if (this.state.showPickerCheck) {
            this.setState({
                showPickerCheck: true
            })
        }
    }

    removeModal = () => {
        // const { navigate } = this.props.navigation;
        this.setState({
            forTrainnerModal: false
        },
            // () => { navigate('Homescreen') }
        )

    }

    render() {
        const { shortPrice, medical, transformation, partum, forTrainnerModal, foodItems } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container2}>
                <ScrollView style={{ flex: 1, height: heightDimension, paddingBottom: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View styles={styles.container}>
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>Graveyard</Text>
                        </View>

                        <View style={styles.search}>
                            <MySearch style={styles.searchbar} onPress={() => navigate('HomeScreen2')}
                                round
                                lightTheme
                                placeholder="Search & Filters"
                                platform="android"
                                inputContainerStyle={{
                                    backgroundColor: 'white',
                                    // borderColor: 'red',
                                    elevation: 10,
                                    // borderWidth: 1,
                                    borderRadius: 10,
                                }}

                            />
                        </View>

                        <TouchableOpacity style={[styles.cardMainCon, { backgroundColor: this.state.card1Color ? '#447BBE' : 'white' }]}
                            onPress={() => {
                                this.ChangeBgColor('card1');
                                this.setModalVisible(true);
                                //navigate('PackageDetails');
                            }}>
                            <View style={styles.plan}>
                                <Text style={styles.cardText}>Quran Khuwani</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.cardText2}>Rs.1200</Text>
                                </View>

                                {this.state.card1Color ? <View style={styles.counterCont}>
                                    <Text style={{ color: 'white' }}> 1 </Text>
                                </View> : null}
                            </View>

                            <Text style={styles.pkgText}>Live Quran Khuwani event where our agents live streams
                            your loved one's so you pray for them.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.cardMainCon, { backgroundColor: this.state.card2Color ? '#447BBE' : 'white' }]}
                            onPress={() => { this.ChangeBgColor('card2'); this.setModalVisible(true); }}>
                            <View style={styles.plan}>
                                <Text style={styles.cardText}>Quran Khuwani</Text>

                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.cardText2}>Rs.1200</Text>
                                </View>

                                {this.state.card2Color ? <View style={styles.counterCont}>
                                    <Text style={{ color: 'white' }}> 1 </Text>
                                </View> : null}
                            </View>

                            <Text style={styles.pkgText}>Live Quran Khuwani event where our agents live streams
                            your loved one's so you pray for them.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.cardMainCon, { backgroundColor: this.state.card3Color ? '#447BBE' : 'white' }]}
                            onPress={() => { this.ChangeBgColor('card3'); this.setModalVisible(true); }}>
                            <View style={styles.plan}>
                                <Text style={styles.cardText}>Quran Khuwani</Text>

                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.cardText2}>Rs.1200</Text>
                                </View>

                                {this.state.card3Color ? <View style={styles.counterCont}>
                                    <Text style={{ color: 'white' }}> 1 </Text>
                                </View> : null}
                            </View>

                            <Text style={styles.pkgText}>Live Quran Khuwani event where our agents live streams
                            your loved one's so you pray for them.
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.cardMainCon, { backgroundColor: this.state.card4Color ? '#447BBE' : 'white' }]}
                            onPress={() => { this.ChangeBgColor('card4'); this.setModalVisible(true); }}>
                            <View style={styles.plan}>
                                <Text style={styles.cardText}>Quran Khuwani</Text>

                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.cardText2}>Rs.1200</Text>
                                </View>

                                {this.state.card4Color ? <View style={styles.counterCont}>
                                    <Text style={{ color: 'white' }}> 1 </Text>
                                </View> : null}
                            </View>

                            <Text style={styles.pkgText}>Live Quran Khuwani event where our agents live streams
                            your loved one's so you pray for them.
                            </Text>
                        </TouchableOpacity>

                        <View style={{ marginVertical: -30 }}>
                        </View>


                        <View style={styles.mainContainer}>
                            <View style={styles.childMainContainer}>
                                <Modal style={{ marginHorizontal: 25 }}
                                    isVisible={this.state.forTrainnerModal}
                                    animationIn='zoomIn'
                                    //animationOut='zoomOutDown'
                                    backdropOpacity={0.9}
                                    backdropColor='transprent'
                                    transparent={true}
                                    backdropColor='white'
                                    coverScreen={true}
                                    animationInTiming={500}
                                    animationOutTiming={500}
                                >


                                    {/* Modal Work */}
                                    <View style={styles.modaMainCont}>
                                        <View style={styles.modalChildCont}>
                                            <Text style={styles.modalTxt}>
                                                Details for Food Charity
                                                </Text>
                                            <View style={{ paddingTop: 5 }}>
                                                <Text style={{ color: '#E5E5E5', }}>
                                                    Get food cooked and given to the needy people for eesal-e-sawab for your loved one.
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.foodMainCont}>
                                            <Dropdown
                                                label='Food Catetogies'
                                                data={foodItems}
                                            //onChangeText={this.onChangeText}
                                            />
                                        </View>

                                        <View style={styles.quaMainCont}>
                                            <Text style={{ color: '#E5E5E5', }}>
                                                Daigs Quantity
                                                </Text>


                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ margin: 1, }}>
                                                    <Text style={styles.quaIncSty}>
                                                        +
                                                </Text>
                                                </TouchableOpacity >

                                                <View style={{ margin: 3, }}>
                                                    <TextInput style={styles.textInpsty}
                                                        underlineColorAndroid="transparent"
                                                        placeholder="15"
                                                        placeholderTextColor="black"
                                                        autoCapitalize="none"
                                                        underlineColorAndroid="#E5E5E5" />

                                                </View>

                                                <TouchableOpacity>
                                                    <Text style={styles.quaDecSty}>
                                                        -
                                                </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={styles.quaMainCont}>
                                            <Text style={{ color: '#E5E5E5', }}>
                                                Daigs KG's
                                                </Text>


                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ margin: 1, }}>
                                                    <Text style={styles.quaIncSty}>
                                                        +
                                                </Text>
                                                </TouchableOpacity >

                                                <View style={{ margin: 3, }}>
                                                    <TextInput style={styles.textInpsty}
                                                        underlineColorAndroid="transparent"
                                                        placeholder="15"
                                                        placeholderTextColor="black"
                                                        autoCapitalize="none"
                                                        underlineColorAndroid="#E5E5E5" />

                                                </View>

                                                <TouchableOpacity>
                                                    <Text style={styles.quaDecSty}>
                                                        -
                                                </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        {/* Date and time work starts from here */}
                                        <View style={styles.dateTimeCon}>

                                            <Text style={{ color: '#E5E5E5', }}>
                                                Date
                                                </Text>


                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ margin: 1 }}>
                                                    <Text style={styles.dateShowSty}>
                                                        {this.state.date}
                                                    </Text>
                                                </TouchableOpacity >

                                                <TouchableOpacity onPress={() => this.showPicker()}>
                                                    <DatePicker
                                                        style={styles.datePickerSty}
                                                        date={this.state.date}
                                                        mode="date"
                                                        placeholder="select date"
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

                                        {/* Add to cart button work starts from here */}

                                        <View style={styles.cartBtnCon}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <TouchableOpacity
                                                    onPress={() => this.changeColor('addCart')}>
                                                    <Text style={this.state.addCartColor ?
                                                        styles.cartchangeTextSt
                                                        :
                                                        styles.cartTextSt}>
                                                        Add to Cart
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => this.removeModal(true)}>
                                                    <Text style={styles.cancelBtnTxt}>
                                                        Cancel
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                    </View>
                                </Modal>
                            </View>
                        </View>





                        {/* <View style={styles}>
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>Medical Condition Plan</Text>
                            {
                                medical ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.medicalToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.medicalToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View> */}
                        {/* {
                            medical ?
                                <Text style={styles.priceText}>Rs.8000/$80</Text>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>For Pakistanis : PKR 8000{"\n"}For Overseas : $80</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Exclusively for PCOs, Diabetes,Thyroid</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Medical assistance</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'Medical Condition Plan')}
                                    />
                                </View>



                        }
                    </View> */}



                        {/* <View style={styles}>
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>The Transformation Plan</Text>
                            {
                                transformation ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.transformationToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.transformationToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            transformation ?
                                <Text style={styles.priceText}>Rs.15000/$150</Text>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>For Pakistanis : PKR 15000{"\n"}For Overseas : $150</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={{ color: '#7e7e7e', fontFamily: 'MontserratMedium', }}>Duration 3 Month</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'The Transformation Plan')}
                                    />
                                </View>



                        }
                    </View> */}



                        {/* <View style={styles}>
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>Post Partum Plan</Text>
                            {
                                partum ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.partumToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.partumToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            partum ?
                                <Text style={styles.priceText}>Rs.10000/$100</Text>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>For Pakistanis : PKR 10000{"\n"}For Overseas : $100</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Exclusively for post partum{"\n"}(post pregnancy) women.</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Medical assistance</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin.bind(this, 'Post Partum Plan')}
                                    />
                                </View>



                        }
                    </View>

                </View> */}
                        {/* <Toast ref="toastWithStyle"
                    style={{ backgroundColor: '#FF6200' }}
                    position={this.state.position}
                    positionValue={50}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white', fontFamily: 'MontserratLight', }}
                />
                <View style={{ marginBottom: 15 }}> */}

                    </View>
                </ScrollView>

                <View style={styles.cartMainCon}>
                    <TouchableOpacity style={styles.cartCont} onPress={() => navigate('PackageDetails')
                        //this.props.navigation.navigate('Cart')
                    }>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={styles.goToCartText}> Go to cart</Text>
                        </View>

                        <View style={styles.counterCont2}>
                            <Text style={{ color: 'white', textAlign: 'center' }}> 2 </Text>
                        </View>

                    </TouchableOpacity>
                </View>

            </View>




        )
    }
}


export default PackagesScreen1;