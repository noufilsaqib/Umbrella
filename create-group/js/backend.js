let inputPartyID;
let inputRadius;
let inputMeetLong;
let inputMeetLat;
let inputGroupName;
var idRandomizer = (Math.floor(Math.random() * 100000) + 100000).toString().substring(1) //auto 5 digit ID

function setter() {
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
    if (document.getElementById("shareCode").value.length == 0)
        document.getElementById("shareCode").value = idRandomizer;
}


function submit() { //on click the database will create a new party collection
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("groups").add({
                    groupID: idRandomizer,
                    groupName: inputGroupName,
                    radius: inputRadius,
                    meetLong: inputMeetLong,
                    meetLat: inputMeetLat

                })
                .then(() => {

                    db.collection("users").doc(user.uid).update({
                        groupID: idRandomizer,
                        owner: true
                    })
                    // window.location = "../main/index.html";
                })
            alert("Document successfully updated!");
        } else {
            alert("Please enter all feilds!");
        }
    });
}