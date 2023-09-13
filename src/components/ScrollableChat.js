import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameMessageDate,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import { ChatState } from "../context/ChatProvider";
import { Avatar, Box, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  console.log("messages==========>", messages);
  const formattedTime = (message) => {
    const createdAt = new Date(message.createdAt);
    const formattedTime = createdAt.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  };
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={5}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.profileImage}
                />
              </Tooltip>
            )}
            <Box
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                display: "flex",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              <p>{m.content}</p>
              {/* <p>{m.createdAt}</p> */}
              <p
                style={{
                  fontSize: "9px",
                  textAlign: "end",
                  marginTop: "15px",
                  marginLeft: "10px",
                }}
              >
                {formattedTime(m)}
              </p>
            </Box>
            {/* <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
              {m.createdAt}
            </span> */}
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
