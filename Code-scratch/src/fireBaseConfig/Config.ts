import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB4SvsC2fkKSHm14Cxp9Sj0mkLD3ZkMtCE",
  authDomain: "code-scratch-62377.firebaseapp.com",
  projectId: "code-scratch-62377",
  storageBucket: "code-scratch-62377.firebasestorage.app",
  messagingSenderId: "514596018010",
  appId: "1:514596018010:web:4fa2b63c070b787ea98563",
  measurementId: "G-RVNVJBGWYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider}
