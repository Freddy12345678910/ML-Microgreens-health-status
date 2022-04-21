import { Box } from "@mui/material";

import DashboardGraphItem from "./DashboardGraphItem";

function DashboardGraphs() {
  const collections: Database.CollectionName[] = ["NDWI", "NDVI", "ARVI"];

  const graphTitle: Record<Database.CollectionName, string> = {
    NDWI: "NDWI - Normalized Difference Water Index",
    NDVI: "NDVI - Normalized Difference Vegetation Index",
    ARVI: "ARVI - Atmospherically Resistent Vegetation Index ",
  };

  return (
    <Box sx={styles.container}>
      {collections.map((collection) => (
        <DashboardGraphItem
          key={collection}
          collectionName={collection}
          title={graphTitle[collection]}
        />
      ))}
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1600px",
    margin: "3em 0 2em 0",
    paddingBottom: "2em",
  },
};

export default DashboardGraphs;
