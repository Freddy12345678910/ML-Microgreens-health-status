import { Paper, BottomNavigation, Box } from "@mui/material";

import HomeIcon from "../../Assets/Images/home.png";
import RecommendationsIcon from "../../Assets/Images/recommendations.png";

function MobileNav() {
  return (
    <Paper sx={styles.navContainer} elevation={2}>
      <BottomNavigation sx={styles.nav}>
        <Box sx={styles.navItem.container}>
          <img src={HomeIcon} style={styles.navItem.icon} />
          <Box sx={styles.navItem.bottomBar} />
        </Box>

        <Box sx={styles.navItem.container}>
          <img src={RecommendationsIcon} style={styles.navItem.icon} />
          {/*<Box sx={styles.navItem.bottomBar} />*/}
        </Box>
      </BottomNavigation>
    </Paper>
  );
}

const styles = {
  navContainer: { position: "fixed", bottom: 0, left: 0, right: 0 },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#3EC461",
  },
  navItem: {
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
  },
};

export default MobileNav;
