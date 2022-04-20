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
        margin: isMobileNav
          ? "unset"
          : styles.conditionals.containerDesktopMargin,
        padding: isMobileNav
          ? "0.4em 0.4em 0.4em 0.8em"
          : styles.conditionals.containerDesktopPadding,
      }}
    >
      <img src={Logo} style={styles.logo} />
    </AppBar>
  );
}

const styles = {
  container: {
    background: "white",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
  },
  logo: {
    width: "250px",
  },
  conditionals: {
    containerDesktopMargin: `0 0 0 ${DesktopNav.styles.container.width}`,
    containerDesktopPadding: "0.4em 0.4em 0.4em 1.5em",
  },
};

export default Header;
