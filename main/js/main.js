function populate(){
firebase.auth().onAuthStateChanged(user => {
    var usersDBRef = db.collection("users");
    currentUser = db.collection("users").doc(user.uid)//current user doc reference
    currentUser.get().then(userDoc => {//fetches currUser group ID
            currentUserData = userDoc.data();//use for reference current user document

            let query = usersDBRef.where("groupID", "==", currentUserData.groupID);//currUser ID as reference for query against users collection
            if (user) {
                query.get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            document.querySelector(".um-h3").innerHTML = doc.data().name;
                            if (doc.data().owner = true){
                                document.querySelector(".user-host")
                            }
                            document.querySelector(".progress-bar").setAttribute()







            //  let CardTemplate = document.getElementById("CardTemplate");
            // bookmarks.forEach(thisHikeID => {
            //     console.log(thisHikeID);
            //     db.collection("Hikes").where("id", "==", thisHikeID).get().then(querySnapshot => {
            //         size = querySnapshot.size;
            //         queryData = querySnapshot.docs;
                    
            //         if (size == 1) {
            //             var doc = queryData[0].data();
            //             var userName = doc.name; //gets the name field
            //             var userLat = doc.userLat; //gets the unique ID field
            //             var userLong = doc.length; //gets the length field
            //             let newCard = CardTemplate.content.cloneNode(true);
            //             newCard.querySelector('.card-title').innerHTML = hikeName;
            //             newCard.querySelector('.card-length').innerHTML = hikeLength;
            //             newCard.querySelector('a').onclick = () => setHikeData(hikeID);
            //             newCard.querySelector('img').src = `./images/${hikeID}.jpg`;
            //             hikeCardGroup.appendChild(newCard);
            //         } else {
            //             console.log("Query has more than one data")
            //         }
            //     })
            // })

                            console.log(doc.id, " => ", doc.data());//prints doc console
                            console.log("current user ID " + currentUserData.groupID)
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