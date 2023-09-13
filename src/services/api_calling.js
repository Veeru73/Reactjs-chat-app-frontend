import axios from "axios";
const baseUrl = process.env.REACT_APP_baseUrl;

const postRequest = async (path, data) => {
  const userInfo = localStorage.getItem("userInfo");
  const authToken = JSON.parse(userInfo)?.token;

  const headers = {
    Authorization: "Bearer " + authToken, //the token is a variable which holds the token
  };

  let res = {
    success: false,
    message: "Something went wrong, please try again later",
  };
  try {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}${path}`,
      data,
      headers,
    });
    res = response.data;
  } catch (err) {
    res.message = err.response?.data.message || err.message;
    return res;
  }
  return res;
};

// const deleteRequest = async (path, data) => {
//   let res = {
//     success: false,
//     message: "Something went wrong, please try again later",
//   };

//   try {
//     const response = await axios({
//       method: "DELETE",
//       url: `${baseUrl}${path}`,
//       data,
//     });
//     res = response.data;
//   } catch (err) {
//     console.log(err);
//     res.message = err.message;
//     return res;
//   }
//   return res;
// };

const putRequest = async (path, data) => {
  const userInfo = localStorage.getItem("userInfo");
  const authToken = JSON.parse(userInfo)?.token;

  const headers = {
    Authorization: "Bearer " + authToken, //the token is a variable which holds the token
  };

  let res = {
    success: false,
    message: "Something went wrong, please try again later",
  };

  try {
    const response = await axios({
      method: "PUT",
      url: `${baseUrl}${path}`,
      data,
      headers,
    });
    res = response.data;
  } catch (err) {
    res.message = err.response?.data.message || err.message;
    return res;
  }
  return res;
};

const getRequest = async (path) => {
  const userInfo = localStorage.getItem("userInfo");
  const authToken = JSON.parse(userInfo)?.token;

  const headers = {
    Authorization: "Bearer " + authToken, //the token is a variable which holds the token
  };

  let res = {
    success: false,
    message: "Something went wrong, please try again later",
  };

  try {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}${path}`,
      // params: data,
      headers,
    });
    res = response.data;
  } catch (err) {
    res.message = err.response?.data.message || err.message;
    return res;
  }
  return res;
};

export const login = async (data) => {
  const path = "/user/login";
  return await postRequest(path, data);
};

export const signup = async (data) => {
  const path = "/user/signUp";
  return await postRequest(path, data);
};

export const getUsers = async (search) => {
  const path = `/user/getUsers?search=${search}`;
  return await getRequest(path);
};

export const accessChat = async (data) => {
  const path = `/chat/accessChat`;
  return await postRequest(path, data);
};

export const fetchChats = async () => {
  const path = "/chat/fetchChats";
  return await getRequest(path);
};

export const createGroupChat = async (data) => {
  const path = "/chat/createGroupChat";
  return await postRequest(path, data);
};

export const renameGroup = async (data) => {
  const path = "/chat/renameGroup";
  return await putRequest(path, data);
};

export const addToGroup = async (data) => {
  const path = "/chat/addToGroup";
  return await putRequest(path, data);
};

export const removeFromGroup = async (data) => {
  const path = "/chat/removeFromGroup";
  return await putRequest(path, data);
};

export const sendMessage = async (data) => {
  const path = "/message/sendMessage";
  return await postRequest(path, data);
};

export const getAllMessage = async (chatId) => {
  const path = `/message/getAllMessage?chatId=${chatId}`;
  return await getRequest(path);
};
