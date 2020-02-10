import React, { Component } from 'react';
import styles from '../Styling/LoadSpinner';
import {
  ActivityIndicator,
  View,
} from 'react-native'

export default class ActivateSpinner extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color="#FF6200" />
      </View>
    )
  }
}
