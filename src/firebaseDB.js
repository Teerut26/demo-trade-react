import firebase from "@firebase/app";
import '@firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyDUDpko95UsPYdEA02f0pUKwIf-oh-Qxhw",
  authDomain: "funny-trade.firebaseapp.com",
  databaseURL: "https://funny-trade-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "funny-trade",
  storageBucket: "funny-trade.appspot.com",
  messagingSenderId: "713373565015",
  appId: "1:713373565015:web:4e1dc3ce22721092946312",
  measurementId: "G-4329WB9475"
};

// คืนค่า firebase application ที่อาจถูก instantiate แล้วหรือ instantiate ใหม่
export default firebase.apps[0] || firebase.initializeApp(firebaseConfig);
