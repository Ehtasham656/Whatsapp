import { useEffect, useState, useContext, useRef } from "react";
import { Box, styled, Divider } from "@mui/material";
import { getUsers } from "../../../Service/api";
import Conversation from "./Conversation";
import { AccountContext } from "../../../Context/AccountProvider";
import { getFormattedDate } from "../../../utils/common-utils";

const Component = styled(Box)`
  height: 81vh;
  overflow-y: auto;
`;

// const StyledDivider = styled(Divider)`
//   margin: 0 0 0 70px;
//   padding-top: 20px;
// `;

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();

        if (!Array.isArray(response)) {
          console.error("Invalid response format:", response);
          setUsers([]);
          return;
        }

        const filterData = response.filter((user) => {
          const name = user.name || "";
          return name.toLowerCase().includes(text.toLowerCase());
        });

        setUsers(filterData);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setUsers([]);
      }
    };

    fetchData();
  }, [text]);

  useEffect(() => {
    socket.current.emit("addUsers", account);

    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  return (
    <Component>
      {users.map(
        (user, index) =>
          user.sub !== account.sub && (
            <Box key={user.id || index}>
              <Conversation user={user} />
            </Box>
          )
      )}
    </Component>
  );
};

Conversations.defaultProps = {
  text: "",
};

export default Conversations;
