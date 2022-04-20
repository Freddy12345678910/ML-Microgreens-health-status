import { Box } from "@mui/material";

function DashboardTitle({ iconSrc, text }: Dashboard.titleProps) {
  return (
    <Box sx={styles.container}>
      <img src={iconSrc} style={styles.icon} />
      <h3 style={styles.text}>{text}</h3>
    </Box>
  );
}

const styles = {
  container: {
    display: "inline-flex",
    padding: ".5em .5em 1.2em .5em",
    borderRadius: ".5em",
    background: "rgba(62, 196, 97, 0.17)",
  },
  icon: {
    width: "35px",
    marginRight: ".8em",
  },
  text: {
    fontSize: "16px",
    marginTop: "auto",
  },
};

export default DashboardTitle;
