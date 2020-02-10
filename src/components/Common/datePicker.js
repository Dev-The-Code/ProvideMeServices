import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

const PickDate = (props) => {
    return (
        <View style={styles.arrowContainer}>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity style={{ marginRight: 20 }}>
                <Image source={require('../icons/left.png')} style={styles.forImgs} />
            </TouchableOpacity>
            <Text>Today</Text>
            <TouchableOpacity style={{ marginLeft: 20 }}>
                <Image source={require('../icons/right.png')} style={styles.forImgs} />
            </TouchableOpacity>
        </View>
    )
}

export default PickDate;

const styles = StyleSheet.create({
    arrowContainer: {
        flex: 1,
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forImgs: {
        height: 15,
        width: 15,
    },
})