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
        // create a collection with name "users"
        db.collection("users")
          //define a document for a user with UID as a document ID
          .doc(user.uid).set({
            groupID:(Math.floor(Math.random() * 10000) + 10000).toString().substring(1),//auto 4 digit ID
            name: user.displayName,
            email: user.email,
            number: null,
            userX:null,
            userY:null,
            partyID:null
            
          }).then(function () {
            console.log("New user added to firestore");
            window.location.assign("index.html","./create-group/index.html");
          })
          .catch(function (error) {
            console.log(error);
          })

      } else {
        return true;
      }
      return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
     // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);