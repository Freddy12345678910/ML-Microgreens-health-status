import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";

import useFirebase from "../../Hooks/useFirebase";

function DashboardGraphItem({ collectionName }: Dashboard.GraphItemProps) {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState<Dashboard.VegetationIndexDoc[]>([]);

  const db = useFirebase();

  useEffect(() => {
    console.log(`Render ${collectionName}`);
    setLoading(true);
    async function fetchDocs() {
      const docsCollection = collection(db, collectionName);
      const { docs } = await getDocs(docsCollection);
      const mappedDocs = docs.map((doc) => doc.data() as Dashboard.VegetationIndexDoc);
      setDocs(mappedDocs);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return <h3>{loading ? "Loading..." : collectionName}</h3>;
}

export default DashboardGraphItem;
