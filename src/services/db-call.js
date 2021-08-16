import firebase from 'firebase';
import 'firebase/firestore';

async function signInUser(email, password) {
    const userInfo = firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
            if (error.code === 'auth/wrong-password') {
                return 'Incorrect password. Please try again';
            } else if (error.code === 'auth/invalid-email') {
                return 'Invalid Email';
            } else if (error.code === 'auth/user-not-found') {
                return 'Username not found. Please try again.';
            } else {
                return error;
            }
        });
    if (email != 'pauleastondevteam@gmail.com') {
        alert('You are not authorized');
        return;
    }
    return userInfo;
}

function userIsSignedIn() {
    let user = firebase.auth().currentUser;
    if (user) {
        return true;
    } else {
        return false;
    }
}

export {signInUser, userIsSignedIn};
