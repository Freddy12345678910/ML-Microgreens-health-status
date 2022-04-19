import { AppBar } from "@mui/material";
import Logo from "../../Assets/Images/logo.svg";

import "../../Assets/Styles/header.css";

function Header() {
  return (
    <AppBar sx={styles.container}>
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
  logo: {
    width: "250px",
  },
};

export default Header;
