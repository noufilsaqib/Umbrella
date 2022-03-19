let inputPartyID;
let inputRadius;
let inputMeetLong;
let inputMeetLat;

function setter() {
    if (document.getElementById("partyID").value != null) {
        inputPartyID = document.getElementById("partyID").value;
        console.log(inputPartyID);
    }
    if (document.getElementById("radius").value != null) {
        inputRadius = document.getElementById("radius").value;
        console.log(inputRadius);
    }
    if (document.getElementById("meetLong").value != null) {
        inputMeetLong = document.getElementById("meetLong").value;
        console.log(inputMeetLong);
    }
    if (document.getElementById("partyID").value != null) {
        inputMeetLat = document.getElementById("meetLat").value;
        console.log(inputMeetLat);
    }
    if (document.getElementById("shareCode").value.length == 0)
        document.getElementById("shareCode").value = inputPartyID;
    console.log(inputPartyID);
}

firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
        var currentUser = db.collection("users").doc(user.uid)
        //go to the correct user document by referencing to the user uid
        console.log(currentUser)
        //if the data fields are not empty, then write them in to the form.

    } else {
        // No user is signed in.
        console.log("No user is signed in");
    }
});

function submit() { //on click the database will create a new party collection
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
                db.collection("groups").add({
                    groupID:(Math.floor(Math.random() * 100000) + 100000).toString().substring(1),//auto 5 digit ID
                    partyID: inputPartyID,
                    radius: inputRadius,
                    meetLong: inputMeetLong,
                    meetLat: inputMeetLat
            
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
        }
    });
}

