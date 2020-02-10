import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../Styling/ExerciseLogStyle';
import HttpUtils from '../Services/HttpUtils';
import AsyncStorage from '@react-native-community/async-storage';

const { height } = Dimensions.get('window');

const columsNum = 2;

class Exerciselog extends React.Component {
    static navigationOptions = (navigation) => {
        const { params = {} } = navigation.navigation.state;
        console.log(params);
        let headerRight = <TouchableOpacity 
        style={styles.headerIconContainer}
            onPress={
                params.addExercise
            }
            >
            <Image source={require('../icons/plus-gray.png')} 
            style={styles.headerIcon} 
            />
        </TouchableOpacity>
        return {
            headerRight,
        }
    }        
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            maxDate: '',
            data: '',
            filterData: [],
            userId: ''
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({
            addExercise: this.addExercise,
            //showIcon:this.state.iconShow
        })
    }

    addExercise=()=>{
        this.props.navigation.navigate('AddExercise')
    }

    async componentWillMount() {
        //get current user id
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    userId: dataFromLocalStorage._id
                })
            }
        });
        //calling a function
        await this.getData();
        this.dateFilter();
    }

    //get data from database
    getData = async () => {
        //get current date 
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        //get data from database
        //let dataUser = await HttpUtils.get('getallexerciselog')
       await AsyncStorage.getItem('logExercises').then((value)=>{
            let dataFromLocalStorage = JSON.parse(value);
            console.log('log exercises data >>',dataFromLocalStorage);
            this.setState({
                    maxDate: date + '-' + month + '-' + year,
                    date: date + '-' + month + '-' + year,
                    data: dataFromLocalStorage
                })
        })
        //set date , max date and data ikn the state
        // await this.setState({
        //     maxDate: date + '-' + month + '-' + year,
        //     date: date + '-' + month + '-' + year,
        //     //data: dataUser.content
        // })
    }
    //filtration with date
    dateFilter = (e) => {
        const { data, date, userId } = this.state;
        //clear previous data in filter array
        this.setState({
            filterData: []
        })
        //create array for store data
        let dataArr = [];
        //start loop in data
        for (var i in data) {
            let dataFilter = data[i];
            //console.log('data content >>', dataFilter)
            //check current user data
            if (dataFilter.userId == userId) {
                //get data of current date
                if (e == undefined) {
                    if (dataFilter.date == date) {
                        dataArr = [...dataArr, dataFilter]
                        this.setState({
                            filterData: dataArr
                        })
                    }
                }
                //get data with choseing date
                else if (e != undefined) {
                    this.setState({
                        date: e
                    })
                    if (dataFilter.date == e) {
                        dataArr = [...dataArr, dataFilter]
                        this.setState({
                            filterData: dataArr,
                            date: e
                        })
                    }
                }
            }
        }
    }

    _keyExtractor = (item, index) => item.id;

    //rendering excersice data in flate list
    renderDataItems = ({ item }) => {
        console.log('flate list data >>', item);
       
        return (
            <View style={styles.bodyChildOne}>
                <TouchableOpacity style={styles.resultCardLeft} id={item.id}>
                    <Text style={styles.resultText}>
                        {item.exerciseName}
                        
                    </Text>
                     <Text style={styles.resultTextAmount}>
                        {item.exerciseAmount}
                    </Text> 
                    <Text style={styles.resultTextUnit}>
                        {item.exerciseUnit}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { date, filterData, maxDate,data } = this.state;
         console.log('data user >>', data);
         console.log('state filter data >>', filterData)
        return (
            <View style={styles.mainContainer}>
                <View style={styles.childContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            Exercise Log
                        </Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        {/* <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity> */}
                        <DatePicker
                            style={{ width: 120 }}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-1950"
                            maxDate={maxDate}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    width: 0,
                                    height: 0,
                                },
                                dateInput: {
                                    height: 40,
                                }
                            }}
                            onDateChange={
                                this.dateFilter
                            }
                        />
                        {/* <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity> */}
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                        <FlatList
                            data={filterData}
                             renderItem={this.renderDataItems}
                             keyExtractor={this._keyExtractor}
                            numColumns={columsNum}
                        />
                    </ScrollView>
                    <View style={{
                        marginVertical: 70,
                        height: 30
                    }}>
                    </View>
                </View>
            </View>
        )
    }
}

export default Exerciselog;

