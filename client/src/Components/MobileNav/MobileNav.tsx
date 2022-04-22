import { Paper, BottomNavigation } from "@mui/material";

import MobileNavItem from "./MobileNavItem";

import HomeIcon from "../../Assets/Images/home.png";
import RecommendationsIcon from "../../Assets/Images/recommendations.png";

function MobileNav() {
  return (
    <Paper sx={styles.navContainer} elevation={2}>
      <BottomNavigation sx={styles.nav}>
        <MobileNavItem to={"/"} iconSrc={HomeIcon} />
        <MobileNavItem to={"/recommendations"} iconSrc={RecommendationsIcon} />
      </BottomNavigation>
    </Paper>
  );
}

const styles = {
  navContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: "100",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#3EC461",
  },
};

export default MobileNav;
