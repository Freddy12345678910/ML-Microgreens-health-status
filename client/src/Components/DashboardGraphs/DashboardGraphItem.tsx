import { useState, useEffect } from "react";

import { Box, Skeleton, useMediaQuery } from "@mui/material";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

import { onSnapshot } from "firebase/firestore";

import useFirebaseCollection from "../../Hooks/useFirebaseCollection";

import { handleBreakpoints } from "../../Utils/handleBreakpoints";

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardGraphItem({
  collectionName,
  title,
}: Dashboard.GraphItemProps) {
  const [firstSnapshot, setFirstSnapshot] = useState(true);
  const [loading, setLoading] = useState(false);
  const [graphValue, setGraphValue] = useState<number | null>(null);

  const collection = useFirebaseCollection(collectionName);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onSnapshot(collection, (snapshot) => {
      const lastDoc = snapshot.docs[
        snapshot.docs.length - 1
      ].data() as unknown as Database.VegetationIndexDoc;
      console.log(lastDoc.value);
      setGraphValue(lastDoc.value);
      if (firstSnapshot) {
        setFirstSnapshot(false);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const maxWidthBreakPoints: DOMElement.BreakPoints = {
    first: {
      active: useMediaQuery("(min-width: 755px) and (max-width: 900px)"),
      value: "300px",
    },
    second: {
      active: useMediaQuery("(min-width: 900px) and (max-width: 1050px)"),
      value: "350px",
    },
    default: { active: true, value: "500px" },
  };

  const widthBreakpoints: DOMElement.BreakPoints = {
    first: {
      active: useMediaQuery("(min-width: 1050px)"),
      value: "28%",
    },
    default: { active: true, value: "100%" },
  };

  function Loading() {
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

  return loading ? (
    <Loading />
  ) : (
    <Box
      sx={{
        ...styles.container,
        width: handleBreakpoints(widthBreakpoints),
        maxWidth: handleBreakpoints(maxWidthBreakPoints),
      }}
    >
      <Box>
        <h3 style={styles.title.text}>{title}</h3>
      </Box>

      <Box sx={styles.graphContainer}>
        <Pie
          redraw
          data={{
            labels: ["Blue"],
            datasets: [
              {
                label: "# of Votes",
                data: [1, graphValue],
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: "black",
                borderWidth: 1,
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
}

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "350px",
    margin: "0 auto 2.5em auto",
    padding: ".8em",
    background: "white",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
  },
  title: {
    text: {
      fontSize: "14px",
      marginBottom: ".5em",
    },
  },
  graphContainer: {
    width: "300px",
    margin: "auto",
  },
  loading: {
    textSkeleton: {
      position: "relative",
      top: "0",
      left: "0",
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
      height: "300px",
      width: "300px",
    },
  },
};

export default DashboardGraphItem;
