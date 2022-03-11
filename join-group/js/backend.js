    
    setInterval(getLocation, 5000);//geolocation interval 5 secs

    //this updates geolocation of user writes into database
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("groups").doc(user.uid).update({
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
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
  }