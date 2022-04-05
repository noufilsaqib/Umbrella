function groupPopulate() {
    firebase.auth().onAuthStateChanged(user => {
        let usersCol = db.collection("users");
        let groupsCol = db.collection("groups");
        let hostDist;

        usersCol.doc(user.uid)
        .get()
        .then(userDoc => {
            currGroup = groupsCol.where("groupID", "==", userDoc.data().groupID);

            currGroup.get()
            .then((groupDoc) => {
                groupDoc.forEach((doc) => {
                    document.querySelector(".um-title").innerText = doc.data().groupName;
                })
            })

            let queryUser = usersCol.where("groupID", "==", userDoc.data().groupID);

            let totalMembers = document.getElementById("totalMembers");
            let size;

            if (user) {
                queryUser.get()
                .then((querySnapshot) => {
                    size = querySnapshot.size;
                    totalMembers.innerHTML = size + " members";

                    querySnapshot.forEach((doc) => {
                        let cardTemplate = document.getElementById("card-template");
                        let userCard = document.querySelector(".um-users")
                        let newCard = cardTemplate.content.cloneNode(true);
                        let phoneNo = doc.data().phone;
                        let userName = doc.data().name;

                        newCard.querySelector(".um-h3").innerHTML = userName + "<span class='user-host'>HOST</span>";

                        if (doc.data().isHost == true) {
                            newCard.querySelector(".user-host").style.opacity = "1";
                        }

                        newCard.querySelector(".progress-bar").style.width = "10%";
                        newCard.querySelector(".progress-bar").innerText = "10" + "m";
                        newCard.querySelector(".progress-bar").style.ariaValueNow = "10";

                        newCard.querySelector("#userPhoneButton").href = "tel:" + phoneNo;

                        userCard.appendChild(newCard);
                    });
                })
            }
        })
        .catch((error) => {
            console.log("The group users were not able to populate on this page");
        })
    })
}

groupPopulate();

function saveUserSafeStatus() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid)
            .update({
                isSafe: false,
            })
            .then(() => {
                console.log("Your status is now unsafe!");
            })
        }
    })
}

function checkDBForUnsafeUser() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid)
            .get()
            .then(userDoc => {
                userName = "";

                db.collection("users").where("isSafe", "==", false)
                .get()
                .then(groupSnapshot => {
                    groupSnapshot.forEach(userDoc => {
                        userName = userDoc.data().name;
                        $("#notSafeUser").text(userName);
                    })

                    if ((userName.length > 0) && (userDoc.data().isSafe)) {
                        $('#umOtherModal').modal('show');
                        console.log(userName + " is unsafe.");
                        userName = "";
                    } else {
                        $('#umOtherModal').modal('hide');
                    }
                })

            })

        }

    })

}

var intervalID = window.setInterval(function () {
    checkDBForUnsafeUser();
}, 3000);

function updateUserSafe(userID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(userID)
            .update({
                isSafe: true,
            })
            .then(() => {
                console.log("Your status is now safe!");
            })
        }
    })
}

function updateAllSafe() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid)
            .get()
            .then(userDoc => {
                db.collection("users").where("isSafe", "==", false)
                .get()
                .then(groupSnapshot => {
                    groupSnapshot.forEach(userDoc => {
                        userName = userDoc.data().name;
                        updateUserSafe(userDoc.id);
                    })
                })
            })
        }
    })
}