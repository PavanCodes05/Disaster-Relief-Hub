import User from "../Models/userModel.js";
import Message from "../Models/messageModel.js";
import { getReceiverSocketId, io } from "../Lib/socket.js";
const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("chats name");

    if (!user) {
      return res.status(404).json({ message: "No chats found" });
    }

    res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const newMessage = new Message({
      from: req.user._id,
      to: id,
      message,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(id);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", newMessage);
    }

    res.status(200).json({ newMessage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const sender = req.user._id;
    const receiver = req.params.id;
    const messages = await Message.find({
      $or: [
        { from: sender, to: receiver },
        { from: receiver, to: sender },
      ],
    });

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getChats, sendMessage, getMessages };
