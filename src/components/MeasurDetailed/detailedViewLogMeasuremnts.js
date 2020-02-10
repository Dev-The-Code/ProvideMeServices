import React from 'react';
import { Text, View, Image, TouchableOpacity, } from 'react-native';
import styles from './styling/styling'


export default class LogMeasurementsDetailedView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.cardContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            color: '#FF6200',
                            fontFamily: "MontserratExtraBold"
                        }}>Detail</Text>
                    </View>
                    <View style={styles.dateWithCancelIcon}>
                        <Text style={{ color: '#a6a6a6', fontSize: 18 }}>{this.props.userDetailData.date}</Text>
                        <TouchableOpacity onPress={this.props.backToPage} activeOpacity={0.6}>
                            <Image source={require('../icons/cancel.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ color: '#a6a6a6', fontSize: 12 }}>{this.props.userDetailData.weight}</Text>
                        <Text style={{ color: '#a6a6a6', fontSize: 12 }}>{this.props.userDetailData.day}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#a6a6a6', fontSize: 10 }}>Weight</Text>
                        <Text style={{ color: '#a6a6a6', fontSize: 10 }}>Day</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.borderLineStyle}></Text>
                        <Text style={styles.borderLineStyle}></Text>
                    </View>
                    {/* Start Second Thigh and chest */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ color: '#a6a6a6', fontSize: 12 }}>{this.props.userDetailData.thigh}</Text>
                        <Text style={{ color: '#a6a6a6', fontSize: 12, }}>{this.props.userDetailData.chest}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#a6a6a6', fontSize: 10 }}>Thigh</Text>
                        <Text style={{ color: '#a6a6a6', fontSize: 10 }}>Chest</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.borderLineStyle}></Text>
                        <Text style={styles.borderLineStyle}></Text>
                    </View>
                    {/* Start Day and other any one */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ color: '#a6a6a6', fontSize: 12 }}>{this.props.userDetailData.biceps}</Text>
                        <Text style={{ color: '#a6a6a6', fontSize: 12 }}>{this.props.userDetailData.neck}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#a6a6a6', fontSize: 10 }}>Bicep</Text>
                        <Text style={{ color: '#a6a6a6', fontSize: 10 }}>Neck</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.borderLineStyle}></Text>
                        <Text style={styles.borderLineStyle}></Text>
                    </View>
                    {/* Start Any One Fiel */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ color: '#a6a6a6', fontSize: 12 }}>{this.props.userDetailData.shoulder}</Text>
                        <Text style={{ color: '#a6a6a6', fontSize: 12, }}>{this.props.userDetailData.waist}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#a6a6a6', fontSize: 10 }}>Shoulder</Text>
                        <Text style={{ color: '#a6a6a6', fontSize: 10 }}>Waist</Text>
                    </View>
                </View>
            </View>
        )
    }
}