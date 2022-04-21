import useMediaQuery from "@mui/material/useMediaQuery";

import { Box } from "@mui/material";

import VegetationIndicesIcon from "../../Assets/Images/vegetation_indices.png";

import * as DesktopNav from "../../Components/DesktopNav/DesktopNav";

import DashboardTitle from "../../Components/DashboardTitle/DashboardTitle";
import DashboardGraphs from "../../Components/DashboardGraphs/DashboardGraphs";

function Dashboard() {
  const isMobileNav = useMediaQuery("(max-width: 800px)");

  function calcMargin() {
    const [navWidth] = DesktopNav.styles.container.width.split("px");
    const rightMargin = isMobileNav ? "1em" : `${parseInt(navWidth) + 28}px`;
    const leftMargin = isMobileNav ? rightMargin : '0';
    return `2em ${leftMargin} 0 ${rightMargin}`;
  }

  return (
    <Box sx={{ ...styles.container, margin: calcMargin() }}>
      <DashboardTitle
        iconSrc={VegetationIndicesIcon}
        text={"Vegetation Indices"}
      />
      <DashboardGraphs />
    </Box>
  );
}

const styles = {
  container: {},
};

export default Dashboard;
