import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import UserBadgeItem from "./UserBadgeItem";
import {
  addToGroup,
  getUsers,
  removeFromGroup,
  renameGroup,
} from "../services/api_calling";
import UserListItem from "./UserListItem";

const UpdateGroupChatModel = ({
  fetchAgain,
  setFetchAgain,
  fetchAllMessages,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameloading] = useState(false);
  const toast = useToast();

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    setLoading(true);
    const data = { chatId: selectedChat._id, userId: user1._id };
    const res = await removeFromGroup(data);
    if (res.success) {
      user1._id === user._id ? setSelectedChat() : setSelectedChat(res.data);
      fetchAllMessages();
      // setSelectedChat(res.data);
      setFetchAgain(!fetchAgain);
      onClose();
    } else {
      toast({
        title: res.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    const data = { chatId: selectedChat._id, chatName: groupChatName };

    setRenameloading(true);

    const res = await renameGroup(data);

    if (res.success) {
      setSelectedChat(res.data);
      setFetchAgain(!fetchAgain);
    } else {
      toast({
        title: "Error Occured!",
        description: res.message,
        duration: 3000,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
    setRenameloading(false);
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    setLoading(true);

    const res = await getUsers(query);

    if (res.success) {
      setSearchResult(res.data);
    } else {
      toast({
        title: "Error Occured!",
        description: res.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }

    setLoading(false);
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    setLoading(true);
    const data = { chatId: selectedChat._id, userId: user1._id };
    const res = await addToGroup(data);
    if (res.success) {
      setSelectedChat(res.data);
      setFetchAgain(!fetchAgain);
    } else {
      toast({
        title: res.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat?.users?.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              ></Input>
            </FormControl>
            {/* render searched users */}
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModel;
