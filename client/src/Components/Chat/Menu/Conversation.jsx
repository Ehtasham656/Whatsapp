import { Box, Typography, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { setConversation, getConversation } from "../../../Service/api";
import { getFormattedDate } from "../../../utils/common-utils";
import { AccountContext } from "../../../Context/AccountProvider";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  marginRight: "14px",
  objectFit: "cover",
});

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const TopWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const MessageText = styled(Typography)`
  font-size: 14px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
`;

const DateText = styled(Typography)`
  font-size: 12px;
  color: #888;
`;

const Conversation = ({ user }) => {
  const { setPerson, account, newMessageFlag } = useContext(AccountContext);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      try {
        const data = await getConversation({
          senderId: account.sub,
          receiverId: user.sub,
        });

        console.log("getConversation API Response:", data);
        setMessage({
          text: data?.message,
          timestamp: data?.updatedAt,
        });
      } catch (error) {
        console.error("Error fetching conversation:", error);
        setMessage({
          text: "No messages yet",
          timestamp: null,
        });
      }
    };

    getConversationDetails();
  }, [newMessageFlag]);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={getUser}>
      <Image src={user.picture} alt="dp" />
      <ContentWrapper>
        <TopWrapper>
          <UserName>{user.name}</UserName>
          <DateText>
            {message?.timestamp
              ? getFormattedDate(message.timestamp)
              : "Unknown time"}
          </DateText>
        </TopWrapper>
        <MessageText>
          {message?.text?.includes("localhost") ? "media" : message.text}
        </MessageText>
      </ContentWrapper>
    </Component>
  );
};

export default Conversation;
