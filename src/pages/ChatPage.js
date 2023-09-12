import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/SideDrawer";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";

const ChatPage = () => {
  const user = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />}
       */}
      <SideDrawer />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        padding="10px"
      >
        {user && (
          <MyChats fetchAgain={fetchAgain}/>
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
