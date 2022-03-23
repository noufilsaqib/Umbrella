
//inserts partyID from db 
function readGrp() {
    firebase.auth().onAuthStateChanged(user =>{
        if (user){ 
        currentUser = db.collection("users").doc(user.uid)
        currentUser.get().then(userDoc=>{
            let pID = userDoc.data().partyID;
               return document.getElementById("myParty").innerHTML = pID.toUpperCase() + " - Party";
           })  
        }
    })
}
readGrp();

function populateCardsDynamically() {
    let userCardTemplate = document.getElementById("userCardTemplate");
    let userCardGroup = document.getElementById("userCardGroup");
    
    db.collection("users")
    .get()
        .then(allUsers => { 
            allUsers.forEach(doc => {
                //reads user database
                var userName = doc.data().name;
                let userLat = doc.data().userLat; 
                let userLong = doc.data().userLong; 
                let testUserCard = userCardTemplate.content.cloneNode(true);
                testUserCard.querySelector('.card-text').innerHTML = userName;
                // testUserCard.querySelector('img').src = `./images/${profileID}.jpg`; //inputs profile image
                userCardGroup.appendChild(testUserCard);
                console.log("Lat:" + userLat + "\nLong:" + userLong)
            })

        })
}
populateCardsDynamically();



//Writes New user Lat/Long in db intervals
setInterval(getLocation, 5000);//geolocation interval 5 secs
//this updates geolocation of user writes into database
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        db.collection("users").doc(user.uid).update({
           //updates the geolocation
           userLong:coords.longitude,
           userLat:coords.latitude
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
    }
});


//geolocation function
function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else { 
 alert ("Geolocation is not supported by this browser.");
}
}
var userDistRelative = getElementById("card-num").innerHTML
function showPosition(position) {

}



//reading Function
// function read() {
//     firebase.auth().onAuthStateChanged(user =>{
//         if (user){ 
//         currentUser = db.collection("users").doc(user.uid)
//         currentUser.get().then(userDoc=>{
//             let value = userDoc.data().keyname;//replace ".keyname" with a key in db like name, userLong, or partyID.
//                console.log()
//                return value;
//            })  
//         }
//     })
// }
// read();



