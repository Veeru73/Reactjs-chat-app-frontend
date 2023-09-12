import { ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/ChatProvider";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="sm" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            p={3}
            // justifyContent="space-between"
          >
            {/* <Image
              borderRadius="full"
              boxSize="150px"
              background="black"
              borderWidth="4px"
              src={user?.profileImage}
              alt={user?.name}
            /> */}
            <Avatar
              mr={2}
              mb={4}
              size="2xl"
              color="white"
              cursor="pointer"
              name={user?.name}
              src={user?.profileImage}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="work sans"
            >
              {user?.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
