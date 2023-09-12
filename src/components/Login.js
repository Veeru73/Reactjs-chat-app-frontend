import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { login } from "../services/api_calling";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

const Login = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { setUser } = ChatState();

  const handleClick = () => setShow(!show);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    //call the api here
    setLoading(true);
    const data = { email, password };
    const res = await login(data);
    if (res.success) {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setUser(res.data);

      // setTimeout(() => {
        navigate("/chatpage", { replace: true });
      // }, 2000);

      toast({
        title: res.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: res.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(false);
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ margin: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest Credential
      </Button>
    </VStack>
  );
};

export default Login;
