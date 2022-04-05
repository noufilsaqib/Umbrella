// Form Validation: Full Name Validation
function checkUserFullName() {
    var userFullName = document.getElementById("userFullName").value;
    var error = false;

    if (userFullName === "") {
        error = true;
    }

    if (error) {
        document.getElementById("userFullNameError").style.opacity = "1";
    } else {
        document.getElementById("userFullNameError").style.opacity = "0";
    }
}

// Form Validation: Phone Number Validation
function checkUserPhone() {
    var userPhone = document.getElementById("userPhone").value;
    var error = false;

    if (userPhone === "") {
        error = true;
    }

    if (error) {
        document.getElementById("userPhoneError").style.opacity = "1";
    } else {
        document.getElementById("userPhoneError").style.opacity = "0";
    }
}

// Form Validation: Email Validation
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var error;

    if (userEmail.value.match(userEmailFormat)) {
        error = false;
    } else {
        error = true;
    }

    if (error) {
        document.getElementById("userEmailError").style.opacity = "1";
    } else {
        document.getElementById("userEmailError").style.opacity = "0";
    }
}

// Form Validation: Password Validation
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var error;

    if (userPassword.value.match(userPasswordFormat)) {
        error = false;
    } else {
        error = true;
    } 

    if (error) {
        document.getElementById("userPasswordError").style.opacity = "1";
    } else {
        document.getElementById("userPasswordError").style.opacity = "0";
    }
}

// Sign Up: Create user and add to database
function signUp(){
    var userFullName = document.getElementById("userFullName").value;
    var userPhone = document.getElementById("userPhone").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;

    var userFullNameFormat = /^([A-Za-z.\s_-])/;    
    var userPhoneFormat = /^([0-9])/;   
    var userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserFullNameValid = userFullName.match(userFullNameFormat);
    var checkUserPhoneValid = userPhone.match(userPhoneFormat);
    var checkUserEmailValid = userEmail.match(userEmailFormat);
    var checkUserPasswordValid = userPassword.match(userPasswordFormat);

    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (checkUserPhoneValid == null) {
        return checkUserPhone();
    } else if (checkUserEmailValid == null) {
        console.log("Sign up with a new account")
        return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
            db.collection('users').doc(firebase.auth().currentUser.uid)
            .set({
                name: userFullName,
                phone: userPhone,
                email: userEmail,
                userLong: null,
                userLat: null,
                groupID: null,
                isHost: false,
                isSafe: true,
                distMeet: null,
            })
            .then(function () {
                console.log('New user added to firestore');
                window.location.assign("../home/");
            })
            .catch(error => {
                console.log('User was not added to firestore');
            })
        })
        .catch(error => {
            console.log('Signup did not work')
        })
    }
}

// Sign In: If user exists in database then log in
function signIn(){
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
 
    var userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userEmail.match(userEmailFormat);
    var checkUserPasswordValid = userPassword.match(userPasswordFormat);

    if (checkUserEmailValid == null) {
        return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
        .then(function () {
            console.log('Sign in worked');
            window.location.assign("../home/");
        })
        .catch(error => {
            alert('Invalid login information. Please try again!')
            console.log('User does not exist')
        })
    }
}

// Populate Account: Populate user's info from database onto the page
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid);
        db.collection("users").doc(user.uid)
        .get()
        .then(function (doc) {
            var userFullName = doc.data().name;
            console.log(userFullName);
            var userPhone = doc.data().phone;
            console.log(userPhone);
            var userEmail = doc.data().email;
            console.log(userEmail);
            
            document.getElementById("userAccTitle").innerText = userFullName;
            document.getElementById("userFullName").value = userFullName;
            document.getElementById("userPhone").value = userPhone;
            document.getElementById("userEmail").value = userEmail;
        })
    } else {
        console.log("No user is signed in")
    }
});

// Update Account: Change user's information and update it on database
function updateAccount(){
    var userFullName = document.getElementById("userFullName").value;
    var userPhone = document.getElementById("userPhone").value;
    var userEmail = document.getElementById("userEmail").value;

    const user = firebase.auth().currentUser;

    db.collection('users').doc(firebase.auth().currentUser.uid)
    .update({
        name: userFullName,
        phone: userPhone,
        email: userEmail,
    }).then(() => {
        console.log('User information update was successful')
        location.reload();
    }).catch((error) => {
        console.log('User information update was unsuccessful')
    });
}

// Sign Out
function signOut(){
    firebase.auth().signOut().then(() => {
        window.location.assign("../");
    }).catch((error) => {
        console.log('Unable to sign out')
    });
}