import { initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQ6JlC3WIG52jtWboZwLycGBQQyGcI_mI",
  authDomain: "learning-doc2.firebaseapp.com",
  projectId: "learning-doc2",
  storageBucket: "learning-doc2.appspot.com",
  messagingSenderId: "127337215185",
  appId: "1:127337215185:web:5cee4698dad96a7a37c1f0",
  measurementId: "G-SNT059W4SB",
};

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const provider: GoogleAuthProvider = new GoogleAuthProvider();
