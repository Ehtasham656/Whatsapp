const Conversation = require("../Model/Conversation");

const newConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Check if conversation already exists
    const exist = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (exist) {
      return res.status(409).json({ message: "Conversation already exists" });
    }

    // Create a new conversation
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    // Save and respond
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { newConversation, getConversation };
