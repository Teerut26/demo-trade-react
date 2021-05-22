import firebase from "@firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAMluo4i9xBdsrW2BRfIMGKMgYeWpl1kZc",
  authDomain: "fir-trade-eff3a.firebaseapp.com",
  databaseURL: "https://fir-trade-eff3a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-trade-eff3a",
  storageBucket: "fir-trade-eff3a.appspot.com",
  messagingSenderId: "187765407111",
  appId: "1:187765407111:web:9de29b922f846e65ee6722",
  measurementId: "G-RZW1VYM4NK"
};

// คืนค่า firebase application ที่อาจถูก instantiate แล้วหรือ instantiate ใหม่
export default firebase.apps[0] || firebase.initializeApp(firebaseConfig);
