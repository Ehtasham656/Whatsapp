import { Drawer, Box, Typography, styled } from "@mui/material";
import Profile from "../Drawer/Profile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = styled(Box)`
  background: #008069;
  height: 107px;
  color: #ffffff;
  display: flex;
  align-items: center; /* Aligns content vertically */
  padding: 0 16px; /* Adds horizontal padding */
  & > svg {
    margin-right: 16px; /* Adds spacing between the icon and text */
    cursor: pointer; /* Makes the icon clickable */
  }
  & > p {
    font-size: 16px;
    font-weight: 600;
  }
`;

const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;

const drawerStyle = {
  position: "absolute",
  left: 20,
  top: 14,
  height: "95%",
  width: "30%",
  boxShadow: "none",
};

const InfoDrawer = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1600 }}
    >
      <Header>
        <ArrowBackIcon onClick={() => setOpen(false)} />
        <Typography>Profile</Typography>
      </Header>
      <Component>
        <Profile />
      </Component>
    </Drawer>
  );
};

export default InfoDrawer;
