import { Link, useLocation } from "react-router-dom";

import { Box } from "@mui/material";

function MobileNavItem({ to, iconSrc }: Nav.NavItemProps) {
  const { pathname: location } = useLocation();
  return (
    <Box sx={styles.container}>
      <Link to={to} style={styles.link}>
        <img src={iconSrc} style={styles.icon} />
        {to === location && <Box sx={styles.bottomLine} />}
      </Link>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100%",
    width: "50%",
    borderRadius: ".3em",
    ":hover": { cursor: "pointer", backgroundColor: "rgba(255,255,255,0.2)" },
  },
  link: {
    display: "flex",
    flexDirection: "column" as any,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  icon: { margin: ".2em auto", width: "40px" },
  bottomLine: {
    height: "5px",
    width: "60%",
    background: "white",
  },
};

export default MobileNavItem;
