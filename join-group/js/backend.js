// Lets a user join a group using the groupID
function joinGroup() {
    let inputGroupID = document.getElementById("inputJoinCode").value

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if (inputGroupID) {
                db.collection("groups")
                .where("groupID", "==", inputGroupID)
                .get()
                .then((doc) => {
                    if (!doc.empty) {
                        doc.forEach((data) => {
                            db.collection("users").doc(user.uid)
                            .update({
                                groupID: inputGroupID,
                            })
                            .then(function () {
                                console.log("User has joined the '" + data.data().groupName + "' group")
                                window.location.assign("../main/");
                            })
                        })
                    } else {
                        alert("Invalid Code");
                    }
                })
            }
        }
    })
}