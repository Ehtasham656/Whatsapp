const message = require("../Model/Message");
const Conversation = require("../Model/Conversation");
const newMessage = async (req, res) => {
  try {
    const newMessage = new message(req.body);
    await newMessage.save();
    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      messages: req.body.text,
    });

    return res.status(200).json("Message added successfully");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const messages = await message.find({
      conversationId: req.params.id,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { newMessage, getMessage };
