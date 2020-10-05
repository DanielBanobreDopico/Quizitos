/**
 * Firebase initialization
 */
import firebase from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyCg2HPxXgzstIV5WujTNoU3Ijrnbjw28Ks",
  authDomain: "test-f624c.firebaseapp.com",
  databaseURL: "https://test-f624c.firebaseio.com",
  projectId: "test-f624c",
  storageBucket: "test-f624c.appspot.com",
  messagingSenderId: "143577927633",
  appId: "1:143577927633:web:4015b607713074b2ec1af0"
};
firebase.initializeApp(firebaseConfig);

/**
 * Firebase Auth
 */
import 'firebase/auth'
export const firebaseAuth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();