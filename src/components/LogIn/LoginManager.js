import firebaseConfig from "../../firebase.config";
import firebase from "firebase/app";
import "firebase/auth";

export const initilizeLogInFrameWork = ()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { email, displayName, emailVerified, photoURL } = res.user
        const logedInUser = {
          isLogedIn: true,
          email: email,
          name: displayName,
          emailStutus: emailVerified,
          photo: photoURL,
        }
        return logedInUser 
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  export const handleFacebook = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then((result) => {
        // /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var accessToken = credential.accessToken;
        var user = result.user;
        user.success = true;
        return user
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const oUTuser = {
          isLogedIn: false,
          email: "",
          name: '',
          emailStutus: '',
          photo: '',
          error: '',
          success: false
        }
        return oUTuser 
      })
      .catch((error) => {
        const newUserInfo = error.message
        newUserInfo.error = error.message
        newUserInfo.success = false;
        return newUserInfo
      });
  }

  export const createUserWithEmailAndPassword = (name, email, password)=>{
   return firebase.auth().createUserWithEmailAndPassword(name,email,password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = ''
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo
    })
    .catch((error) => {
      const newUserInfo = error.message
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo
    });
  }

  export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user
      newUserInfo.error = ''
      newUserInfo.success = true;
      return newUserInfo

    })
    .catch((error) => {
      const newUserInfo ={};
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo
    });
  }

 const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        })
          .then(function () {
            console.log("user name updated successfully")
          })
          .catch(function (error) {
            console.log(error);
          });
      }
  