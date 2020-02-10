import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BriskScreen from './BriskScreen';


const HighpacejoggingScreen = (props) => {
    return (
        <View style={styles.container}>
            <BriskScreen title="High paced jogging"
               increamentVal={props.increamentVal}
               decrementVal={props.decrementVal}
               //  label="Reps" value="reps" 
               backFunc={props.backFunc} 
               setAmount={props.setAmount}
               amount={props.amount}
               updateUnit={props.updateUnit}
               unit={props.unit} />
        </View>
    )

}
export default HighpacejoggingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: 'row',
    }
})