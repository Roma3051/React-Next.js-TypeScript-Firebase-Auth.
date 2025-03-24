import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzwz5jsFqZNN2h5JbH-7fTCDgZOz1oHoY",
  authDomain: "web-app-314f7.firebaseapp.com",
  projectId: "web-app-314f7",
  storageBucket: "web-app-314f7.firebasestorage.app",
  messagingSenderId: "743272616947",
  appId: "1:743272616947:web:84cb60f230a3355efcf886",
  measurementId: "G-KT3ZXE8S2V",
};

let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); 
}

export const auth = getAuth(app);
export default app;
