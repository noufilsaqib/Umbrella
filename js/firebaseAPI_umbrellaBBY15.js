//----------------------------------------
//  Umbrella's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyD8C27PMroQOZGDK_5jEQC-rZ3Gr32QH0Y",
    authDomain: "umbrellabby15.firebaseapp.com",
    projectId: "umbrellabby15",
    storageBucket: "umbrellabby15.appspot.com",
    messagingSenderId: "643699438575",
    appId: "1:643699438575:web:26f5b88174d6754d84fc1a",
    measurementId: "G-KG4P6PGBTS"
  };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();