// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import "firebase/compat/storage"
import "firebase/compat/database"



const firebaseConfig = {
  apiKey: "AIzaSyDlGmhSFG_vejA_lAZI0seex1-Q2PUF7ho",
  authDomain: "ecommerce-12a92.firebaseapp.com",
  projectId: "ecommerce-12a92",
  storageBucket: "ecommerce-12a92.appspot.com",
  messagingSenderId: "1034666472436",
  appId: "1:1034666472436:web:55ba50c0f8c72bcf82bfa1",
  measurementId: "G-0VXQP3Y929"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig) 
export const databaseref = firebase.database();
export const storage = firebase.storage();
export default firebase;




