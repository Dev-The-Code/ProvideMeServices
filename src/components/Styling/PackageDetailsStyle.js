import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    // scrollView: {
    //     backgroundColor: Colors.lighter,
    // },
    // engine: {
    //     position: 'absolute',
    //     right: 0,
    // },
    // body: {
    //     backgroundColor: Colors.white,
    // },
    mapContainer: {
        paddingBottom: 40,
        height: '60%'
    },
    sectionContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        height: '120%'

    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        // color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        // color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        // color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },

    map: {
        height: '100%',
        width: '100%'
    },

    container: {
        flex: 1,
        marginHorizontal: 10,

    },
    container2: {
        flex: 1,
        paddingHorizontal: 5,
        paddingBottom: 5

    },

    heading: {
        height: 30,
        paddingHorizontal: 5,

        //backgroundColor:'red'
    },
    headingText: {
        color: '#555555',
        fontFamily: "MontserratExtraBold",
        fontSize: 20,
        marginBottom: 10,

    },

    search: {
        marginHorizontal: 5,
    },

    inputSearch: {
        marginHorizontal: 5,
        marginVertical: 20,
        flex: 1,

        //height: '100%'

    },

    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    // map: {
    //     ...StyleSheet.absoluteFillObject,
    // },
});

export default styles;