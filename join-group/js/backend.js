// Create a reference to the  collection



//References current user to inputed partyID in db
function join() {
  let inputPartyID = document.getElementById("joinInput").value
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Create a query against the collection.
      let groupsRef = db.collection("groups");

      if (inputPartyID) {
        let query = groupsRef.where("partyID", "==", inputPartyID);//queries if there is a matching value. returns values
        query.get()//gets the values of matching keys and gets value
          .then((querySnapshot) => {//creates the snapshot 
            if (!querySnapshot.empty) {//if not empty
              querySnapshot.forEach((data) => {
                console.log(data.data());
                db.collection("users").doc(user.uid).update({
                  partyID: inputPartyID //changes user partyID to same as group
                })
                alert("You have joined the " + inputPartyID.toUpperCase() + " -Party")
                // window.location = "../main_Dummy.html";
              })
            } else {
              alert("No matching Party ID");
            }
          })
      }
    }
  })
}
