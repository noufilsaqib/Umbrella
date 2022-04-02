var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);
        // the following functions are always called when someone is logged in
        insertName();
    } else {
        // No user is signed in.
        // console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function insertName() {
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
                                let user_Name = userDoc.data().name;
                                // console.log(user_Name);
                                $("#name-goes-here").text(user_Name); //jquery
                            })
                        })
                })
        }
    })
}




$(document).ready(function () {
    $("#btnShow").click(function () {
        $('#SampleModal').modal('show');
    });
});