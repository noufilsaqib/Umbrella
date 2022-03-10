var currentUser //put this right after you start script tag before writing any functions.
var user = authResult.user;
let groupRef = currentUser.groupID //references user groupID from host
let inputPartyID = document.getElementById('partyID').value;
let inputRadius = document.getElementById('radius').value;
let inputMeetingX = document.getElementById('meetingX').value;
let inputMeetingY = document.getElementById('partyID').value;
getElementById("submit").onclick.console.log(groupRef + inputPartyID);
firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
        //go to the correct user document by referencing to the user uid
        currentUser = db.collection("users").doc(user.uid)
        //get the document for current user.
        console.log(currentUser)
        document.getElementById("submit").addEventListener("click", submit);

        function submit() { //on click the database will create a new party collection
            document.getElementById("next").onclick.db.collection("groups")
            .doc(user.uid).set({
                    groupID: groupRef, //sets party ID
                    partyID: inputPartyID,
                    radius: inputRadius,
                    meetingX: inputMeetingX,
                    meetinY: inputMeetingY
                })
        }
    } else {
        // No user is signed in.
        console.log("No user is signed in");
    }
});