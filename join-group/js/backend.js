// Create a reference to the  collection



//References current user to inputed partyID in db
function join() {
  let inputGroupID = document.getElementById("joinInput").value
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Create a query against the collection.
      let groupsRef = db.collection("groups");

      //matches text field to see if there is a matching group with group ID 
      if (inputGroupID) {
        let query = groupsRef.where("groupID", "==", inputGroupID);//queries if there is a matching value. returns values
        query.get()//gets the values of matching keys and gets value
          .then((querySnapshot) => {//creates the snapshot 
            if (!querySnapshot.empty) {//if not empty
              querySnapshot.forEach((data) => {
                console.log(data.data());
                let newParty = data.data().partyID;//looks at snapshot document and returns partyID property from the group doc
                db.collection("users").doc(user.uid).update({
                  groupID: inputGroupID, //changes user groupID to same as party
                  partyID: newParty//looks at data.data() referenced group document and updates current user partyID to match 
                })
                alert("You have joined the " + inputGroupID.toUpperCase() + " -Party")
                console.log(newParty);
                window.location = "../main_Dummy.html";
              })
            } else {
              alert("No matching Party ID");
            }
          })
      }
    }
  })
}
