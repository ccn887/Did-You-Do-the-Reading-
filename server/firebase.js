import firebase from 'firebase'

const API_KEY = process.env.FIREBASE_API_KEY

var config = {
  apiKey: "AIzaSyCwlnC_PyCan4hJZD93I0u7cgOtOrkV-6A",
  authDomain: "did-you-do-the-reading.firebaseapp.com",
  databaseURL: "https://did-you-do-the-reading.firebaseio.com",
  projectId: "did-you-do-the-reading",
  storageBucket: "",
  messagingSenderId: "261645179264"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();



export default firebase
