import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD23oLVCqij_vkY97TP430AHvUBvb9A4YA",
    authDomain: "provide-me-service.firebaseapp.com",
    databaseURL: "https://provide-me-service.firebaseio.com",
    projectId: "provide-me-service",
    storageBucket: "provide-me-service.appspot.com",
    messagingSenderId: "130141256378",
    appId: "1:130141256378:web:efa01047dcadbdb9ac2083",
    // measurementId: "G-3R7J6L2141"
  };
firebase.initializeApp(config)

export default firebase;