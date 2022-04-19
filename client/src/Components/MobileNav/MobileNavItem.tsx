import { Box } from "@mui/material";

function MobileNavItem({ iconSrc }: Nav.NavItemProps) {
  return (
    <Box sx={styles.container}>
      <img src={iconSrc} style={styles.icon} />
      <Box sx={styles.bottomBar} />
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    ":hover": { cursor: "pointer" },
  },
  icon: { margin: ".2em auto", width: "40px" },
  bottomBar: {
    height: "4px",
    width: "50%",
    background: "white",
  },
};

export default MobileNavItem;
