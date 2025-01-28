import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { getConversation } from "../../../Service/api";

const ChatBox = () => {
  const { person, account } = useContext(AccountContext);
  const [conversation, setConversation] = useState({});
  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({
        senderId: account.sub,
        receiverId: person.sub,
      });
      setConversation(data);
    };
    getConversationDetails();
  }, [person.sub, account.sub]);
  useEffect(() => {
    console.log("Updated conversation:", conversation);
  }, [conversation]);
  return (
    <Box>
      <ChatHeader person={person} />
      {conversation && conversation.messages ? (
        <Messages person={person} conversation={conversation} />
      ) : (
        <div>Loading conversation...</div>
      )}
    </Box>
  );
};

export default ChatBox;
