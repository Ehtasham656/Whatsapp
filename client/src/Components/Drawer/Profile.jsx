import { useContext } from "react";
import { Box, styled, Typography } from "@mui/material";

import { AccountContext } from "../../Context/AccountProvider";

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;
const Image = styled("img")({
  width: 100,
  height: 100,
  borderRadius: "50%",
});
const BoxWrapper = styled(Box)`
margin-top : 50px;
  background: #ffffff;
  padding: 12px 30px 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  & :first-child{
  font-size: 14px;
  color: #009688;
  font-weight: 200;
  }
  & :last-child{
 margin 14px 0;
 color: #4A4A4A;

  }
`;
const DescriptionContainer = styled(Box)`
  padding: 15px 20px 28px 30px;
  & > p {
    font-size: 13px;
    color: #8696a0;
  }
`;
const Profile = () => {
  const { account } = useContext(AccountContext);
  return (
    <>
      <ImageContainer>
        <Image src={account.picture} alt="dp" />
      </ImageContainer>
      <BoxWrapper>
        <Typography>Your Name</Typography>
        <Typography>{account.name}</Typography>
      </BoxWrapper>
      <DescriptionContainer>
        <Typography>
          This is not your username of pin. This name will be visible to your
          whatsapp contacts.
        </Typography>
      </DescriptionContainer>
      <BoxWrapper>
        <Typography>About</Typography>
        <Typography> Eat! Sleep! Code! Repeat!</Typography>
      </BoxWrapper>
    </>
  );
};

export default Profile;
