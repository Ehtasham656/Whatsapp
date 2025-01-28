const express = require("express");
const { addUser, getUsers } = require("../Controller/user-controller.js");
const {
  newConversation,
  getConversation,
} = require("../Controller/conversation-controller.js");
const {
  newMessage,
  getMessage,
} = require("../Controller/message-controller.js");
const upload = require("../utils/upload");
const { uploadFile, getImage } = require("../Controller/image-controller.js");

const route = express.Router();

// User routes
route.post("/add", addUser);
route.get("/users", getUsers);

// Conversation routes
route.post("/conversation/add", newConversation);
route.post("/conversation/get", getConversation);

// Message routes
route.post("/message/add", newMessage);
route.get("/message/get/:id", getMessage);

// File upload and retrieval routes
route.post("/file/upload", upload.single("file"), uploadFile);
route.get("/file/:filename", getImage);

module.exports = route;
