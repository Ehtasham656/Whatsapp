import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
export const AccountContext = createContext(); // No changes here

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null); // State initialization
  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:9000");
  }, []); // Ensure socket is only created once

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        person,
        setPerson,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
