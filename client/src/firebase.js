import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnHdrJQycwbR1I4Hhs3zmIC-UH8y1V_nM",
  authDomain: "clone-139d2.firebaseapp.com",
  projectId: "clone-139d2",
  storageBucket: "clone-139d2.appspot.com",
  messagingSenderId: "290787370347",
  appId: "1:290787370347:web:c608763be985c77101182e",
  measurementId: "G-7TWGXM4TD4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
