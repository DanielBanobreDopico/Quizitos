/**
 * Firebase initialization
 */
import firebase from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyB2xx08UuX8k3w3ceRWulCL9QPysBrRFL0",
    authDomain: "quest-ito.firebaseapp.com",
    databaseURL: "https://quest-ito.firebaseio.com",
    projectId: "quest-ito",
    storageBucket: "quest-ito.appspot.com",
    messagingSenderId: "566610415736",
    appId: "1:566610415736:web:eb6543d8965a6e74cb9d8d"
};
firebase.initializeApp(firebaseConfig);

import 'firebase/auth'
export const firebaseAuth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

import 'firebase/firestore';
export const firestoreDb = firebase.firestore();
