import { getDocs, CollectionReference } from "firebase/firestore";

export async function fetchDocs(collection: CollectionReference) {
  const { docs } = await getDocs(collection);
  const mappedDocs = docs.map(
    (doc) => doc.data() as Database.VegetationIndexDoc
  );
  return mappedDocs;
}
