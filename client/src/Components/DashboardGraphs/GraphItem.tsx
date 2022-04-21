import { Box, Skeleton, useMediaQuery } from "@mui/material";

import { handleBreakpoints } from "../../Utils/handleBreakpoints";

import { useState, useEffect } from "react";

import useFirebaseCollection from "../../Hooks/useFirebaseCollection";

import { fetchDocs } from "../../Services/fetchDocs";

function DashboardGraphItem({ collectionName }: Dashboard.GraphItemProps) {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState<Database.VegetationIndexDoc[]>([]);

  const collection = useFirebaseCollection(collectionName);

  useEffect(() => {
    setLoading(true);

    fetchDocs(collection).then((docs) => {
      setDocs(docs);
      setLoading(false);
    });
  }, []);

  const widthBreakpoints: DOMElement.BreakPoints = {
    first: {
      active: useMediaQuery("(min-width: 1000px)"),
      value: "30%",
    },
    default: { active: true, value: "100%" },
  };

  const maxWidthBreakPoints: DOMElement.BreakPoints = {
    first: {
      active: useMediaQuery("(min-width: 801px) and (max-width: 919px)"),
      value: "320px",
    },
    second: {
      active: useMediaQuery("(min-width: 919px) and (max-width: 1000px)"),
      value: "375px",
    },
    default: { active: true, value: "500px" },
  };

  return (
    <Box
      sx={{
        ...styles.container,
        width: handleBreakpoints(widthBreakpoints),
        maxWidth: handleBreakpoints(maxWidthBreakPoints),
      }}
    >
      <Skeleton sx={styles.loading.textSkeleton} variant={"rectangular"} />
      <Skeleton sx={styles.loading.graphSkeleton} variant={"circular"} />
    </Box>
  );
}

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "350px",
    margin: "0 auto 2.5em auto",
    background: "white",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
  },
  loading: {
    textSkeleton: {
      position: "relative",
      top: "5%",
      left: "3%",
      height: "15px",
      width: "80%",
    },
    graphSkeleton: {
      position: "relative",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      margin: "auto",
      height: "250px",
      width: "250px",
    },
  },
};

export default DashboardGraphItem;
