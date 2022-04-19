import { AppBar, useMediaQuery } from "@mui/material";

import Logo from "../../Assets/Images/logo.svg";

import * as DesktopNav from "../../Components/DesktopNav/DesktopNav";

function Header() {
  const isMobileNav = useMediaQuery("(max-width: 800px)");
  
  return (
    <AppBar
      position={"sticky"}
      sx={{
        ...styles.container,
        margin: isMobileNav ? "unset" : styles.containerDesktopMargin,
      }}
    >
      <img src={Logo} style={styles.logo} />
    </AppBar>
  );
}

const styles = {
  container: {
    padding: "0.4em 0.4em 0.4em 0.8em",
    background: "white",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  },
  containerDesktopMargin: `0 0 0 ${DesktopNav.styles.container.width}`,
  logo: {
    width: "250px",
  },
};

export default Header;
