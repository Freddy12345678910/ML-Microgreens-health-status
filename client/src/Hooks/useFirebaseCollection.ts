import { initializeApp } from "firebase/app";

import { getFirestore, collection } from "firebase/firestore";

import firebaseConfig from "../Config/firebaseConfig";

function useFirebaseCollection(collectionName: Database.CollectionName) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const docsCollection = collection(db, collectionName); 
  return docsCollection;
}

export default useFirebaseCollection;
