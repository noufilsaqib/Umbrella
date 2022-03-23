// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      var user = authResult.user; //get the user object info
      if (authResult.additionalUserInfo.isNewUser) {
        // create a collection with name "group"
        db.collection("users")
          //define a document for a user with UID as a document ID
          .doc(user.uid).set({
            groupID: null,
            name: user.displayName,
            email: user.email,
            number: null,
            userLong: null,
            userLat: null,
            partyID: null,
            owner: false,
            userProx: null,
            isSafe: true,

          }).then(function () {
            console.log("New user added to firestore");
            // window.location.assign("/distance/distance.html");
            window.location.assign("index.html");
          })
          .catch(function (error) {
            console.log(error);
          })

      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  // signInSuccessUrl: '/distance/distance.html',
  signInSuccessUrl: 'index.html',
  signInOptions: [
  //providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,

  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);