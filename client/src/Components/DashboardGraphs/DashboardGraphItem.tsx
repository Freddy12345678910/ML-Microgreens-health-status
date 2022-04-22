import { useState, useEffect } from "react";

import { Box, Skeleton, useMediaQuery } from "@mui/material";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { PieChart, Pie, Cell } from "recharts";

import {
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";

import useFirebaseCollection from "../../Hooks/useFirebaseCollection";

import { handleBreakpoints } from "../../Utils/handleBreakpoints";

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardGraphItem({ name, title }: Dashboard.GraphItemProps) {
  const [firstSnapshot, setFirstSnapshot] = useState(true);
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState<Dashboard.GraphData[]>([]);

  const collection = useFirebaseCollection(name);

  function handleSnapshot(snapshot: QuerySnapshot<DocumentData>) {
    if (!snapshot.empty) {
      const doc = snapshot.docs[0].data() as Database.VegetationIndexDoc;

      requestAnimationFrame(() => {
        const valuePercent = getValuePercent(doc.value);
        const valuePercentDifference = 100 - valuePercent;

        setGraphData([
          {
            value: valuePercent,
            fill: getPercentColor(valuePercent),
          },
          { value: valuePercentDifference, fill: "#F1F4F6" },
        ]);
      });

      if (firstSnapshot) {
        setFirstSnapshot(false);
        setLoading(false);
      }
    }
  }

  function getValuePercent(value: number) {
    const halfPercent = 50;
    const difference = halfPercent * Math.abs(value);
    const result = halfPercent + (value > 0 ? difference : -difference);
    return result;
  }

  function getPercentColor(percent: number) {
    if(percent < 50) {
      return "#A38037"
    } else if (percent < 66.5) {
      return "#667919";
    } else if (percent < 83) {
      return "#7EE280";
    }
    return "#3EC461";
  }

  useEffect(() => {
    setLoading(true);

    const collectionQuery = query(
      collection,
      orderBy("created_at", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(collectionQuery, handleSnapshot);

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

  function LoadingSkeleton() {
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
    <LoadingSkeleton />
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
        <PieChart height={300} width={300}>
          <Pie
            dataKey="value"
            data={graphData}
            strokeWidth={5}
            animationDuration={1000}
          >
            {graphData.map((data, index) => (
              <Cell
                key={`cell-${index}`}
                fill={data.fill}
                style={{
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
                stroke={"black"}
                strokeWidth={2}
              />
            ))}
          </Pie>
        </PieChart>
      </Box>

      <Box sx={styles.percentageContainer}>
        <h3 style={styles.percentage}>{graphData[0]?.value.toFixed(2)}%</h3>
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
  percentageContainer: {
    margin: "0 auto 1em auto",
  },
  percentage: {},
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
