import { Box, styled, Typography } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import { newMessage, getMessages } from "../../../Service/api";
import Message from "./Message";
import Footer from "./Footer";

// Corrected styled components with template literals
const Wrapper = styled(Box)`
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 78vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column; /* Ensure messages are stacked vertically */
`;

const Container = styled(Box)`
  padding: 1px 40px;
  padding-top: 5px;
`;

const Messages = ({ person, conversation }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState(null);
  const { account, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);
  const messagesEndRef = useRef(null); // Reference to scroll to the end

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Function to fetch messages from the API
  useEffect(() => {
    const getMessageDetails = async () => {
      try {
        const data = await getMessages(conversation?._id);
        console.log("Fetched messages:", data); // Debugging
        const validMessages = Array.isArray(data)
          ? data.filter((msg) => msg?._id)
          : [];
        setMessages(validMessages);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    if (conversation?._id) getMessageDetails();
  }, [conversation?._id, person?._id, newMessageFlag]);

  // Function to scroll to the bottom when messages change
  useEffect(() => {
    // Ensures the scroll to the bottom behavior works after the messages are updated
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]); // Dependency on messages to trigger when they are updated

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);
  // Function to send text or file messages
  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      } else {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image, // Pass the image URL to the file field
        };
      }
      socket.current.emit("sendMessage", message);
      console.log("Message being sent:", message); // Debugging
      try {
        await newMessage(message);
        setValue("");
        setFile("");
        setImage("");
        setNewMessageFlag((prev) => !prev); // Trigger a re-fetch of messages
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages && messages.length > 0 ? (
          messages.map((message, index) =>
            message?._id ? (
              <Container key={message._id}>
                <Message message={message} />
              </Container>
            ) : (
              <Container key={index}>
                <Typography variant="body2" color="textSecondary">
                  Invalid message data
                </Typography>
              </Container>
            )
          )
        ) : (
          <Typography variant="body1" align="center" sx={{ padding: 2 }}>
            No messages to display.
          </Typography>
        )}
        {/* Scroll target */}
        <div ref={messagesEndRef} />
      </Component>
      <Footer
        sendText={sendText}
        setValue={setValue}
        value={value}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
