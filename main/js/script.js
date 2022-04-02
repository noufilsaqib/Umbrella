let startTime;
let currentTime;

$(".um-btn-sos").mouseup(function () {
    clearTimeout(pressTimer)
    // currentTime = new Date();
    // if (currentTime - startTime >= 1000) {
    //saveUserStatus();
    // backTosafe();
    // $("#umModal").modal('show');

    // }
    return false;
}).mousedown(function () {
    // startTime = new Date();
    pressTimer = window.setTimeout(function () {
        // Add code here
        saveUserStatus();
        $("#umModal").modal('show');
    }, 2500)
    return false;
});



function saveUserStatus() {

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //write/update database
            currentUser.update({
                    isSafe: false,
                })
                .then(() => {
                    console.log("Change to unsafe status successfully updated!");
                    // saveStatus.innerHTML = "Successfully Upload To DataBase";
                })
        }
    })
}





function databaseScanSafe() {
    // Get list of unsafe users        
    // to check if the user is logged in:

    firebase.auth().onAuthStateChanged(user => {

        if (user) {
            console.log("current login " + user.uid); // let me to know who is the user that logged in to get the UID
            //console.log(user.isSafe);
            userQuery = db.collection("users").doc(user.uid);
            userQuery.get()
                .then(userDoc => {
                    user_Name = "";
                    groupQuery = db.collection("users").where("isSafe", "==", false); // will to to the firestore and go to the document of the user

                    groupQuery.get()
                        .then(groupSnapshot => {
                            groupSnapshot.forEach(userDoc => {
                                user_Name = userDoc.data().name;
                                console.log(user_Name + "DB is unsafe");
                                $("#name-goes-here").text(user_Name); //jquery
                            })

                            if ((user_Name.length > 0) && (userDoc.data().isSafe)) {
                                $('#SampleModal').modal('show');
                                console.log(user_Name + " is unSafe.");
                                user_Name = "";
                            } else {
                                $('#SampleModal').modal('hide');
                                // console.log(user_Name + " is unSafe.");
                            }
                        })

                })

        }

    })

}

var intervalID = window.setInterval(function () {
    databaseScanSafe();
}, 5000);

function markUserSafe(userID) {
    // userID = "ofcqJkd602P36N4ifI6SUXxG4Fq1"
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            unSafeUser = db.collection("users").doc(userID);
            console.log(unSafeUser.uid); // let me to know who is the user that logged in to get the UID

            //write/update database
            unSafeUser.update({
                    isSafe: true,
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
        }
    })
}




function markAllSafe() {
    // Get list of unsafe users        
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("current login " + user.uid); // let me to know who is the user that logged in to get the UID
            //console.log(user.isSafe);
            userQuery = db.collection("users").doc(user.uid);

            userQuery.get()
                .then(userDoc => {
                    groupQuery = db.collection("users").where("isSafe", "==", false); // will to to the firestore and go to the document of the user
                    groupQuery.get()
                        .then(groupSnapshot => {
                            groupSnapshot.forEach(userDoc => {
                                user_Name = userDoc.data().name;
                                console.log(user_Name + " is unsafe. Mark safe");
                                console.log(userDoc);
                                console.log(userDoc.id);
                                markUserSafe(userDoc.id);
                            })
                        })
                })

        }

    })

}