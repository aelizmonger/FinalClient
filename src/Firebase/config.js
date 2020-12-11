import firebase from 'firebase/app'; 
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBSirv7NhoVcnH3iDRIJwmdEGfJx7HEOdk",
  authDomain: "concert-fileupload.firebaseapp.com",
  projectId: "concert-fileupload",
  storageBucket: "concert-fileupload.appspot.com",
  messagingSenderId: "198309325462",
  appId: "1:198309325462:web:b3942c05f75ffeb98fb0b7"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export { storage, firebase as default };