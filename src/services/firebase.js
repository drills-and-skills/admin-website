import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAl0OlBwh8zq9r7uZvO2yX4o_b5emaoSNI',
    authDomain: 'drills-and-skills.firebaseapp.com',
    databaseURL: 'https://drills-and-skills.firebaseio.com',
    projectId: 'drills-and-skills',
    storageBucket: 'drills-and-skills.appspot.com',
    messagingSenderId: '895814479195',
    appId: '1:895814479195:web:2f018ffed2d1a9d86e7e7e',
    measurementId: 'G-7P4CJ5PEWR',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();

export {storage, firebase};
