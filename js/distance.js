var userLong = document.getElementById("userLong");
var userLat = document.getElementById("userLat");
var distance = document.getElementById("distance");

var geolocationID;
var distanceToMeet;
var meet_long;
var meet_lat;

options = {
    enableHighAccuracy: true
};

// Using HTML Geolocation, gets user's longitude and latitude
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        geolocationID = navigator.geolocation.watchPosition(getDistanceToMeet, error, options);
    } else {
        userLong.innerHTML = "Geolocation is not supported by this browser.";
        userLat.innerHTML = "Geolocation is not supported by this browser.";
        distance.innerHTML = "Geolocation is not supported by this browser.";
    }
}

getLocation();

function showPosition(position) {
    userLong.value = position.coords.longitude;
    userLat.value = position.coords.latitude;
}

// Accesses meeting point latitude and longitude from database
function getLongLatMeet() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid)
            .get()
            .then(userDoc => {
                groupID = userDoc.data().groupID;

                db.collection("groups").where("groupID", "==", groupID)
                .get()
                .then(groupSnapshot => {
                    groupSnapshot.forEach(group => {
                        let groupLat = group.data().meetLat;
                        let groupLong = group.data().meetLong;

                        setLatLongMeet(groupLat, groupLong);
                    })
                })
            })
        }
    })
}

getLongLatMeet();

// Saves the meeting point longitude and latitude
function setLatLongMeet(lat, long) {
    meet_lat = lat;
    meet_long = long;
}

// Calculates the distance between user and meeting point in km
function getDistanceInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; 
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distanceToMeet = R * c; 
    return distanceToMeet;
}

// Converts degree to radian
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

// Stops the geolocation tracking
function stopTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.clearWatch(geolocationID);
        distance.innerHTML = "";
    } else {
        distance.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Shows the distance between user and meeting point on website
function getDistanceToMeet(position) {
    var meetLatitude = parseInt(meet_lat);
    var meetLongtitude = parseInt(meet_long);
    var dist = getDistanceInKm(position.coords.latitude, position.coords.longitude, meetLatitude, meetLongtitude);

    distance.innerHTML = "Distance to Meeting Point: " + dist.toPrecision(3) + " km";
    uploadToDataBase();
}

// Shows error is Geolocation doesn't work
function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

// Uploads the user's latitude, longitude, and distance to the databse
function uploadToDataBase() {
    longitude = document.getElementById('userLong').value;
    latitude = document.getElementById('userLat').value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid)
            .update({
                userLong: longitude,
                userLat: latitude,
                distMeet: distanceToMeet,
            })
            .then(() => {
                console.log("User coordinates and distance to meeting point is successfully uploaded to the database")
            })
        }
    })
}

uploadToDataBase();