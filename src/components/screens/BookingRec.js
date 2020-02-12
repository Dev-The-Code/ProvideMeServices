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

// const { heightDimension } = Dimensions.get('window').height;
import styles from '../Styling/BookingRecStyle';


class BookingRec extends React.Component {


    constructor(props) {
        super(props)

        this.state = {

        }

    }

    render() {

        return (
            <View style={{ flex: 1, }} >
                <View styles={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Booking Recieved</Text>
                    </View>
                </View>

                <View styles={styles.container2}>
                    <View style={styles.heading2}>
                        <Text style={styles.headingText2}>Thank You</Text>
                    </View>
                </View>


                <View styles={styles.container3}>
                    <View style={styles.heading3}>
                        <Text style={styles.headingText3}>Your booking has been recieved</Text>
                    </View>
                </View>

                <View styles={styles.container4}>
                    <View style={styles.heading4}>
                        <Text style={styles.headingText4}>Our agent will contact your through this
                                app on the select day. Meanwhile, you can contact them through message
                                section in case you have any query.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.container5}>
                    <View style={styles.btnHeading5}>
                        <Text style={styles.btnHeadingText5}>
                            Got it
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        )

    }
}

export default BookingRec;