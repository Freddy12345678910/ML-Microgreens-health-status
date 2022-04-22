import { Box } from "@mui/material";

import DashboardGraphItem from "./DashboardGraphItem";

function DashboardGraphs() {
  const graphs: Dashboard.Graphs = [
    {
      name: "NDWI",
      title: "NDWI - Normalized Difference Water Index",
    },
    {
      name: "NDVI",
      title: "NDVI - Normalized Difference Vegetation Index",
    },
    {
      name: "ARVI",
      title: "ARVI - Atmospherically Resistent Vegetation Index ",
    },
  ];

  return (
    <Box sx={styles.container}>
      {graphs.map(({ name, title }) => (
        <DashboardGraphItem
          key={name}
          name={name}
          title={title}
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
