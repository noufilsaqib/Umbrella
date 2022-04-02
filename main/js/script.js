let startTime;
let currentTime;

$(".um-btn-sos").mouseup(function () {
    clearTimeout(pressTimer)
    // currentTime = new Date();
    // if (currentTime - startTime >= 1000) {
    saveUserStatus();
    // backTosafe();
    // $("#umModal").modal('show');

    // }
    return false;
}).mousedown(function () {
    // startTime = new Date();
    pressTimer = window.setTimeout(function () {
        // Add code here
        // saveUserStatus();
        $("#umModal").modal('show');
    }, 2500)
    return false;
});





function saveUserStatus() {

    document.getElementById('isSafe').value == true;
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //write/update database
            currentUser.update({
                    isSafe: false,
                })
                .then(() => {
                    // console.log("Document successfully updated!");
                    $("#umModal").modal('hide');
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
            // console.log(user.uid); // let me to know who is the user that logged in to get the UID
            //console.log(user.isSafe);
            userQuery = db.collection("users").doc(user.uid);

            userQuery.get()
                .then(userDoc => {
                    groupQuery = db.collection("users").where("isSafe", "==", false); // will to to the firestore and go to the document of the user
                    groupQuery.get()
                        .then(groupSnapshot => {
                            groupSnapshot.forEach(userDoc => {
                                user_Name = userDoc.data().name;
                                // console.log(user_Name);
                                $("#name-goes-here").text(user_Name); //jquery
                            })
                        })

                    if ((user_Name.length > 0) && (userDoc.data().isSafe)) {
                        $('#SampleModal').modal('show');
                    } else {
                        $('#SampleModal').modal('hide');
                        // console.log(user_Name + " is unSafe.");
                    }
                })

        }

    })
    /*
    get multiple unsafe users into a list
    if list.size()>0
        display a list to the popup 
        exclude current userName from the list
    Change the popup design to get more attention

    */


}

var intervalID = window.setInterval(function () {
    databaseScanSafe();
}, 10000);


// function closethePopup() {
//     let disabler = document.getElementById("btn um-btn-secondary");
//     disabler.style.display = disabler.style.display ? '' : 'none';
//     $('#SampleModal').modal('hide');

//     document.getElementById("halt").addEventListener("click", haltFunction);

//     function haltFunction() {
//         clearInterval(timeValue);
//     }

// }