import { Box, formControlClasses } from "@mui/material";

import GraphItem from "./GraphItem";

function DashboardGraphs() {
  const collections: Database.CollectionName[] = ["NDWI", "NDVI", "ARVI"];
  
  return (
    <Box sx={styles.container}>
      {collections.map((collection) => (
        <GraphItem key={collection} collectionName={collection} />
      ))}
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    margin: "3em 0 2em 0",
    paddingBottom: "2em",
  },
};

export default DashboardGraphs;
