function populate() {
    firebase.auth().onAuthStateChanged(user => {
        let usersDBRef = db.collection("users");
        let groupsDBRef = db.collection("groups");
        let groupNameTag = document.querySelector(".um-title")
        let hostDist; // be colored part of progress bar where (hostDist/Radius) x 100%

        currentUser = usersDBRef.doc(user.uid) //current user doc reference
        currentUser.get().then(userDoc => { //fetches currUser group ID
                currentUserData = userDoc.data(); //use for reference current user document
                //references from group document by ID.
                function updateG() {
                    currentGroup = groupsDBRef.where("groupID", "==", currentUserData.groupID);
                    currentGroup.get()
                        .then((groupDoc) => {
                            groupDoc.forEach((doc) => {
                                //use doc.data*() to reference key value pair in DB
                                document.querySelector(".um-title").innerText = doc.data().groupName;
                                // hostDist =
                            })
                        })
                }
                updateG();


                let queryUser = usersDBRef.where("groupID", "==", currentUserData.groupID); //currUser ID as reference for query against users collection
                if (user) {
                    queryUser.get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                let cardTemplate = document.getElementById("card-template");
                                let newCard = cardTemplate.content.cloneNode(true);

                                //variables for database values
                                number = doc.data().number;
                                userCard = document.querySelector(".um-users")
                                let userName = doc.data().name; //gets the name field
                                //Card user name 
                                newCard.querySelector(".um-h3").innerHTML = userName + "<span class='user-host'>HOST</span>";



                                //See if user is owner

                                console.log(doc.data().owner)
                                if (doc.data().owner == true) {
                                    newCard.querySelector(".user-host").style.opacity = "1";
                                }

                                //distance to host wherein %


                                //Progress bar filler where width = (distHost / radius)from database
                                newCard.querySelector(".progress-bar").style.width = "10%";
                                newCard.querySelector(".progress-bar").innerText = "10" + "m";
                                newCard.querySelector(".progress-bar").style.ariaValueNow = "10";

                                //gets and replace phone number
                                newCard.querySelector("#userPhoneButton").href = "tel:" + number;



                                // var userLat = doc.data().userLat; //gets the unique ID field
                                // var userLong = doc.data().userLong; //gets the length field

                                // //CardTemplate Cloner
                                userCard.appendChild(newCard);

                                //debug
                                console.log(doc.data().name + " " + document.querySelector(".user-buttons").firstChild.href);
                                console.log(doc.data().name, " => ", doc.data()); //prints doc console
                            });
                        })
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    })
}
populate();

function databaseScanSafe() {
    let user_Name = "";

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

    if (user_Name.length > 0 && (user.isSafe == true)) {
        $('#SampleModal').modal('show');
    }
}

var intervalId = setInterval(function () {
    databaseScanSafe()
}, 2000);