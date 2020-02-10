import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
// const screenWidth = Dimensions.get('window').width;
// const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        padding: 10
      }
})

export default styles;