import { Drawer } from "@mui/material";

import DesktopNavItem from "./DesktopNavItem";

import HomeIcon from "../../Assets/Images/home.png";
import RecommendationsIcon from "../../Assets/Images/recommendations.png";

function DesktopNav() {
  return (
    <Drawer
      sx={styles.container}
      variant={"permanent"}
      anchor={"left"}
      PaperProps={{ style: styles.paper }}
    >
      <DesktopNavItem to={"/"} iconSrc={HomeIcon} />
      <DesktopNavItem to={"/recommendations"} iconSrc={RecommendationsIcon} />
    </Drawer>
  );
}

export const styles = {
  container: {
    position: "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    width: "50px",
  },
  paper: {
    width: "50px",
    backgroundColor: "#3EC461",
    border: "unset",
  },
};

export default DesktopNav;
