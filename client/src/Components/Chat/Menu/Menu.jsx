import { Box } from "@mui/material";
import Header from "../Menu/Header";
import Search from "../Menu/Search";
import Conversations from "../Menu/Conversations";
import { useState } from "react";
const Menu = () => {
  const [text, setText] = useState();
  return (
    <Box>
      <Header></Header>
      <Search setText={setText}></Search>
      <Conversations text={text}></Conversations>
    </Box>
  );
};

export default Menu;
