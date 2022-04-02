var distance = document.getElementById("distance");
var userLong = document.getElementById("userLong");
var userLat = document.getElementById("userLat");

var geolocationID;
var curLong;
var curLat;
var distanceToTheHost;
var meet_long;
var meet_lat
// var options;

options = {
    enableHighAccuracy: true
};


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        geolocationID = navigator.geolocation.watchPosition(getDistanceToHost, error, options);

    } else {
        distance.innerHTML = "Geolocation is not supported by this browser.";
        userLat.innerHTML = "Geolocation is not supported by this browser.";
        userLong.innerHTML = "Geolocation is not supported by this browser.";
    }
}

getLocation();

//Update to the database each 10 seccond

// myInterval = setInterval(getLocation, 10000);

function showPosition(position) {

    curLong = position.coords.longitude;
    curLat = position.coords.latitude;
    userLat.value = curLat;
    userLong.value = curLong;
}


function insertLongAndLatMeet() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // console.log(user.uid); // let me to know who is the user that logged in to get the UID
            // console.log(user.groupID);
            userQuery = db.collection("users").doc(user.uid);

            userQuery.get()
                .then(userDoc => {
                    groupID = userDoc.data().groupID;

                    groupQuery = db.collection("groups").where("groupID", "==", groupID); // will to to the firestore and go to the document of the user
                    groupQuery.get()
                        .then(groupSnapshot => {
                            groupSnapshot.forEach(group => {
                                let group_lat = group.data().meetLat;
                                let group_long = group.data().meetLong;
                                setGlobalLatLong(group_lat, group_long);
                                console.table({
                                    meet_lat,
                                    meet_long
                                })
                            })
                        })
                })
        }
    })
}
insertLongAndLatMeet();

function setGlobalLatLong(lat, long) {
    meet_lat = lat;
    meet_long = long;
}

// calculate distance in km
function getDistanceInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distanceToTheHost = R * c; // Distance in km
    return distanceToTheHost;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function stopTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.clearWatch(geolocationID);
        distance.innerHTML = "";
    } else {
        distance.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getDistanceToHost(position) {
    //Download meeting destination
    var hostLatitude = parseInt(meet_lat);
    var hostLongtitude = parseInt(meet_long);

    // console.log(hostLatitude, hostLongtitude);
    // console.log(position)
    var dist = getDistanceInKm(position.coords.latitude, position.coords.longitude, hostLatitude, hostLongtitude);
    distance.innerHTML = "Distance to Host: " + dist.toPrecision(3) + " km";
    //upload to database
    uploadToDataBase();
}
// getDistanceToHost();

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

function uploadToDataBase() {
    longitude = document.getElementById('userLong').value;
    latitude = document.getElementById('userLat').value;
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            //write/update database
            currentUser.update({
                    userLat: longitude,
                    userLong: latitude,
                    distHost: distanceToTheHost,
                })
                .then(() => {
                    // console.log("Document successfully updated!");
                    uploadToDataBaseStatus.innerHTML = "Successfully Upload To DataBase";
                })
        }
    })
}
uploadToDataBase();


//MAKES Lat/Long values to address
// function getReverseGeocodingData(lat, lng) {
//     var latlng = new google.maps.LatLng(lat, lng);
//     // This is making the Geocode request
//     var geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ 'latLng': latlng },  (results, status) =>{
//         if (status !== google.maps.GeocoderStatus.OK) {
//             alert(status);
//         }
//         // This is checking to see if the Geoeode Status is OK before proceeding
//         if (status == google.maps.GeocoderStatus.OK) {
//             console.log(results);//place id/innerHTML here
//             var address = (results[0].formatted_address);
//         }
//     });
// }