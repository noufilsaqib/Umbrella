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