import { Drawer } from "@mui/material";

function DesktopNav() {
  return (
    <Drawer
      sx={styles.container}
      variant={"permanent"}
      anchor={"left"}
    ></Drawer>
  );
}

export const styles = {
  container: {
    position: 'fixed',
    top: '0',
    left: '0',
    height: "100vh",
    width: "50px",
    background: "#3EC461" },
};

export default DesktopNav;
