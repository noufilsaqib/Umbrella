//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyD8C27PMroQOZGDK_5jEQC-rZ3Gr32QH0Y",
  authDomain: "umbrellabby15.firebaseapp.com",
  databaseURL: "https://umbrellabby15-default-rtdb.firebaseio.com",
  projectId: "umbrellabby15",
  storageBucket: "umbrellabby15.appspot.com",
  messagingSenderId: "643699438575",
  appId: "1:643699438575:web:26f5b88174d6754d84fc1a",
  measurementId: "G-KG4P6PGBTS"

  // apiKey: "AIzaSyC32YHd01Oxua_4NteQRPhPAtph9KjUxR8",
  // authDomain: "ymbasda.firebaseapp.com",
  // projectId: "ymbasda",
  // storageBucket: "ymbasda.appspot.com",
  // messagingSenderId: "1041736722918",
  // appId: "1:1041736722918:web:c9ad05a06305add0410e27"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------