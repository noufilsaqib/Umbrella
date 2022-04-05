let inputGroupName;
let inputRadius;
let inputMeetLong;
let inputMeetLat;
let joinCode;

// Generates a random 5-digit number for groupID
var idRandomizer = (Math.floor(Math.random() * 100000) + 100000).toString().substring(1);

// Saves the values added in the from inputs
function saveValues() {
    if (document.getElementById("groupName").value != null) {
        inputGroupName = document.getElementById("groupName").value;
    }

    if (document.getElementById("radius").value != null) {
        inputRadius = document.getElementById("radius").value;
    }

    if (document.getElementById("meetLong").value != null) {
        inputMeetLong = document.getElementById("meetLong").value;
    }

    if (document.getElementById("meetLat").value != null) {
        inputMeetLat = document.getElementById("meetLat").value;
    }

    if (document.getElementById("joinCode").value.length == 0) {
        document.getElementById("joinCode").value = idRandomizer;
        joinCode = document.getElementById("joinCode").value;
    }
}

// Creates a group in the database and updates the host user's groupID 
function createGroup() { 
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("groups")
            .add({
                groupID: joinCode,
                groupName: inputGroupName,
                radius: inputRadius,
                meetLong: inputMeetLong,
                meetLat: inputMeetLat
            })
            .then(() => {
                db.collection("users").doc(user.uid)
                .update({
                    groupID: joinCode,
                    isHost: true
                }).then(() => {
                    console.log('Group ID added to user')
                    window.location.assign("../main/");
                })
            })
        } else {
            console.log('Unable to create a group')
        }
    });
}