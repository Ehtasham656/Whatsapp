import { Box, Typography, styled } from "@mui/material";
import { Search, MoreVert } from "@mui/icons-material";
import { useContext } from "react";
// import { emptyProfilePicture } from "../../constants/data";
import { AccountContext } from "../../../Context/AccountProvider";
const Header = styled(Box)`
  height: 44px;
  background-color: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;
const Image = styled("img")({
  height: 40,
  width: 65,
  borderRadius: "50%",
  padding: "0 14px",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;
const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: #65676b;
`;
const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    color: #65676b;
  }
`;

const ChatHeader = ({ person }) => {
  const { activeUsers } = useContext(AccountContext);
  return (
    <Header>
      <Image src={person.picture} alt="dp" />
      <Box>
        <Name>{person.name}</Name>
        <Status>
          {activeUsers?.find((user) => user.sub === person.sub)
            ? "online"
            : "offline"}
        </Status>
      </Box>
      <RightContainer>
        <Search />
        <MoreVert />
      </RightContainer>
    </Header>
  );
};

export default ChatHeader;
