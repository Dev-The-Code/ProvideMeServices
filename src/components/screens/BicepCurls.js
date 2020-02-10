import React from 'react';
import { View, StyleSheet } from 'react-native';
import BriskScreen from './BriskScreen';

const Bicepcurls = (props) => {
    return (
        <View style={styles.container}>
            <BriskScreen title="Bicep curls"
                increamentVal={props.increamentVal}
                decrementVal={props.decrementVal}
                backFunc={props.backFunc}
                setAmount={props.setAmount}
                amount={props.amount}
                updateUnit={props.updateUnit}
                unit={props.unit} />
        </View>
    )

}
export default Bicepcurls;

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: 'row',
    }
})