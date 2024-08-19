// firebase-config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAiLYloFB_YkLLnFQZnet6O2OcmtFokuDI",
    authDomain: "cdfofficial-4f424.firebaseapp.com",
    databaseURL: "https://cdfofficial-4f424-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cdfofficial-4f424",
    storageBucket: "cdfofficial-4f424.appspot.com",
    messagingSenderId: "949345350688",
    appId: "1:949345350688:web:6e56387bdb4d34257c7845",
    measurementId: "G-EMP1T2HDHN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc };
