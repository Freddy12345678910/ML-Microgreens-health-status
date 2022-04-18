import useMediaQuery from "@mui/material/useMediaQuery";

import MobileNav from "../../Components/MobileNav/MobileNav";
import DesktopNav from "../../Components/DesktopNav/DesktopNav";

function Navigation() {
  const isMobileNav = useMediaQuery("(max-width: 800px)");
  return isMobileNav ? <MobileNav /> : <DesktopNav />; //if else
}

export default Navigation;
