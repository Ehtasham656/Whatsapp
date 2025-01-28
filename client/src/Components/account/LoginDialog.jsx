import { Dialog, Box, Typography, ListItem, List, styled } from "@mui/material";
import { qrCodeImage } from "../constants/data";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Fixed import
import { useContext } from "react";
import { AccountContext } from "../../Context/AccountProvider";
import { addUser } from "../../Service/Api";

const dialogStyle = {
  height: "96%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden", // Fixed typo
};

const Component = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  padding: 56px 0px 56px 56px;
`;

const QRCode = styled("img")({
  height: 200,
  width: 200,
  margin: "50px 50px 0 0",
});

const Title = styled(Typography)`
  font-size: 23px;
  color: rgb(86, 85, 85);
  margin-bottom: 25px;
`;

const ListContainer = styled(List)`
  & > li {
    padding: 0;
    margin: 8px 0;
    font-size: 16px;
    line-height: 2;
    color: rgb(86, 85, 85);
  }
`;

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);
  const onLoginSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    await addUser(decoded);

    setAccount(decoded);
  };

  const onLoginError = (error) => {
    console.error("Login error", error);
  };
  return (
    <div>
      <Dialog
        open={true}
        PaperProps={{
          style: dialogStyle,
        }}
        hideBackdrop={true}
      >
        <Component>
          <Container>
            <Title>To use WhatsApp on your computer:</Title>
            <ListContainer>
              <ListItem>1. Open WhatsApp on your phone.</ListItem>
              <ListItem>
                2. Tap Menu or Settings and select Linked Devices.
              </ListItem>
              <ListItem>
                3. Tap Add a new device and choose "Computer
                (Windows/Mac/Linux)".
              </ListItem>
            </ListContainer>
          </Container>
          <Box style={{ position: "relative" }}>
            <QRCode src={qrCodeImage} alt="QR code" />
            <Box
              style={{
                position: "absolute",
                top: "50%",
                // transform: "translateX(15%)",
              }}
            >
              <GoogleLogin
                onSuccess={onLoginSuccess}
                onFailure={onLoginError}
              />
            </Box>
          </Box>
        </Component>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
