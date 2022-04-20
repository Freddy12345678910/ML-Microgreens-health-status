import { Box } from "@mui/material";

import DashboardGraphItem from "./DashboardGraphItem";

function DashboardGraphs() {
  const collections = ["NDWI", "NDVI", "ARVI"];

  return (
    <Box sx={styles.container}>
      {collections.map((collection, index) => (
        <DashboardGraphItem key={index} collectionName={collection} />
      ))}
    </Box>
  );
}

const styles = {
  container: {
    height: "500px",
    width: "100%",
    margin: "2em 0",
    background: "white",
  },
};

export default DashboardGraphs;
