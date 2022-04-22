import { Link, useLocation } from "react-router-dom";

import { Box } from "@mui/material";

function DesktopNavItem({ to, iconSrc }: Nav.NavItemProps) {
  const { pathname: location } = useLocation();
  return (
    <Box sx={styles.container}>
      <Link to={to} style={styles.link}>
        {to === location && <Box sx={styles.leftLine} />}
        <img src={iconSrc} style={styles.icon} />
      </Link>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "50px",
    borderRadius: ".3em",
    ":hover": { cursor: "pointer", backgroundColor: "rgba(255,255,255,0.2)" },
  },
  link: {
    position: "relative" as any,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  icon: { margin: "0 auto", width: "25px" },
  leftLine: {
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "5px",
    background: "white",
  },
};

export default DesktopNavItem;
