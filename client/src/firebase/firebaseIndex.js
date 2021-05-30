import firebase from 'firebase';
import "firebase/auth"
import "firebase/firestore"
const fierbaseConfig ={
    apiKey: "AIzaSyB_KzHFFKhhmbTEUNeMiI7iPbhPSTs87_0",
    authDomain: "video-call-friends.firebaseapp.com",
    projectId: "video-call-friends",
    storageBucket: "video-call-friends.appspot.com",
    messagingSenderId: "919264520357",
    appId: "1:919264520357:web:cb9c23d569e44a8cf3054c",
    measurementId: "G-T9B0SSJBB4"
   }
   //initialize firebase
firebase.initializeApp(fierbaseConfig);
firebase.analytics();
