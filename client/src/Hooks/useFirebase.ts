import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

function useFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBEKINGfAhu8BoFlFz5NTjY-V7VlZ6WeY0",
    authDomain: "smart-greenhouse-e59bb.firebaseapp.com",
    projectId: "smart-greenhouse-e59bb",
    storageBucket: "smart-greenhouse-e59bb.appspot.com",
    messagingSenderId: "1013651084278",
    appId: "1:1013651084278:web:2e059efd98c19e3e82edd7"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
}

export default useFirebase;
