import axios from "axios";

const url = "http://localhost:8000";

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/add`, data);
  } catch (error) {
    console.log(
      "Error while addUser API",
      error?.response?.data?.message || error.message
    );
  }
};

export const getUsers = async () => {
  try {
    let response = await axios.get(`${url}/users`);
    return response.data;
  } catch (error) {
    console.log(
      "Error while getUsers API",
      error?.response?.data?.message || error.message
    );
    return [];
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log(
      "Error while setConversation API",
      error?.response?.data?.message || error.message
    );
  }
};

export const getConversation = async (users) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, users);
    return response.data;
  } catch (error) {
    console.log(
      "Error while getConversation API",
      error?.response?.data?.message || error.message
    );
    return [];
  }
};

export const getMessages = async (id) => {
  try {
    let response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error while getMessages API",
      error?.response?.data?.message || error.message
    );
    return [];
  }
};

export const newMessage = async (data) => {
  try {
    await axios.post(`${url}/message/add`, data);
  } catch (error) {
    console.log(
      "Error while newMessage API",
      error?.response?.data?.message || error.message
    );
  }
};

export const uploadFile = async (data) => {
  try {
    let response = await axios.post(`${url}/file/upload`, data);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error while calling uploadFile API ", error.message);
  }
};
