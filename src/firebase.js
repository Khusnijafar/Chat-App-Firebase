import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAGlgcMqjNnU1ErXda26uiLN6QPRuSSCtQ",
    authDomain: "chat-app-59da7.firebaseapp.com",
    databaseURL: "https://chat-app-59da7.firebaseio.com",
    projectId: "chat-app-59da7",
    storageBucket: "chat-app-59da7.appspot.com",
    messagingSenderId: "315663037200",
    appId: "1:315663037200:web:5fcefe88f9f5dfd7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase