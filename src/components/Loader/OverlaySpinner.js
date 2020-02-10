import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

class OverlayLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
    }


    render() {

        return (
            <View style={styles.container}>
                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={this.state.loading}
                    //Text with the Spinner 
                    textContent={'Loading...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                    color={'#FF6200'}
                />
            </View>
        )
    }

}
export default OverlayLoader;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinnerTextStyle: {
        color: '#FF6200',
    },
})