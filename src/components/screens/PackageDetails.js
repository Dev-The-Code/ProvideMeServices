import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image
} from 'react-native';

// import {
//     Colors,
// } from 'react-native/Libraries/NewAppScreen';
import styles from '../Styling/PackageDetailsStyle';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';
// var country = require('countryjs');
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

class PackageDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            region:
                {
                    // name: 'Pakistan',
                    latitude: 24.860735,
                    longitude: 67.001137,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,
                },
        }
    }

    onChangeText = (value) => {
        console.log('countryvalue>>>', value)
        if (value === 'Pakistan') {
            this.setState({
                region: this.state.pakValue,
            })
        }
        else if (value === 'US') {
            this.setState({
                region: this.state.usValue,
            })
        }
        console.log('Regionvalue', this.state.region)
    }

    onChangeArea = (value) => {
        console.log('areavalue>>>', value)
        if (value === 'Malir') {
            this.setState({
                region: this.state.malirValue,
            })
        }
        else if (value === 'Steel Town') {
            this.setState({
                region: this.state.stlValue,
            })
        }

    }

    onRegionChange = (region) => {
        this.setState({ region });
        //console.log("regionValues", region)
    }

    //    // onSelectAddress = (details) => {
    //         console.log('location log=== ' + details.geometry.location);
    //         //this.setState({ latVal: details.geometry.location.lat });
    //     }

    onLocationSelect(data, details) {
        console.log(data, details);

        this.setState({

            region: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        })
    }


    render() {

        const { countryData, city, khiAreas } = this.state;
        //console.log('Regionvalue', this.state.region)


        return (
            <View style={styles.container2}>

                <View style={styles.heading}>
                    <Text style={styles.headingText}>Package Details</Text>
                </View>

                <View style={styles.inputSearch} keyboardShouldPersistTaps={true}>
                    {/* {GoogleMapsPlacesInput} */}

                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={'search'}
                        keyboardAppearance={'light'}
                        listViewDisplayed='auto'
                        //keyboardShouldPersistTaps="always"
                        fetchDetails={true}
                        renderDescription={row => row.description || row.formatted_address || row.name}
                        onPress={(data, details = null) => {
                            this.onLocationSelect(data, details)
                            // 'details' is provided when fetchDetails = true
                            //console.log(data, 'data');
                            //console.log(details.geometry.location , 'details');

                        }}

                        getDefaultValue={() =>
                            ''
                        }

                        query={{
                            key: 'AIzaSyC6l7-A3QgD4TG1Q3CBIKln8d5bJGzr-iM',
                            language: 'en',
                            types: '(cities)'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: 'black'
                            },

                            listView: {
                                position: 'absolute',
                                top: 60,
                                left: 10,
                                right: 10,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                flex: 1,
                                elevation: 3,
                                zIndex: 100,
                            },
                        }}

                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            type: 'cafe'
                        }}

                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'geometry',
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        predefinedPlaces={[homePlace, workPlace]}
                        enablePoweredByContainer={false}
                        // keyboardShouldPersistTaps="handled"
                        debounce={400} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    // renderLeftButton={() => <Image source={require('../icons/audio.png')} />}
                    // renderRightButton={() => <Text>Custom text after the input</Text>}
                    />
                </View>


                {/* <View style={styles.search}>
                            <Dropdown
                                label='Country'
                                data={countryData}
                                onChangeText={this.onChangeText}
                            />
                        </View>

                        <View style={styles.search}>
                            <Dropdown
                                label='City'
                                data={city}
                            />
                        </View>

                        <View style={styles.search}>
                            <Dropdown
                                label='Select Area'
                                data={khiAreas}
                                onChangeText={this.onChangeArea}
                            />
                        </View> */}

                <ScrollView style={styles.mapContainer} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.sectionContainer}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            region={this.state.region}
                            onRegionChange={this.onRegionChange}
                            rotateEnabled={true}
                            scrollEnabled={true}
                        >

                            <Marker
                                draggable
                                coordinate={{
                                    latitude: this.state.region.latitude, longitude: this.state.region.longitude
                                }}
                                title={this.state.region.name}
                                description={this.state.region.name}
                                onDragEnd={(e) => console.log('region coordinates', { x: e.nativeEvent.coordinate })}
                            />
                        </MapView>

                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default PackageDetails;
