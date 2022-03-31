$(".um-btn-sos").mouseup(function () {
    clearTimeout(pressTimer)
    return false;
}).mousedown(function () {
    pressTimer = window.setTimeout(function () {
        // Add code here

        saveUserStatus();
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
                    console.log("Document successfully updated!");
                    // saveStatus.innerHTML = "Successfully Upload To DataBase";
                })
        }
    })
}